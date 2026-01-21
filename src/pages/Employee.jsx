import React from 'react';
import { UserCog } from 'lucide-react';

const Employee = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <UserCog className="w-6 h-6" /> Employee File
            </h1>
            <div className="p-6 bg-white border border-border rounded-xl">
                <p className="text-muted-foreground">Employee records, contracts, and personal files management.</p>
            </div>
        </div>
    );
};

export default Employee;
