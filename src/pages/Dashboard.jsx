import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useTaskStore } from '../store/taskStore';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';
import { CheckSquare, Clock, AlertCircle, FolderOpen, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuthStore();
    const { tasks } = useTaskStore();

    const stats = [
        {
            label: 'Total Tasks',
            value: tasks.length || 12,
            change: '+12% from last week',
            icon: CheckSquare,
            color: 'bg-blue-500',
        },
        {
            label: 'Active Projects',
            value: '8',
            change: '+2 new this month',
            icon: FolderOpen,
            color: 'bg-indigo-500',
        },
        {
            label: 'Hours Tracked',
            value: '42.5h',
            change: '+5h from last week',
            icon: Clock,
            color: 'bg-orange-500',
        },
        {
            label: 'Pending Reviews',
            value: '3',
            change: '-2 from yesterday',
            icon: AlertCircle,
            color: 'bg-purple-500',
        },
    ];

    const chartData = [
        { name: 'Mon', completed: 4, active: 3 },
        { name: 'Tue', completed: 3, active: 4 },
        { name: 'Wed', completed: 7, active: 2 },
        { name: 'Thu', completed: 5, active: 6 },
        { name: 'Fri', completed: 8, active: 4 },
        { name: 'Sat', completed: 4, active: 1 },
        { name: 'Sun', completed: 2, active: 0 },
    ];

    const projectData = [
        { name: 'Web', value: 45 },
        { name: 'Mobile', value: 30 },
        { name: 'Design', value: 25 },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 font-sans">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground">
                    Welcome back, {user?.email?.split('@')[0]}
                </h1>
                <p className="text-muted-foreground mt-2">Here's what's happening with your projects today.</p>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-white`}>
                                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.change.includes('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {stat.change.includes('+') ? '↑' : '↓'} {stat.change.split(' ')[0]}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-foreground">Task Completion Trend</h3>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs font-medium bg-secondary rounded-lg text-foreground">Weekly</button>
                            <button className="px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-secondary rounded-lg">Monthly</button>
                        </div>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                                />
                                <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--foreground))' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="completed"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorCompleted)"
                                    name="Completed"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="active"
                                    stroke="#f97316"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorActive)"
                                    name="New Active"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Secondary Chart / Activity */}
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col">
                    <h3 className="font-bold text-lg text-foreground mb-6">Activity Breakdown</h3>
                    <div className="h-48 w-full mb-6 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={projectData}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--foreground))' }} />
                                <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-auto space-y-4">
                        <div className="flex items-center justify-between p-3 bg-secondary rounded-xl cursor-pointer hover:bg-muted transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <CheckSquare className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">New Task Added</p>
                                    <p className="text-xs text-muted-foreground">Mobile App Redesign</p>
                                </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-secondary rounded-xl cursor-pointer hover:bg-muted transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <CheckSquare className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Project Completed</p>
                                    <p className="text-xs text-muted-foreground">Landing Page V2</p>
                                </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
