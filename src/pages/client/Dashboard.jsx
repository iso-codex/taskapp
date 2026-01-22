import React from 'react';
import { CreditCard, CheckSquare, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const ClientDashboard = () => {
    // Mock data for client dashboard
    const projectProgress = 65;
    const unpaidInvoices = 2;
    const totalDue = '$2,420.00';

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
            <p className="text-muted-foreground mb-8">Here's an overview of your project progress.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Project Progress Card */}
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                            <CheckSquare className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">In Progress</span>
                    </div>
                    <div className="mb-2">
                        <h3 className="text-2xl font-bold">Project Alpha</h3>
                        <p className="text-sm text-muted-foreground">Redesign and Development</p>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span className="font-semibold">{projectProgress}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${projectProgress}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Invoices Card */}
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded-full">Action Required</span>
                    </div>
                    <div className="mb-2">
                        <h3 className="text-2xl font-bold">{totalDue}</h3>
                        <p className="text-sm text-muted-foreground">{unpaidInvoices} Unpaid Invoice{unpaidInvoices !== 1 ? 's' : ''}</p>
                    </div>
                    <Button variant="outline" className="w-full mt-4 justify-between group">
                        View Invoices
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                {/* Chat Widget Card */}
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Programmer Online
                        </span>
                    </div>
                    <div className="mb-2">
                        <h3 className="text-lg font-semibold">Need an update?</h3>
                        <p className="text-sm text-muted-foreground">Chat with your assigned programmer directly.</p>
                    </div>
                    <Button className="w-full mt-4 bg-primary text-primary-foreground">
                        Open Chat
                    </Button>
                </div>
            </div>

            {/* Recent Activity / Timeline Placeholder */}
            <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <div className="w-2 h-2 mt-2 rounded-full bg-border flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium">Design phase completed</p>
                                <p className="text-xs text-muted-foreground">2 days ago</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
