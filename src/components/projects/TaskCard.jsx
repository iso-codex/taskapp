import React from 'react';
import { MessageSquare, Paperclip, MoreHorizontal, Calendar } from 'lucide-react';
import { cn } from '../../utils/cn';

const TaskCard = ({ task }) => {
    return (
        <div className="bg-card p-4 rounded-xl border border-border hover:shadow-md transition-shadow cursor-pointer group">
            {/* Header: Client & Menu */}
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-muted-foreground">Client: {task.client}</span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-foreground mb-3 leading-snug">
                {task.title}
            </h3>

            {/* Users & Tags */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex -space-x-2">
                    {task.assignees.map((user, i) => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold">
                            <img src={`https://ui-avatars.com/api/?name=${user}&background=random`} alt={user} className="w-full h-full rounded-full" />
                        </div>
                    ))}
                    <div className="w-6 h-6 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-transparent ml-1">
                        <span className="text-[10px] text-gray-400">+</span>
                    </div>
                </div>

                <div className="flex gap-1">
                    {task.tags.map((tag, i) => (
                        <span key={i} className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-medium",
                            tag === 'Web' && "bg-blue-50 text-blue-600",
                            tag === 'Saas' && "bg-orange-50 text-orange-600",
                            tag === 'Mobile' && "bg-purple-50 text-purple-600",
                            !['Web', 'Saas', 'Mobile'].includes(tag) && "bg-gray-100 text-gray-600"
                        )}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Footer: Stats */}
            <div className="flex items-center justify-between pt-3 border-t border-border mt-1">
                <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="flex items-center gap-1 text-xs">
                        <MessageSquare className="w-3 h-3" />
                        <span>{task.comments}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                        <Paperclip className="w-3 h-3" />
                        <span>{task.files}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{task.daysLeft}d</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
