import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Send,
    Bot,
    User,
    Sparkles,
    ChevronLeft,
    Plus,
    MessageSquare,
    MoreHorizontal,
    ThumbsUp,
    ThumbsDown,
    Copy,
    RefreshCw,
    Search,
    Mic
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const AIAssistant = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm Zertainity AI. I can help you explore career paths, find the right colleges, or prepare for interviews. How can I assist you today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "That's a great question! Based on your interest in technology and design, I'd recommend looking into UX Research or Product Design roles. These fields combine creativity with analytical thinking.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsLoading(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex h-screen bg-white font-sans text-gray-900 overflow-hidden">

            {/* Sidebar */}
            <aside className="w-[280px] bg-gray-50 border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-4 h-16 flex items-center border-b border-gray-200/50">
                    <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}>
                        <div className="w-6 h-6 flex items-center justify-center bg-black text-white rounded-md">
                            <span className="text-xs font-bold">∞</span>
                        </div>
                        <span className="font-bold tracking-tight text-sm">Zertainity</span>
                    </div>
                </div>

                <div className="p-4">
                    <Button variant="outline" className="w-full justify-start gap-2 bg-white border-gray-200 hover:bg-gray-100 hover:text-black rounded-xl h-10 shadow-sm text-gray-600">
                        <Plus className="w-4 h-4" /> New Chat
                    </Button>
                </div>

                <ScrollArea className="flex-1 px-4">
                    <div className="space-y-6 pb-4">
                        <div>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Today</h3>
                            <div className="space-y-0.5">
                                <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-gray-700 bg-gray-200/50 rounded-lg font-medium">
                                    <MessageSquare className="w-4 h-4 text-gray-500" />
                                    <span className="truncate">Career Exploration</span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Previous 7 Days</h3>
                            <div className="space-y-0.5">
                                <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black rounded-lg transition-colors">
                                    <MessageSquare className="w-4 h-4 text-gray-400" />
                                    <span className="truncate">Interview Prep: Product...</span>
                                </button>
                                <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black rounded-lg transition-colors">
                                    <MessageSquare className="w-4 h-4 text-gray-400" />
                                    <span className="truncate">Resume Feedback</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                <div className="p-4 border-t border-gray-200/50">
                    <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => navigate('/profile')}>
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                            JD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate">John Doe</p>
                            <p className="text-[10px] text-gray-500 truncate">Free Plan</p>
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-white relative">

                {/* Mobile Header */}
                <div className="md:hidden h-14 border-b border-gray-100 flex items-center justify-between px-4 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <span className="font-bold text-sm">Zertainity AI</span>
                    <Button variant="ghost" size="icon">
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>

                {/* Chat Container */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth" ref={scrollRef}>
                    <div className="max-w-3xl mx-auto space-y-8 py-10">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.role === 'assistant' && (
                                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                )}

                                <div className={`flex flex-col gap-1 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`px-5 py-3.5 text-sm md:text-[15px] leading-relaxed shadow-sm ${msg.role === 'user'
                                        ? 'bg-gray-100 text-gray-900 rounded-2xl rounded-tr-none font-medium'
                                        : 'bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-none ring-1 ring-gray-900/5'
                                        }`}>
                                        {msg.content}
                                    </div>

                                    {msg.role === 'assistant' && (
                                        <div className="flex items-center gap-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-gray-400 hover:text-gray-600 p-1"><Copy className="w-3.5 h-3.5" /></button>
                                            <button className="text-gray-400 hover:text-gray-600 p-1"><ThumbsUp className="w-3.5 h-3.5" /></button>
                                            <button className="text-gray-400 hover:text-gray-600 p-1"><ThumbsDown className="w-3.5 h-3.5" /></button>
                                        </div>
                                    )}
                                </div>

                                {msg.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-1">
                                        <User className="w-4 h-4 text-gray-600" />
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {isLoading && (
                            <div className="flex gap-4 justify-start">
                                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-1">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <div className="bg-white border border-gray-100 px-5 py-4 rounded-2xl rounded-tl-none ring-1 ring-gray-900/5">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white/50 backdrop-blur-lg border-t border-gray-100">
                    <div className="max-w-3xl mx-auto relative">
                        {messages.length === 1 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                                {["Career advice", "Draft resume", "Interview prep", "Find colleges"].map(suggestion => (
                                    <button
                                        key={suggestion}
                                        onClick={() => setInput(suggestion)}
                                        className="text-xs font-medium text-gray-500 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 transition-colors text-center truncate"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="relative flex items-end gap-2 bg-white border border-gray-200 shadow-sm rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-black/5 focus-within:border-gray-400 transition-all">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Message Zertainity AI..."
                                className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-base placeholder:text-gray-400 h-6 max-h-32 resize-none outline-none"
                            />
                            <div className="flex items-center gap-1">
                                <button className="text-gray-400 hover:text-black p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                                    <Mic className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className={`p-1.5 rounded-lg transition-all ${input.trim() && !isLoading
                                        ? 'bg-black text-white shadow-md hover:bg-gray-800'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <p className="text-[10px] text-center text-gray-400 mt-2">
                            Zertainity AI can make mistakes. Consider checking important information.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AIAssistant;
