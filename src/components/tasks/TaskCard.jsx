import React from 'react'
import { CheckCircle2, Circle, Trash2, Calendar, Clock, MoreVertical } from 'lucide-react'
import { Card, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { useTaskStore } from '../../store/taskStore'
import { cn } from '../../utils/cn'

const TaskCard = ({ task }) => {
    const { updateTask, deleteTask } = useTaskStore()

    const toggleStatus = () => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed'
        updateTask(task.id, { status: newStatus })
    }

    const priorityConfig = {
        low: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
        medium: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
        high: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
    }

    const config = priorityConfig[task.priority]

    return (
        <Card className={cn(
            "transition-all duration-200 hover:shadow-md border-l-4",
            task.status === 'completed' ? "opacity-60 bg-gray-50/50 border-l-green-500" :
                task.priority === 'high' ? "border-l-red-500" :
                    task.priority === 'medium' ? "border-l-yellow-500" : "border-l-blue-500"
        )}>
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                        onClick={toggleStatus}
                        className="mt-0.5 text-gray-400 hover:text-primary transition-colors flex-shrink-0"
                    >
                        {task.status === 'completed' ? (
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                            <Circle className="w-6 h-6" />
                        )}
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className={cn(
                                "font-semibold text-base",
                                task.status === 'completed' && "line-through text-muted-foreground"
                            )}>
                                {task.title}
                            </h3>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                                onClick={() => deleteTask(task.id)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>

                        {task.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {task.description}
                            </p>
                        )}

                        {/* Meta Information */}
                        <div className="flex items-center gap-3 mt-3 flex-wrap">
                            <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium capitalize border",
                                config.bg,
                                config.text,
                                config.border
                            )}>
                                {task.priority}
                            </span>

                            {task.due_date && (
                                <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(task.due_date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: new Date(task.due_date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                                    })}
                                </span>
                            )}

                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="w-3.5 h-3.5" />
                                {new Date(task.created_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default TaskCard
