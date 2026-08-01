import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, LogOut, ShieldAlert, Clock } from "lucide-react";
import DashboardProjects from "@/pages/dashboard/DashboardProjects";

// ── Config ──────────────────────────────────────────────────────────────
const ADMIN_USER = import.meta.env.VITE_ADMIN_USER as string;
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS as string;

const MAX_ATTEMPTS     = 5;
const SESSION_TTL_MS   = 8 * 60 * 60_000;   // 8 hours
const MIN_RESPONSE_MS  = 700;                // constant-time floor (anti-timing)

// Escalating lockout tiers: 1 min → 5 min → 15 min → 30 min → 1 hour
const LOCKOUT_TIERS_MS = [60_000, 300_000, 900_000, 1_800_000, 3_600_000];

const S_KEY = "bk_s";  // session storage key
const A_KEY = "bk_a";  // attempts storage key

// ── Crypto ──────────────────────────────────────────────────────────────
const enc = new TextEncoder();

async function hmacHex(secret: string, msg: string): Promise<string> {
    const key = await crypto.subtle.importKey(
        "raw", enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false, ["sign"]
    );
    const buf = await crypto.subtle.sign("HMAC", key, enc.encode(msg));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

// Constant-time compare — prevents micro-timing leaks
function safeEq(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
}

// ── Attempt tracking ─────────────────────────────────────────────────────
interface Attempts { count: number; tier: number; lockedUntil: number; }

function getAttempts(): Attempts {
    try { return JSON.parse(localStorage.getItem(A_KEY)!) ?? { count: 0, tier: 0, lockedUntil: 0 }; }
    catch { return { count: 0, tier: 0, lockedUntil: 0 }; }
}

function recordFail(): Attempts {
    const a = getAttempts();
    a.count += 1;
    if (a.count >= MAX_ATTEMPTS) {
        const tier     = Math.min(a.tier, LOCKOUT_TIERS_MS.length - 1);
        a.lockedUntil  = Date.now() + LOCKOUT_TIERS_MS[tier];
        a.tier         = Math.min(a.tier + 1, LOCKOUT_TIERS_MS.length - 1);
        a.count        = 0;
    }
    localStorage.setItem(A_KEY, JSON.stringify(a));
    return a;
}

function clearAttempts() { localStorage.removeItem(A_KEY); }

// ── Session ───────────────────────────────────────────────────────────────
interface Session { sig: string; nonce: string; exp: number; }

async function createSession(): Promise<void> {
    const nonce = crypto.randomUUID();
    const sig   = await hmacHex(ADMIN_PASS, nonce);
    const s: Session = { sig, nonce, exp: Date.now() + SESSION_TTL_MS };
    localStorage.setItem(S_KEY, JSON.stringify(s));
}

async function verifySession(): Promise<boolean> {
    try {
        const raw = localStorage.getItem(S_KEY);
        if (!raw) return false;
        const s: Session = JSON.parse(raw);
        if (Date.now() > s.exp) { localStorage.removeItem(S_KEY); return false; }
        const expected = await hmacHex(ADMIN_PASS, s.nonce);
        return safeEq(expected, s.sig);
    } catch { return false; }
}

function destroySession() { localStorage.removeItem(S_KEY); }

// ── Helpers ───────────────────────────────────────────────────────────────
function fmtMs(ms: number): string {
    const s = Math.ceil(ms / 1000);
    if (s < 60)   return `${s}s`;
    if (s < 3600) return `${Math.ceil(s / 60)}m`;
    return `${Math.ceil(s / 3600)}h`;
}

// ── Login Page ────────────────────────────────────────────────────────────
const LoginPage = ({ onSuccess }: { onSuccess: () => void }) => {
    const [username, setUsername]   = useState("");
    const [password, setPassword]   = useState("");
    const [showPass, setShowPass]   = useState(false);
    const [error, setError]         = useState("");
    const [loading, setLoading]     = useState(false);
    const [lockRemaining, setLockRemaining] = useState(0);
    const [attemptsLeft, setAttemptsLeft]   = useState(MAX_ATTEMPTS);

    // Live countdown ticker
    useEffect(() => {
        const tick = () => {
            const a   = getAttempts();
            const rem = Math.max(0, a.lockedUntil - Date.now());
            setLockRemaining(rem);
            setAttemptsLeft(Math.max(0, MAX_ATTEMPTS - a.count));
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const isLocked = lockRemaining > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLocked || loading) return;

        setLoading(true);
        setError("");
        const start = Date.now();

        try {
            // Hash both inputs with HMAC before comparing — constant-time via crypto API
            const [uGot, pGot, uExp, pExp] = await Promise.all([
                hmacHex("u", username),
                hmacHex("p", password),
                hmacHex("u", ADMIN_USER),
                hmacHex("p", ADMIN_PASS),
            ]);

            const valid = safeEq(uGot, uExp) && safeEq(pGot, pExp);

            // Pad to constant response time regardless of result
            const elapsed = Date.now() - start;
            if (elapsed < MIN_RESPONSE_MS) {
                await new Promise(r => setTimeout(r, MIN_RESPONSE_MS - elapsed));
            }

            if (valid) {
                clearAttempts();
                await createSession();
                onSuccess();
            } else {
                const a   = recordFail();
                const rem = Math.max(0, a.lockedUntil - Date.now());
                if (rem > 0) {
                    setLockRemaining(rem);
                    setError(`Account locked. Try again in ${fmtMs(rem)}.`);
                } else {
                    const left = MAX_ATTEMPTS - a.count;
                    setAttemptsLeft(left);
                    setError(`Invalid credentials.${left > 0 ? ` ${left} attempt${left !== 1 ? "s" : ""} left.` : ""}`);
                }
            }
        } catch {
            setError("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    const fieldClass = "w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-600";

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 border ${isLocked ? "bg-red-500/10 border-red-500/20" : "bg-primary/10 border-primary/20"}`}>
                        {isLocked ? <ShieldAlert size={24} className="text-red-400" /> : <Lock size={24} className="text-primary" />}
                    </div>
                    <h1 className="font-display font-bold text-2xl text-white mb-1">Admin Login</h1>
                    <p className="text-gray-400 text-sm">BlessKimbi Dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#0A0C10] border border-white/8 rounded-2xl p-8 space-y-5 shadow-2xl">

                    {/* Lockout banner */}
                    {isLocked && (
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                            <Clock size={16} className="text-red-400 shrink-0" />
                            <div>
                                <p className="text-red-400 text-sm font-semibold">Too many failed attempts</p>
                                <p className="text-red-400/70 text-xs mt-0.5">Try again in <span className="font-bold">{fmtMs(lockRemaining)}</span></p>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                        <input
                            type="text"
                            required
                            autoFocus
                            autoComplete="username"
                            disabled={isLocked || loading}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className={fieldClass + (isLocked ? " opacity-50 cursor-not-allowed" : "")}
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                required
                                autoComplete="current-password"
                                disabled={isLocked || loading}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className={fieldClass + " pr-11" + (isLocked ? " opacity-50 cursor-not-allowed" : "")}
                                placeholder="Enter password"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                onClick={() => setShowPass(v => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {error && !isLocked && (
                        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    {/* Attempts warning */}
                    {!isLocked && !error && attemptsLeft < MAX_ATTEMPTS && attemptsLeft > 0 && (
                        <p className="text-orange-400 text-xs text-center">
                            {attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""} remaining before lockout
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading || isLocked}
                        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-pro hover:shadow-pro"
                    >
                        {loading ? "Verifying…" : isLocked ? `Locked — ${fmtMs(lockRemaining)}` : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

// ── Dashboard Layout ──────────────────────────────────────────────────────
const DashboardLayout = () => {
    // null = verifying session, true = authed, false = not authed
    const [authed, setAuthed] = useState<boolean | null>(null);

    useEffect(() => {
        verifySession().then(setAuthed);
    }, []);

    const handleLogout = () => {
        destroySession();
        clearAttempts();
        setAuthed(false);
    };

    // Session check in progress
    if (authed === null) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!authed) return <LoginPage onSuccess={() => setAuthed(true)} />;

    return (
        <div className="min-h-screen bg-[#050505] font-sans text-foreground">
            <header className="sticky top-0 z-30 bg-[#0A0C10] border-b border-white/5 px-6 py-4 flex items-center justify-between">
                <span className="font-display font-bold text-lg tracking-wider text-white">
                    BlessKimbi<span className="text-primary">.</span>
                    <span className="ml-2 text-xs text-gray-500 font-sans font-normal">Admin</span>
                </span>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                >
                    <LogOut size={16} /> Logout
                </button>
            </header>
            <main className="p-6 lg:p-10">
                <DashboardProjects />
            </main>
        </div>
    );
};

export default DashboardLayout;
