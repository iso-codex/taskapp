import React from 'react';
import { MoreHorizontal, Plus, Filter, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Clients = () => {
    const clients = [
        { id: 1, name: 'Stellar', industry: 'SaaS', contact: 'Phoenix Baker', status: 'Active', projects: 3 },
        { id: 2, name: 'Taskez', industry: 'Mobile', contact: 'Phoenix Baker', status: 'Active', projects: 2 },
        { id: 3, name: 'Layers', industry: 'Web', contact: 'Olivia Rhye', status: 'Inactive', projects: 0 },
        { id: 4, name: 'Sisyphus', industry: 'Automation', contact: 'Lana Steiner', status: 'Active', projects: 5 },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Customers</h1>
                    <p className="text-muted-foreground mt-1">Manage your client relationships</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Customer
                    </Button>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                            All Customers
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                            Active
                        </Button>
                    </div>
                    <div className="flex items-center gap-2">
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
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Industry</th>
                            <th className="px-6 py-3">Contact</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Projects</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {clients.map((client) => (
                            <tr key={client.id} className="hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                            {client.name[0]}
                                        </div>
                                        <span className="font-medium text-sm">{client.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-xs font-medium text-foreground">
                                        {client.industry}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-foreground">
                                    {client.contact}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${client.status === 'Active'
                                        ? 'bg-green-500/10 text-green-600 ring-1 ring-inset ring-green-500/20'
                                        : 'bg-secondary text-muted-foreground ring-1 ring-inset ring-border'
                                        }`}>
                                        {client.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    {client.projects} Active
                                </td>
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

export default Clients;
