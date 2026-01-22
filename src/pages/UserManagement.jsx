import React from 'react';
import { UserPlus, Shield, MoreHorizontal } from 'lucide-react';
import { Button } from '../components/ui/Button';

const UserManagement = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className="text-muted-foreground mt-1">Manage team access and roles</p>
                </div>
                <Button className="bg-primary text-primary-foreground">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite User
                </Button>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <table className="w-full">
                    <thead className="bg-secondary/50">
                        <tr className="text-left text-xs text-muted-foreground font-medium uppercase">
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Last Active</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {[
                            { name: 'Phoenix Baker', email: 'phoenix@example.com', role: 'Admin', status: 'Active' },
                            { name: 'Olivia Rhye', email: 'olivia@example.com', role: 'Editor', status: 'Active' },
                            { name: 'Lana Steiner', email: 'lana@example.com', role: 'Viewer', status: 'Pending' },
                        ].map((user, i) => (
                            <tr key={i} className="hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-sm">
                                        <Shield className="w-3 h-3 text-muted-foreground" />
                                        {user.role}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    2 mins ago
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Active'
                                        ? 'bg-green-500/10 text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-500/20'
                                        : 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 ring-1 ring-inset ring-yellow-500/20'
                                        }`}>
                                        {user.status}
                                    </span>
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

export default UserManagement;
