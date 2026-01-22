import React, { useEffect, useState, useRef } from 'react';
import { Search, Send, Phone, Video, MoreVertical, MessageSquare } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';
import { cn } from '../utils/cn';

const Chat = () => {
    const { user } = useAuthStore();
    const {
        conversations,
        messages,
        selectedUser,
        fetchContacts,
        selectUser,
        sendMessage,
        loading
    } = useChatStore();

    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        if (user) fetchContacts(user.id);
    }, [user, fetchContacts]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim() || !selectedUser) return;
        await sendMessage(input);
        setInput('');
    };

    return (
        <div className="h-[calc(100vh-6rem)] flex bg-card border border-border rounded-xl font-sans overflow-hidden">
            {/* Sidebar - Contacts */}
            <div className="w-80 border-r border-border flex flex-col">
                <div className="p-4 border-b border-border">
                    <h2 className="text-lg font-bold mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search chat"
                            className="w-full pl-9 pr-4 py-2 bg-secondary/50 rounded-lg text-sm focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="p-4 text-center text-muted-foreground text-sm">Loading contacts...</div>
                    ) : conversations.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground text-sm">No contacts found.</div>
                    ) : (
                        conversations.map((contact) => (
                            <div
                                key={contact.id}
                                onClick={() => selectUser(contact)}
                                className={cn(
                                    "p-4 cursor-pointer flex gap-3 border-b border-border/50 transition-colors",
                                    selectedUser?.id === contact.id ? "bg-secondary/80" : "hover:bg-secondary/50"
                                )}
                            >
                                <div className="w-10 h-10 rounded-full bg-secondary flex-shrink-0 overflow-hidden relative">
                                    {contact.avatar_url ? (
                                        <img src={contact.avatar_url} alt={contact.full_name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                                            {contact.full_name?.[0] || 'U'}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-semibold text-sm">{contact.full_name || 'User'}</span>
                                        <span className="text-[10px] text-muted-foreground capitalize">{contact.role}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">Click to start chatting</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedUser ? (
                    <>
                        {/* Header */}
                        <div className="h-16 border-b border-border flex items-center justify-between px-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden relative">
                                    {selectedUser.avatar_url ? (
                                        <img src={selectedUser.avatar_url} alt={selectedUser.full_name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{selectedUser.full_name?.[0] || 'U'}</span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">{selectedUser.full_name || 'User'}</h3>
                                    <p className="text-xs text-green-500">Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-muted-foreground">
                                <Phone className="w-5 h-5 cursor-pointer hover:text-foreground" />
                                <Video className="w-5 h-5 cursor-pointer hover:text-foreground" />
                                <MoreVertical className="w-5 h-5 cursor-pointer hover:text-foreground" />
                            </div>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto bg-secondary/10 flex flex-col gap-4">
                            {messages.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                                    <MessageSquare className="w-12 h-12 mb-2 opacity-50" />
                                    <p>No messages yet. Say hello!</p>
                                </div>
                            ) : (
                                messages.map((msg) => {
                                    const isMe = msg.sender_id === user?.id;
                                    return (
                                        <div key={msg.id} className={cn(
                                            "max-w-[70%] p-3 rounded-2xl shadow-sm",
                                            isMe
                                                ? "self-end bg-primary text-primary-foreground rounded-tr-none"
                                                : "self-start bg-card border border-border rounded-tl-none"
                                        )}>
                                            <p className="text-sm">{msg.content}</p>
                                            <span className={cn(
                                                "text-[10px] mt-1 block",
                                                isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                                            )}>
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-4 border-t border-border bg-card">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-secondary/50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <button type="submit" disabled={!input.trim()} className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground bg-secondary/5">
                        <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare className="w-8 h-8 opacity-50" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                        <p className="text-sm">Choose a contact from the sidebar to start chatting.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
