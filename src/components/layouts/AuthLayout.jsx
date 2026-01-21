import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md space-y-8">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-extrabold text-gray-900">
                        {title}
                    </CardTitle>
                    {subtitle && (
                        <p className="mt-2 text-sm text-gray-600">
                            {subtitle}
                        </p>
                    )}
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>
    )
}

export default AuthLayout
