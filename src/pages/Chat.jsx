import React from 'react';
import { Search, Send, Phone, Video, MoreVertical } from 'lucide-react';

const Chat = () => {
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
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="p-4 hover:bg-secondary/50 cursor-pointer flex gap-3 border-b border-border/50">
                            <div className="w-10 h-10 rounded-full bg-secondary flex-shrink-0" />
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-semibold text-sm">User {i}</span>
                                    <span className="text-[10px] text-muted-foreground">12:30 PM</span>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">Hey, check out the new design updates...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="h-16 border-b border-border flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            PB
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">Phoenix Baker</h3>
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
                <div className="flex-1 p-6 overflow-y-auto bg-secondary/10 flex flex-col gap-4">
                    <div className="self-start max-w-[70%] bg-card border border-border p-3 rounded-2xl rounded-tl-none shadow-sm">
                        <p className="text-sm">Hi there! How is the project going?</p>
                        <span className="text-[10px] text-muted-foreground mt-1 block">10:00 AM</span>
                    </div>
                    <div className="self-end max-w-[70%] bg-primary text-white p-3 rounded-2xl rounded-tr-none shadow-sm">
                        <p className="text-sm">Going great! Just finished the sidebar implementation.</p>
                        <span className="text-[10px] text-primary-foreground/70 mt-1 block">10:05 AM</span>
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border bg-card">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 bg-secondary/50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button className="p-2 bg-primary text-white rounded-full hover:bg-primary/90">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
