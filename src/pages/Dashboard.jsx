import React, { useEffect } from 'react'
import { CheckCircle2, Circle, Clock, AlertCircle, TrendingUp, Calendar } from 'lucide-react'
import { useTaskStore } from '../store/taskStore'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { useAuthStore } from '../store/authStore'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

const Dashboard = () => {
    const { user } = useAuthStore()
    const { tasks, fetchTasks } = useTaskStore()

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    const stats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'pending').length,
        completed: tasks.filter(t => t.status === 'completed').length,
        highPriority: tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length
    }

    const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

    const upcomingTasks = tasks
        .filter(t => t.status !== 'completed')
        .sort((a, b) => new Date(a.due_date || '9999-12-31') - new Date(b.due_date || '9999-12-31'))
        .slice(0, 5)

    const recentTasks = tasks
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5)

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
                <p className="text-muted-foreground mt-1">Here's what's happening with your tasks today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
                        <Circle className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.total}</div>
                        <p className="text-xs text-muted-foreground mt-1">All time</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
                        <Clock className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.pending}</div>
                        <p className="text-xs text-muted-foreground mt-1">In progress</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.completed}</div>
                        <p className="text-xs text-muted-foreground mt-1">{completionRate}% completion rate</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">High Priority</CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.highPriority}</div>
                        <p className="text-xs text-muted-foreground mt-1">Needs attention</p>
                    </CardContent>
                </Card>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Tasks */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold">Upcoming Tasks</CardTitle>
                        <Link to="/tasks">
                            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {upcomingTasks.length > 0 ? (
                            <div className="space-y-3">
                                {upcomingTasks.map(task => (
                                    <div key={task.id} className="flex items-start justify-between p-3 rounded-lg hover:bg-secondary transition-colors">
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{task.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                {task.due_date && (
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(task.due_date).toLocaleDateString()}
                                                    </span>
                                                )}
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize
                          ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-blue-100 text-blue-700'}`}>
                                                    {task.priority}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground text-sm">No upcoming tasks</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                        <TrendingUp className="w-5 h-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {recentTasks.length > 0 ? (
                            <div className="space-y-3">
                                {recentTasks.map(task => (
                                    <div key={task.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors">
                                        <div className="flex items-center gap-3">
                                            {task.status === 'completed' ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                            )}
                                            <div>
                                                <p className={`font-medium text-sm ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                                                    {task.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(task.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground text-sm">No recent activity</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard
