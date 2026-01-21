import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { CheckSquare, Mail, Lock } from 'lucide-react'

const Login = () => {
    const navigate = useNavigate()
    const signIn = useAuthStore((state) => state.signIn)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await signIn(email, password)
            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout
            title={
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                        <CheckSquare className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold">TaskHub</span>
                </div>
            }
            subtitle="Sign in to your account"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2" htmlFor="email">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        Email Address
                    </label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        disabled={loading}
                        className="text-base"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2" htmlFor="password">
                        <Lock className="w-4 h-4 text-muted-foreground" />
                        Password
                    </label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        className="text-base"
                    />
                </div>

                <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                </Button>

                <div className="text-center text-sm pt-2">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <Link to="/signup" className="font-semibold text-primary hover:underline">
                        Create account
                    </Link>
                </div>
            </form>
        </AuthLayout>
    )
}

export default Login
