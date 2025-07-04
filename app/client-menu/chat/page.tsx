"use client";
import { cn } from "@/lib/utils";
import { ChevronUp, Loader2, Mic, Paperclip, Search } from "lucide-react";
import React, { useRef, useState } from "react";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
};

function formatTime(date: string | number | Date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Page() {
    const [messages, ] = useState<Message[]>([]);
    const [isTyping,] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            // handleSendMessage(inputValue);
        }
    };
    return (
        <div className="py-8 px-36 space-y-6 w-screen">
            <div className="flex-1 overflow-y-auto min-h-[70vh] p-4 space-y-4">
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                            <div className={cn("max-w-[80%] rounded-lg p-3", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs opacity-70 mt-1 text-right">{formatTime(message.timestamp)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center min-h-[70vh]">
                        <h1 className="text-6xl font-bold w-[771px] text-center">Let’s Analyze Your Business ESG Performance</h1>
                    </div>
                )}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-[#505050] animate animate-pulse" />
                                <h1 className="text-xl">Generating answer please wait...</h1>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-primary text-secondary rounded-4xl">
                <div className="flex items-center gap-2">
                    <div className="w-full space-y-3">
                        <input
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="What can I help you?"
                            className="flex-1 px-4 py-3 rounded-md bg-transparent text-white placeholder-white focus:outline-none"
                        />
                        <div className="flex items-center gap-2">
                            <label className="cursor-pointer p-2 rounded hover:bg-white/10 transition">
                                <input
                                    type="file"
                                    hidden
                                    // onChange={handleFileUpload}
                                />
                                <Paperclip className="h-5 w-5 text-white" />
                            </label>

                            <button
                                // onClick={handleStartVoice}
                                className="p-2 rounded hover:bg-white/10 transition"
                            >
                                <Mic className="h-5 w-5 text-white" />
                            </button>

                            <button
                                // onClick={handleDeepResearch}
                                className="p-2 hover:bg-white/10 transition flex gap-2 items-center border rounded-xl"
                            >
                                <Search className="h-5 w-5 text-white" />
                                <h1>Research</h1>
                            </button>
                        </div>
                    </div>

                    <button
                        // onClick={() => handleSendMessage(inputValue)}
                        disabled={!inputValue.trim() || isTyping}
                        className="bg-white text-primary hover:bg-white/80 p-3 rounded-xl transition"
                    >
                        {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <ChevronUp className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
