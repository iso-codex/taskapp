import React, { useEffect, useState } from 'react'
import { Plus, Filter, Search } from 'lucide-react'
import { useTaskStore } from '../store/taskStore'
import TaskCard from '../components/tasks/TaskCard'
import AddTaskModal from '../components/tasks/AddTaskModal'
import { Button } from '../components/ui/Button'

const Tasks = () => {
    const { tasks, fetchTasks, loading, error } = useTaskStore()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [filter, setFilter] = useState('all') // all, pending, completed
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    const filteredTasks = tasks.filter(task => {
        const matchesFilter = filter === 'all' || task.status === filter
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const tasksByStatus = {
        pending: filteredTasks.filter(t => t.status === 'pending'),
        in_progress: filteredTasks.filter(t => t.status === 'in_progress'),
        completed: filteredTasks.filter(t => t.status === 'completed'),
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
                    <p className="text-muted-foreground mt-1">Manage and track all your tasks</p>
                </div>

                <Button onClick={() => setIsModalOpen(true)} className="shadow-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Task
                </Button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <select
                        className="h-10 rounded-lg border border-border bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Tasks ({tasks.length})</option>
                        <option value="pending">Pending ({tasksByStatus.pending.length})</option>
                        <option value="completed">Completed ({tasksByStatus.completed.length})</option>
                    </select>
                </div>
            </div>

            {/* Task Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold mt-1">{tasksByStatus.pending.length}</p>
                </div>
                <div className="bg-white rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold mt-1">{tasksByStatus.in_progress.length}</p>
                </div>
                <div className="bg-white rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold mt-1">{tasksByStatus.completed.length}</p>
                </div>
            </div>

            {/* Task List */}
            {loading && filteredTasks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-border">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground mt-4">Loading tasks...</p>
                </div>
            ) : error ? (
                <div className="text-center py-12 bg-white rounded-lg border border-border">
                    <p className="text-destructive">{error}</p>
                </div>
            ) : filteredTasks.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-border">
                    <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center mb-4">
                        <Plus className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">No tasks found</h3>
                    <p className="text-muted-foreground mt-1 mb-4">
                        {searchQuery ? 'Try adjusting your search' : 'Get started by creating your first task'}
                    </p>
                    {!searchQuery && (
                        <Button onClick={() => setIsModalOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Task
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid gap-3">
                    {filteredTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            )}

            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}

export default Tasks
