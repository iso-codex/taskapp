import React from 'react';
import { Workflow, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Workflows = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Workflow className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">No workflows created</h2>
            <p className="text-muted-foreground max-w-sm mb-6">Create workflows to visualize your process and track progress automatically across different stages.</p>
            <Button className="bg-black text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Workflow
            </Button>
        </div>
    );
};

export default Workflows;
