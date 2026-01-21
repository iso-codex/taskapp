import React from 'react';
import { Grid, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Apps = () => {
    const apps = [
        { name: 'Slack', category: 'Communication', connected: true },
        { name: 'Google Drive', category: 'Storage', connected: true },
        { name: 'Github', category: 'Development', connected: false },
        { name: 'Figma', category: 'Design', connected: true },
        { name: 'Zoom', category: 'Communication', connected: false },
        { name: 'Notion', category: 'Productivity', connected: false },
    ];

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Apps & Integrations</h1>
                    <p className="text-muted-foreground mt-1">Supercharge your workflow with integrations</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-border flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-500">
                                {app.name[0]}
                            </div>
                            <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${app.connected ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                {app.connected ? 'Connected' : 'Not Connected'}
                            </span>
                        </div>
                        <div>
                            <h3 className="font-bold text-md">{app.name}</h3>
                            <p className="text-sm text-muted-foreground">{app.category}</p>
                        </div>
                        <Button variant={app.connected ? "outline" : "default"} className="w-full mt-2">
                            {app.connected ? 'Configure' : 'Connect'}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Apps;
