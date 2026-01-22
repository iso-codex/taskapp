import React from 'react';
import { Download, Filter, MoreHorizontal } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Payments = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Payments</h1>
                <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { label: 'Total Revenue', value: '$45,231.89', change: '+20.1% from last month' },
                    { label: 'Pending', value: '$12,231.00', change: '+4% from last month' },
                    { label: 'Overdue', value: '$2,420.00', change: '-10% from last month' }
                ].map((stat, i) => (
                    <div key={i} className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">{stat.change}</p>
                    </div>
                ))}
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border flex justify-between items-center">
                    <h3 className="font-semibold text-sm">Recent Transactions</h3>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Filter className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Filter"
                                className="pl-8 pr-3 py-1.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary bg-background text-foreground"
                            />
                        </div>
                    </div>
                </div>
                <table className="w-full">
                    <thead className="bg-secondary/50">
                        <tr className="text-left text-xs text-muted-foreground font-medium uppercase">
                            <th className="px-6 py-3">Invoice</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {[1, 2, 3, 4].map((i) => (
                            <tr key={i} className="hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-sm">INV-00{i}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 ring-1 ring-inset ring-green-500/20">Paid</span>
                                </td>
                                <td className="px-6 py-4 text-sm">$1,200.00</td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">Jan {20 + i}, 2024</td>
                                <td className="px-6 py-4 text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payments;
