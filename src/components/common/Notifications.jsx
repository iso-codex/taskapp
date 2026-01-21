import React from 'react';
import { Bell, Check } from 'lucide-react';

const Notifications = () => {
    const notifications = [
        { id: 1, title: 'New project assigned', time: '2m ago', read: false },
        { id: 2, title: 'Meeting with Client', time: '1h ago', read: false },
        { id: 3, title: 'Task deadline updated', time: '3h ago', read: true },
    ];

    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-border py-2 z-50">
            <div className="px-4 py-2 border-b border-border flex justify-between items-center">
                <h3 className="font-semibold text-sm">Notifications</h3>
                <button className="text-xs text-primary hover:underline">Mark all read</button>
            </div>
            <div className="max-h-64 overflow-y-auto">
                {notifications.map((notif) => (
                    <div key={notif.id} className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex gap-3 ${!notif.read ? 'bg-blue-50/50' : ''}`}>
                        <div className="mt-1">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">{notif.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="px-4 py-2 border-t border-border text-center">
                <button className="text-xs text-muted-foreground hover:text-foreground">View all</button>
            </div>
        </div>
    );
};

export default Notifications;
