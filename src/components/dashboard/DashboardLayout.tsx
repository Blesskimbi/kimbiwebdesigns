import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, LogOut } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import DashboardProjects from "@/pages/dashboard/DashboardProjects";

/**
 * Auth is handled by Supabase, not by this bundle.
 *
 * The previous version compared against VITE_ADMIN_USER / VITE_ADMIN_PASS.
 * Anything VITE_-prefixed is inlined into the JavaScript every visitor
 * downloads, so the credentials — and the HMAC session signed with the
 * password — were readable by anyone who opened the site's source. The
 * lockout counters lived in the visitor's own localStorage, so clearing it
 * reset them.
 *
 * Signing in through Supabase means the password is verified server-side and
 * never ships to the browser, and the resulting JWT is what the row-level
 * security policies check before allowing any write.
 */

const LoginPage = ({ onSuccess }: { onSuccess: () => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setError("");

        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (signInError) {
            // Supabase returns a deliberately vague message so the form cannot
            // be used to discover which addresses have accounts.
            setError(signInError.message);
            setLoading(false);
            return;
        }

        onSuccess();
    };

    const fieldClass =
        "w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-600";

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 border bg-primary/10 border-primary/20">
                        <Lock size={24} className="text-primary" />
                    </div>
                    <h1 className="font-display font-bold text-2xl text-white mb-1">Admin Login</h1>
                    <p className="text-gray-400 text-sm">BlessKimbi Dashboard</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#0A0C10] border border-white/8 rounded-2xl p-8 space-y-5 shadow-2xl"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            required
                            autoFocus
                            autoComplete="username"
                            disabled={loading}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={fieldClass}
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                required
                                autoComplete="current-password"
                                disabled={loading}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={fieldClass + " pr-11"}
                                placeholder="Enter password"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                onClick={() => setShowPass((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-pro hover:shadow-pro"
                    >
                        {loading ? "Signing in…" : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

const DashboardLayout = () => {
    // undefined = still restoring the session, null = signed out
    const [session, setSession] = useState<Session | null | undefined>(undefined);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => setSession(data.session));

        // Keeps the UI in step with token refreshes, sign-out in another tab,
        // and an expired session.
        const { data: listener } = supabase.auth.onAuthStateChange((_event, next) =>
            setSession(next),
        );

        return () => listener.subscription.unsubscribe();
    }, []);

    const handleLogout = () => {
        supabase.auth.signOut();
    };

    if (session === undefined) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) return <LoginPage onSuccess={() => { /* onAuthStateChange sets the session */ }} />;

    return (
        <div className="min-h-screen bg-[#050505] font-sans text-foreground">
            <header className="sticky top-0 z-30 bg-[#0A0C10] border-b border-white/5 px-6 py-4 flex items-center justify-between">
                <span className="font-display font-bold text-lg tracking-wider text-white">
                    BlessKimbi<span className="text-primary">.</span>
                    <span className="ml-2 text-xs text-gray-500 font-sans font-normal">Admin</span>
                </span>
                <div className="flex items-center gap-4">
                    <span className="hidden sm:inline text-xs text-gray-500">{session.user.email}</span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </header>
            <main className="p-6 lg:p-10">
                <DashboardProjects />
            </main>
        </div>
    );
};

export default DashboardLayout;
