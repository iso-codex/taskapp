import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    Search,
    Home,
    CheckSquare,
    FileText,
    Calendar,
    MessageSquare,
    CreditCard,
    Users,
    Zap,
    UserCog,
    Workflow,
    FolderOpen,
    Briefcase,
    Store,
    Grid,
    ChevronDown,
    ChevronRight,
    LogOut
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuthStore } from '../../store/authStore';

const Sidebar = ({ className }) => {
    const { user, signOut } = useAuthStore();
    const location = useLocation();
    const [fileExpanded, setFileExpanded] = useState(true);

    const mainNavItems = [
        { label: 'Home', icon: Home, path: '/' },
        { label: 'Tasks', icon: CheckSquare, path: '/tasks' },
        { label: 'Docs', icon: FileText, path: '/notes' },
        { label: 'Schedule', icon: Calendar, path: '/calendar' },
        { label: 'Chat', icon: MessageSquare, path: '/chat', disabled: true },
        { label: 'Payments', icon: CreditCard, path: '/payments', disabled: true },
        { label: 'Customers', icon: Users, path: '/clients' },
        { label: 'Automations', icon: Zap, path: '/automations', disabled: true },
        { label: 'User Management', icon: UserCog, path: '/users', disabled: true },
        { label: 'Workflows', icon: Workflow, path: '/workflows', disabled: true },
    ];

    const fileNavItems = [
        { label: 'Store', icon: Store, path: '/store', disabled: true },
        { label: 'Company', icon: Briefcase, path: '/company', disabled: true },
        { label: 'Employee', icon: UserCog, path: '/employee', disabled: true },
    ];

    return (
        <div className={cn("flex flex-col h-screen bg-[#F3F4F6] border-r border-border w-64 p-4", className)}>
            {/* Brand */}
            <div className="flex items-center gap-2 px-2 mb-8">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    {/* Simple box logo representation */}
                    <div className="w-4 h-4 border-2 border-white transform rotate-45"></div>
                </div>
                <span className="text-xl font-bold text-foreground">Taskk</span>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-white rounded-lg pl-9 pr-4 py-2 text-sm border-none focus:ring-1 focus:ring-primary shadow-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <span className="text-muted-foreground text-xs">⌘</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
                {mainNavItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.disabled ? '#' : item.path}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            isActive && !item.disabled
                                ? "bg-white text-foreground shadow-sm font-semibold"
                                : "text-muted-foreground hover:bg-white/50 hover:text-foreground",
                            item.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
                        )}
                        onClick={(e) => item.disabled && e.preventDefault()}
                    >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </NavLink>
                ))}

                {/* File Section */}
                <div className="pt-4 pb-2">
                    <button
                        onClick={() => setFileExpanded(!fileExpanded)}
                        className="flex items-center w-full px-3 py-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                        {fileExpanded ? <ChevronDown className="w-3 h-3 mr-2" /> : <ChevronRight className="w-3 h-3 mr-2" />}
                        File
                        <div className="ml-auto flex gap-1">
                            <span className="text-xs">+</span>
                            <span className="text-xs">:</span>
                        </div>
                    </button>

                    {fileExpanded && (
                        <div className="mt-1 space-y-1">
                            {fileNavItems.map((item) => (
                                <NavLink
                                    key={item.label}
                                    to={item.path}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors pl-8",
                                        "text-muted-foreground hover:bg-white/50 hover:text-foreground",
                                        item.disabled && "opacity-50 cursor-not-allowed"
                                    )}
                                    onClick={(e) => item.disabled && e.preventDefault()}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>

                <div className="pt-2">
                    <NavLink
                        to="/apps"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-white/50 hover:text-foreground"
                    >
                        <Grid className="w-4 h-4" />
                        Apps
                        <div className="ml-auto flex gap-1">
                            <span className="text-xs">+</span>
                            <span className="text-xs">:</span>
                        </div>
                    </NavLink>
                </div>

            </nav>

            {/* User / Logout */}
            <div className="pt-4 mt-auto border-t border-gray-200">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {user?.email?.[0].toUpperCase()}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{user?.email}</p>
                    </div>
                    <button onClick={signOut} className="text-muted-foreground hover:text-destructive">
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
