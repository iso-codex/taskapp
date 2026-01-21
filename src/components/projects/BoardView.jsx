import React from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';
import TaskCard from './TaskCard';

const BoardView = () => {
    // Mock Data based on Image
    const columns = [
        {
            id: 'todo',
            title: 'To Do',
            count: 3,
            tasks: [
                { id: 1, client: 'Stellar', title: 'Change top CTA button text', assignees: ['Phoenix Baker'], tags: ['Web', 'Saas'], comments: 4, files: 2, daysLeft: 4 },
                { id: 2, client: 'Stellar', title: 'Redesign analytics dashboard', assignees: ['Phoenix Baker'], tags: ['Saas', 'Mobile'], comments: 4, files: 2, daysLeft: 4 },
                { id: 3, client: 'Taskez', title: 'Create landing page', assignees: ['Phoenix Baker'], tags: ['Web', 'Saas'], comments: 4, files: 2, daysLeft: 4 },
            ]
        },
        {
            id: 'inprogress',
            title: 'In Progress',
            count: 2,
            tasks: [
                { id: 4, client: 'Stellar', title: 'Redesign news page', assignees: ['Phoenix Baker'], tags: ['Web'], comments: 4, files: 2, daysLeft: 4 },
                { id: 5, client: 'Taskez', title: 'Copywrite', assignees: ['Phoenix Baker'], tags: ['Web'], comments: 4, files: 2, daysLeft: 4 },
            ]
        },
        {
            id: 'inreview',
            title: 'In Review',
            count: 3,
            tasks: [
                { id: 6, client: 'Stellar', title: 'UI Animation for the onboarding...', assignees: ['Phoenix Baker'], tags: ['Web', 'Saas'], comments: 4, files: 2, daysLeft: 4 },
                { id: 7, client: 'Stellar', title: 'UI Dark mode improvements', assignees: ['Phoenix Baker'], tags: ['Saas', 'Mobile'], comments: 4, files: 2, daysLeft: 4 },
                { id: 8, client: 'Taskez', title: 'Mobile Redesign', assignees: ['Phoenix Baker'], tags: ['Mobile'], comments: 4, files: 2, daysLeft: 4 },
            ]
        },
        {
            id: 'completed',
            title: 'Completed',
            count: 4,
            tasks: [
                { id: 9, client: 'Taskez', title: 'Navigation improvements', assignees: ['Phoenix Baker'], tags: ['Web'], comments: 4, files: 2, daysLeft: 4 },
                { id: 10, client: 'Taskez', title: 'Text Animation', assignees: ['Phoenix Baker'], tags: ['Mobile'], comments: 4, files: 2, daysLeft: 4 },
                { id: 11, client: 'Stellar', title: 'Change top CTA button text', assignees: ['Phoenix Baker'], tags: ['Web'], comments: 4, files: 2, daysLeft: 4 },
            ]
        }
    ];

    return (
        <div className="flex overflow-x-auto pb-4 gap-6 h-full">
            {columns.map((column) => (
                <div key={column.id} className="min-w-[300px] flex flex-col h-full">
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-4 px-1">
                        <div className="flex items-center gap-2">
                            <div className={`w-1 h-4 rounded-full ${column.id === 'todo' ? 'bg-indigo-500' :
                                    column.id === 'inprogress' ? 'bg-orange-500' :
                                        column.id === 'inreview' ? 'bg-purple-500' : 'bg-green-500'
                                }`}></div>
                            <h2 className="font-semibold text-sm text-foreground">{column.title}</h2>
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">{column.count}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                            <button className="p-1 hover:bg-gray-100 rounded-md"><Plus className="w-4 h-4" /></button>
                            <button className="p-1 hover:bg-gray-100 rounded-md"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                    </div>

                    {/* Tasks Container */}
                    <div className="flex-1 flex flex-col gap-3">
                        {column.tasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                        <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-border text-muted-foreground hover:bg-gray-50 text-sm font-medium mt-1">
                            <Plus className="w-4 h-4" />
                            Add new
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BoardView;
