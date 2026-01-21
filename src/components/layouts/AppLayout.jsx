import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, X, Search, Bell } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../ui/Button'
import Sidebar from './Sidebar'

const AppLayout = () => {
    const { user } = useAuthStore()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

    return (
        <div className="min-h-screen bg-background flex font-sans">
            {/* Sidebar for Desktop */}
            <div className="hidden lg:block h-screen sticky top-0">
                <Sidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen bg-white">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 lg:px-8">
                    <div className="flex items-center gap-4 flex-1">
                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>

                        {/* Breadcrumbs or Title could go here - keeping it clean for now as per image often showing breadcrumbs */}
                        <div className="hidden md:flex text-sm text-muted-foreground items-center gap-2">
                            <span className="p-1 rounded hover:bg-gray-100 cursor-pointer">Files</span>
                            <span>&gt;</span>
                            <span className="p-1 rounded hover:bg-gray-100 cursor-pointer">Board</span>
                            <span>&gt;</span>
                            <span className="font-medium text-foreground">Overview</span>
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">
                        <div className='relative md:hidden'>
                            <Search className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </Button>
                        {/* Mobile User Profile Pic */}
                        <div className="lg:hidden w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ml-2">
                            {user?.email?.[0].toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="h-full w-64 bg-background" onClick={e => e.stopPropagation()}>
                            <Sidebar />
                        </div>
                    </div>
                )}

                <div className="flex-1 p-6 overflow-auto bg-white">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default AppLayout
