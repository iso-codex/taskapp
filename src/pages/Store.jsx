import React from 'react';
import { Store as StoreIcon } from 'lucide-react';

const Store = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <StoreIcon className="w-6 h-6" /> Store File
            </h1>
            <div className="p-6 bg-white border border-border rounded-xl">
                <p className="text-muted-foreground">Store documentation and file management would go here.</p>
            </div>
        </div>
    );
};

export default Store;
