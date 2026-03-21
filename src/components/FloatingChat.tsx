import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Instagram, Send, Bot, User } from "lucide-react";

type Message = {
    id: string;
    text: string;
    sender: "bot" | "user";
};

const QA_DATA = [
    {
        keywords: ["price", "cost", "charge", "rate", "fee", "how much", "pricing"],
        answer: "My rates depend on the scope and complexity of the project. Generally, custom web projects start from $500, but it's best to discuss the details! Please reach out to me via WhatsApp or Instagram so we can talk about your specific needs."
    },
    {
        keywords: ["service", "what do you do", "offer", "build", "can you make"],
        answer: "I specialize in frontend development, building modern, responsive, and aesthetically pleasing websites using React and Next.js. I can help you with portfolio sites, landing pages, e-commerce fronts, and more."
    },
    {
        keywords: ["experience", "background", "years", "skills", "tech stack"],
        answer: "I have experience creating amazing digital experiences, combining technical skills with a strong eye for design. My main stack includes React, TypeScript, Tailwind CSS, and Next.js. You can check out the 'Experience' and 'Projects' sections on my page!"
    },
    {
        keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon"],
        answer: "Hello there! How can I help you today? Feel free to ask me questions about my services, pricing, or experience. If I can't answer, I'll direct you to contact me directly."
    },
    {
        keywords: ["contact", "reach", "email", "number", "phone", "message you"],
        answer: "You can reach me directly via WhatsApp or Instagram using the links at the top of this chat! I typically reply very quickly on those platforms."
    }
];

const FloatingChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", text: "Hi! I'm BlessKimbi's AI assistant. How can I help you today?", sender: "bot" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const whatsappNumber = "+237675126845";
    const igHandle = "blesskimbi";

    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    const igUrl = `https://ig.me/m/${igHandle}`;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userText = inputValue;
        setInputValue("");

        // Add user message
        setMessages(prev => [...prev, { id: Date.now().toString(), text: userText, sender: "user" }]);

        // Simulate bot thinking and replying
        setTimeout(() => {
            const lowerInput = userText.toLowerCase();
            let foundAnswer = "I'm sorry, I don't have a specific answer for that. But you can chat with BlessKimbi directly! Just click the WhatsApp or Instagram buttons at the top to send a DM.";

            for (const q of QA_DATA) {
                if (q.keywords.some((kw) => lowerInput.includes(kw))) {
                    foundAnswer = q.answer;
                    break;
                }
            }

            setMessages(prev => [...prev, { id: Date.now().toString() + "-bot", text: foundAnswer, sender: "bot" }]);
        }, 600);
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
            {isOpen ? (
                <div className="flex flex-col w-[300px] xs:w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <Bot size={18} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-foreground">BK Assistant</span>
                                <span className="text-[10px] text-green-400 font-medium flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                    Online
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <a href={igUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted-foreground hover:text-pink-500 hover:bg-white/5 rounded-full transition-colors" title="Instagram">
                                <Instagram size={18} />
                            </a>
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted-foreground hover:text-green-500 hover:bg-white/5 rounded-full transition-colors" title="WhatsApp">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                            <div className="w-[1px] h-4 bg-white/10 mx-1"></div>
                            <button onClick={() => setIsOpen(false)} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full transition-colors ml-1" title="Close chat">
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                    <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-auto shadow-sm ${msg.sender === "user" ? "bg-white/10 text-white" : "bg-primary/20 text-primary"}`}>
                                        {msg.sender === "user" ? <User size={12} /> : <Bot size={12} />}
                                    </div>
                                    <div className={`px-4 py-2.5 rounded-2xl text-sm ${msg.sender === "user" ? "bg-primary text-primary-foreground rounded-br-sm shadow-md" : "bg-white/5 text-foreground rounded-bl-sm border border-white/5 shadow-sm"}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-background border-t border-white/10 relative">
                        <form onSubmit={handleSend} className="relative flex items-center w-full">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask me anything..."
                                className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground outline-none"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="absolute right-1.5 w-8 h-8 flex items-center justify-center bg-primary rounded-full text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                <Send size={14} className="ml-0.5" />
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:scale-110 hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all duration-300 z-50 focus:outline-none animate-[bounce_2s_infinite] group"
                    aria-label="Open Chat"
                >
                    <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-300" />
                </button>
            )}
        </div>
    );
};

export default FloatingChat;
