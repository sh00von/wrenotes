'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Droplet, Lock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const WaveBackground = () => (
  <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
      <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  </div>
)

const BubbleAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-cyan-500 rounded-full opacity-30"
        style={{
          width: Math.random() * 50 + 10,
          height: Math.random() * 50 + 10,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -1000],
          opacity: [0.3, 0],
        }}
        transition={{
          duration: Math.random() * 10 + 20,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
        }}
      />
    ))}
  </div>
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    // Here you would typically make an API call to authenticate the user
    console.log('Logging in with:', { email, password })
    // Redirect to the admin panel or show a success message
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 text-blue-100 overflow-hidden">
      <WaveBackground />
      <BubbleAnimation />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px] bg-cyan-800 bg-opacity-50 backdrop-blur-md border-cyan-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-cyan-100 flex items-center justify-center">
              <Droplet className="mr-2 h-6 w-6" />
              Water Course Admin
            </CardTitle>
            <CardDescription className="text-center text-cyan-200">
              Login to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-cyan-100">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-cyan-300" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9 bg-cyan-700 bg-opacity-50 text-cyan-100 border-cyan-600 placeholder-cyan-300"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-cyan-100">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-cyan-300" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 bg-cyan-700 bg-opacity-50 text-cyan-100 border-cyan-600 placeholder-cyan-300"
                    />
                  </div>
                </div>
              </div>
              {error && (
                <Alert variant="destructive" className="mt-4 bg-red-900 bg-opacity-50 border-red-700">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500">
                Log In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-cyan-300 text-sm">
            <p className="w-full">Forgot password? Contact your administrator</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
