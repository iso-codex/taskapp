import React, { useEffect, useState } from 'react'
import { Plus, Search, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, Clock, User } from 'lucide-react'
import { useTaskStore } from '../store/taskStore'
import { Button } from '../components/ui/Button'
import { cn } from '../utils/cn'

const TaskCalendar = () => {
    const { tasks, fetchTasks, addTask, updateTask } = useTaskStore()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedTask, setSelectedTask] = useState(null)
    const [view, setView] = useState('month') // month, week, day

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    // Get calendar data
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    // Generate calendar days
    const calendarDays = []
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.push(null)
    }
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day)
    }

    // Get tasks for a specific day
    const getTasksForDay = (day) => {
        if (!day) return []
        const dateStr = new Date(year, month, day).toISOString().split('T')[0]
        return tasks.filter(task => {
            if (!task.due_date) return false
            const taskDate = new Date(task.due_date).toISOString().split('T')[0]
            return taskDate === dateStr
        })
    }

    // Navigate months
    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    const today = new Date()
    const isToday = (day) => {
        return day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
    }

    // Calculate stats
    const completedTasks = tasks.filter(t => t.status === 'completed').length
    const totalTasks = tasks.length
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    const upcomingTasks = tasks.filter(t => t.due_date && new Date(t.due_date) > today && t.status !== 'completed')

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']

    return (
        <div className="flex h-[calc(100vh-8rem)] max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            {/* Main Calendar Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">Task Calendar</h1>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Task search"
                                    className="pl-9 pr-4 py-2 bg-secondary border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
                                />
                            </div>
                            <Button variant="outline" size="sm">
                                <Filter className="w-4 h-4 mr-2" />
                                By topic name
                            </Button>
                        </div>
                    </div>

                    {/* Analytics Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                            <div className="text-sm text-muted-foreground mb-1">Completion Rate</div>
                            <div className="text-3xl font-bold">{completionRate}%</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                            <div className="text-sm text-muted-foreground mb-1">Total Tasks</div>
                            <div className="text-3xl font-bold">{totalTasks}</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                            <div className="text-sm text-muted-foreground mb-1">Completed</div>
                            <div className="text-3xl font-bold">{completedTasks}</div>
                        </div>
                    </div>

                    {/* Month Navigation */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">{monthNames[month]} {year}</h2>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={previousMonth}>
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                                Today
                            </Button>
                            <Button variant="outline" size="sm" onClick={nextMonth}>
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="flex-1 overflow-auto p-6">
                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-2">
                        {calendarDays.map((day, index) => {
                            const dayTasks = getTasksForDay(day)
                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "min-h-[100px] border rounded-lg p-2 transition-colors",
                                        day ? "bg-white hover:bg-gray-50 cursor-pointer" : "bg-gray-50",
                                        isToday(day) && "border-primary border-2 bg-primary/5"
                                    )}
                                >
                                    {day && (
                                        <>
                                            <div className={cn(
                                                "text-sm font-medium mb-2",
                                                isToday(day) ? "text-primary font-bold" : "text-foreground"
                                            )}>
                                                {day}
                                            </div>
                                            <div className="space-y-1">
                                                {dayTasks.slice(0, 2).map((task) => (
                                                    <div
                                                        key={task.id}
                                                        className={cn(
                                                            "text-xs px-2 py-1 rounded truncate",
                                                            task.priority === 'high' ? "bg-red-100 text-red-700" :
                                                                task.priority === 'medium' ? "bg-yellow-100 text-yellow-700" :
                                                                    "bg-blue-100 text-blue-700"
                                                        )}
                                                        onClick={() => setSelectedTask(task)}
                                                    >
                                                        {task.title}
                                                    </div>
                                                ))}
                                                {dayTasks.length > 2 && (
                                                    <div className="text-xs text-muted-foreground px-2">
                                                        +{dayTasks.length - 2} more
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Right Sidebar - Task Details */}
            <div className="w-80 border-l border-border bg-gray-50 flex flex-col">
                <div className="p-4 border-b border-border bg-white">
                    <h3 className="font-semibold mb-2">At work</h3>
                    <div className="space-y-2">
                        {upcomingTasks.slice(0, 3).map((task) => (
                            <div key={task.id} className="flex items-center justify-between text-sm">
                                <span className="truncate">{task.title}</span>
                                <span className="text-xs text-muted-foreground">
                                    {task.due_date ? new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedTask ? (
                    <div className="flex-1 p-4 overflow-auto">
                        <div className="bg-white rounded-lg p-4 border border-border">
                            <h3 className="font-semibold mb-3">{selectedTask.title}</h3>

                            {selectedTask.description && (
                                <p className="text-sm text-muted-foreground mb-4">
                                    {selectedTask.description}
                                </p>
                            )}

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Due:</span>
                                    <span className="font-medium">
                                        {selectedTask.due_date
                                            ? new Date(selectedTask.due_date).toLocaleDateString()
                                            : 'No date'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Status:</span>
                                    <span className={cn(
                                        "px-2 py-0.5 rounded-full text-xs font-medium",
                                        selectedTask.status === 'completed' ? "bg-green-100 text-green-700" :
                                            selectedTask.status === 'in_progress' ? "bg-blue-100 text-blue-700" :
                                                "bg-gray-100 text-gray-700"
                                    )}>
                                        {selectedTask.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-muted-foreground">Priority:</span>
                                    <span className={cn(
                                        "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                                        selectedTask.priority === 'high' ? "bg-red-100 text-red-700" :
                                            selectedTask.priority === 'medium' ? "bg-yellow-100 text-yellow-700" :
                                                "bg-blue-100 text-blue-700"
                                    )}>
                                        {selectedTask.priority}
                                    </span>
                                </div>
                            </div>

                            <Button
                                className="w-full mt-4"
                                onClick={() => updateTask(selectedTask.id, {
                                    status: selectedTask.status === 'completed' ? 'pending' : 'completed'
                                })}
                            >
                                {selectedTask.status === 'completed' ? 'Mark as Pending' : 'Mark as Complete'}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center p-4">
                        <div className="text-center">
                            <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-20" />
                            <p className="text-sm text-muted-foreground">
                                Click on a task to view details
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TaskCalendar
