import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { CheckSquare, Mail, Lock } from 'lucide-react'

const Signup = () => {
    const navigate = useNavigate()
    const signUp = useAuthStore((state) => state.signUp)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError("Passwords don't match")
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            return
        }

        setLoading(true)
        try {
            await signUp(email, password)
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
            subtitle="Create your account"
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
                        minLength={6}
                        className="text-base"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2" htmlFor="confirmPassword">
                        <Lock className="w-4 h-4 text-muted-foreground" />
                        Confirm Password
                    </label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading}
                        minLength={6}
                        className="text-base"
                    />
                </div>

                <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? 'Creating account...' : 'Create Account'}
                </Button>

                <div className="text-center text-sm pt-2">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <Link to="/login" className="font-semibold text-primary hover:underline">
                        Sign in
                    </Link>
                </div>
            </form>
        </AuthLayout>
    )
}

export default Signup
