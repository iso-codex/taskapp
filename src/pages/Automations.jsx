import React from 'react';
import { Zap, Plus, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Automations = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Automations</h1>
                    <p className="text-muted-foreground mt-1">Streamline your workflow with automated rules</p>
                </div>
                <Button className="bg-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Automation
                </Button>
            </div>

            <div className="space-y-4">
                {[
                    { title: 'Auto-assign tasks', desc: 'When a task is moved to "In Progress", assign to me', active: true },
                    { title: 'Notify on completion', desc: 'Send email when task is marked "Done"', active: true },
                    { title: 'Archive old tasks', desc: 'Archive tasks completed > 30 days ago', active: false },
                ].map((rule, i) => (
                    <div key={i} className="bg-card p-4 rounded-xl border border-border flex items-center justify-between hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${rule.active ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                                <Zap className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">{rule.title}</h3>
                                <p className="text-xs text-muted-foreground">{rule.desc}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-5 rounded-full relative cursor-pointer ${rule.active ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${rule.active ? 'left-6' : 'left-1'}`}></div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground cursor-pointer" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Automations;
