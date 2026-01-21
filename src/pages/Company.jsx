import React from 'react';
import { Briefcase } from 'lucide-react';

const Company = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="w-6 h-6" /> Company File
            </h1>
            <div className="p-6 bg-white border border-border rounded-xl">
                <p className="text-muted-foreground">Company policies, documents, and assets would be organized here.</p>
            </div>
        </div>
    );
};

export default Company;
