import React, { useState } from 'react';
import { Plus, Upload, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import BoardView from '../components/projects/BoardView';

const Projects = () => {
    const [view, setView] = useState('board');

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col">
            {/* Breadcrumb / Header Area */}
            <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span className="p-1.5 bg-white border border-border rounded-lg shadow-sm">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="hover:text-foreground cursor-pointer">Board</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-foreground font-medium">Overview</span>
                </div>

                <h1 className="text-3xl font-bold text-foreground mb-6">Project UI/UX</h1>

                <div className="flex items-center justify-between">
                    {/* Tabs */}
                    <div className="flex bg-gray-100/50 p-1 rounded-lg border border-border">
                        {['Board', 'List', 'Timeline', 'Due Tasks'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setView(tab.toLowerCase().split(' ')[0])}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${view === tab.toLowerCase().split(' ')[0]
                                        ? 'bg-white text-foreground shadow-sm ring-1 ring-black/5'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button variant="outline" className="text-muted-foreground border-border bg-white hover:bg-gray-50">
                            <Upload className="w-4 h-4 mr-2" />
                            Import
                        </Button>
                        <Button className="bg-black text-white hover:bg-gray-800 border border-black/10 shadow-sm">
                            <Plus className="w-4 h-4 mr-2" />
                            New Board
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden">
                {view === 'board' && <BoardView />}
                {view !== 'board' && (
                    <div className="flex items-center justify-center h-full text-muted-foreground italic bg-gray-50 rounded-xl border border-dashed border-border">
                        {view.charAt(0).toUpperCase() + view.slice(1)} view coming soon
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
