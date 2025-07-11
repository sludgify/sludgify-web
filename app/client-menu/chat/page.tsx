"use client";
import { cn } from "@/lib/utils";
import { ChevronUp, Loader2, Mic, Paperclip, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
    links?: string[];
    audio?: string;
}

interface SocketMessage {
    username?: string;
    message?: string;
    original_message?: string;
    response_message?: string;
    links?: string[];
}

function formatTime(date: string | number | Date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Page() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [voiceBase64, setVoiceBase64] = useState<string | null>(null);
    // Add SpeechRecognition type for TypeScript
    type SpeechRecognitionType = typeof window extends { SpeechRecognition: infer T } ? T : typeof window extends { webkitSpeechRecognition: infer T } ? T : any;

    const recognitionRef = useRef<InstanceType<SpeechRecognitionType> | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem("accessToken");
        if (userData) {
            setToken(userData);
            const newSocket = io("http://localhost:5000");
            setSocket(newSocket);

            newSocket.on("connect", () => {
                console.log("Connected to server");
                newSocket.emit("join", { room: "default", token: userData });
            });

            newSocket.on("chat_history", (msgs: SocketMessage[]) => {
                console.log("chat_history: ", msgs);

                const formatted: Message[] = [];

                msgs.forEach((msg, index) => {
                    const timestamp = new Date().toISOString();

                    // Tambahkan pesan user jika ada original_message
                    if (msg.original_message) {
                        formatted.push({
                            id: `${index}-user`,
                            role: "user",
                            content: msg.original_message,
                            timestamp,
                        });
                    }

                    // Tambahkan jawaban dari bot jika ada response_message
                    if (msg.response_message) {
                        formatted.push({
                            id: `${index}-bot`,
                            role: "assistant",
                            content: msg.response_message,
                            timestamp,
                            links: msg.links || [],
                        });
                    }
                });

                setMessages(formatted);
            });

            newSocket.on("message", (msg: string) => {
                setIsTyping(false);
                setMessages((prev) => [
                    ...prev,
                    {
                        id: `${Date.now()}`,
                        role: "assistant",
                        content: msg,
                        timestamp: new Date().toISOString(),
                    },
                ]);
            });

            newSocket.on("message_with_links", (data) => {
                setIsTyping(false);

                // Tampilkan balasan dari bot
                setMessages((prev) => [
                    ...prev,
                    {
                        id: `${Date.now()}-bot`,
                        role: "assistant",
                        content: data.response_message ?? data.message ?? "",
                        timestamp: new Date().toISOString(),
                        links: data.links || [],
                    },
                ]);
            });

            newSocket.on("disconnect", () => {
                console.warn("Disconnected from server");
            });

            return () => {
                newSocket.disconnect();
            };
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSendMessage = (msg: string) => {
        if (!msg || !socket || !token) return;

        setMessages((prev) => [
            ...prev,
            {
                id: `${Date.now()}`,
                role: "user",
                content: msg,
                timestamp: new Date().toISOString(),
            },
        ]);
        setIsTyping(true);
        if (voiceBase64) {
            socket.emit("message", {
                room: "default",
                audio: voiceBase64,
                token,
                type: "voice",
            });
            setVoiceBase64(null);
        } else if (uploadedFile) {
            console.log("uploadedFile", uploadedFile);
            const reader = new FileReader();
            reader.onload = () => {
                const base64File = reader.result?.toString().split(",")[1];
                console.log(base64File);
                socket.emit("message", {
                    room: "default",
                    token,
                    msg,
                    pdf_base64: base64File,
                    methode: "resume",
                    type: "text",
                });
                setUploadedFile(null);
            };
            reader.readAsDataURL(uploadedFile);
        } else {
            socket.emit("message", { room: "default", msg, token });
        }
        setInputValue("");
    };

    const toggleRecording = () => {
        if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
            alert("Browser tidak mendukung Speech Recognition. Coba gunakan Google Chrome.");
            return;
        }

        if (isRecording) {
            recognitionRef.current?.stop();
            setIsRecording(false);
        } else {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.lang = "id-ID"; // ubah sesuai bahasa
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                const transcript = event.results[0][0].transcript;
                setInputValue(transcript); // Langsung masukkan ke input
            };

            recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error("Recognition error:", event.error);
                alert("Terjadi kesalahan saat merekam: " + event.error);
            };

            recognition.onend = () => {
                setIsRecording(false);
            };

            recognitionRef.current = recognition;
            recognition.start();
            setIsRecording(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(inputValue);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Area pesan/chat */}
            <div className="flex-1 overflow-y-auto px-4 py-6 flex justify-center">
                <div className="w-full max-w-[700px] space-y-4">
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                                <div className={cn("whitespace-pre-wrap", message.role === "user" ? "max-w-[80%] rounded-lg p-3 bg-primary text-primary-foreground" : "")}>
                                    <div className="overflow-x-auto prose prose-sm prose-invert max-w-full break-words whitespace-pre-wrap [&>p]:mb-1 [&>ul]:mb-1 [&>li]:my-0">
                                        {message.role === "assistant" ? (
                                            <ReactMarkdown
                                                components={{
                                                    a: ({ node, ...props }) => <a {...props} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" />,
                                                }}
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeRaw]}
                                            >
                                                {message.content}
                                            </ReactMarkdown>
                                        ) : (
                                            <p className="mb-1">{message.content}</p>
                                        )}
                                    </div>

                                    {message.links?.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {message.links.map((link, i) => (
                                                <button key={i} onClick={() => window.open(link, "_blank")} className="px-3 py-1 text-xl bg-black text-white rounded-lg font-radley hover:bg-black/70 transition drop-shadow-xl">
                                                    Download Report {i + 1}
                                                    <Image src="/file-download.svg" alt="Download Icon" width={20} height={20} className="inline ml-2" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    <p className={`text-xs opacity-70 mt-1 ${message.role === "user" ? "text-right" : "text-left"}`}>{formatTime(message.timestamp)}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center items-center min-h-[60vh]">
                            <h1 className="text-6xl font-bold w-[771px] text-center">Let’s Analyze Your Business ESG Performance</h1>
                        </div>
                    )}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="max-w-[80%] rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-[#505050] animate-pulse" />
                                    <h1 className="text-xl flex items-center gap-1">
                                        Generating answer
                                        <span className="animate-bounce delay-0">.</span>
                                        <span className="animate-bounce delay-150">.</span>
                                        <span className="animate-bounce delay-300">.</span>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <Image src={"/text-search.svg"} alt={"text-search"} width={35} height={35} className="absolute top-3 right-10" />
            </div>

            {/* Sticky Input */}
            <div className="sticky bottom-0  w-full z-10 flex justify-center px-4 py-3">
                <div className="w-full max-w-[800px] bg-primary p-3 text-secondary rounded-2xl">
                    <div className="flex items-center gap-2">
                        <div className="w-full space-y-3">
                            <input
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="What can I help you?"
                                className="flex-1 px-4 py-3 w-full rounded-md bg-transparent text-white placeholder-white focus:outline-none"
                            />
                            <div className="flex items-center gap-2">
                                <label className="cursor-pointer p-2 rounded hover:bg-white/10 transition">
                                    <input
                                        type="file"
                                        hidden
                                        accept=".pdf"
                                        ref={fileInputRef}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setUploadedFile(file);
                                                if (fileInputRef.current) fileInputRef.current.value = "";
                                            }
                                        }}
                                    />
                                    <Paperclip className="h-5 w-5 text-white" />
                                </label>
                                <button className={cn("p-2 rounded hover:bg-white/10 transition", isRecording && "bg-red-500")} onClick={toggleRecording}>
                                    <Mic className="h-5 w-5 text-white" />
                                </button>
                                <button className="p-2 hover:bg-white/10 transition flex gap-2 items-center border rounded-xl">
                                    <Search className="h-5 w-5 text-white" />
                                    <h1>Research</h1>
                                </button>
                                {uploadedFile && (
                                    <div className="text-sm text-white opacity-80">
                                        📎 File attached: <strong>{uploadedFile.name}</strong>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isTyping} className="bg-white text-primary hover:bg-white/80 p-3 rounded-xl transition">
                            {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <ChevronUp className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
