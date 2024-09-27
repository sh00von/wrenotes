'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Droplet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function LoginPage() {
  const [pin, setPin] = useState(['', '', '', '']); // Array for four PIN digits
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e, index) => {
    const newPin = [...pin]
    newPin[index] = e.target.value

    // Move to the next input if the current input is filled
    if (e.target.value.length === 1 && index < pin.length - 1) {
      document.getElementById(`pin-${index + 1}`).focus()
    }

    setPin(newPin)
  }

  const handleKeyDown = (e, index) => {
    // Move to the previous input if the current input is empty and backspace is pressed
    if (e.key === 'Backspace' && index > 0 && pin[index] === '') {
      document.getElementById(`pin-${index - 1}`).focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const pinValue = pin.join('')
    if (pinValue.length < pin.length) {
      setError('Please enter your full PIN.')
      return
    }

    try {
      // Send the PIN to your API for validation
      const response = await axios.post('/api/login', { pin: pinValue })

      // If successful, redirect the user smoothly
      if (response.status === 200) {
        // Using router.push for a smooth redirect
        router.push('/')
      }
    } catch (error) {
      // Handle error if PIN is invalid
      setError('Invalid PIN. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px] bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-purple-600 flex items-center justify-center">
              <Droplet className="mr-2 h-6 w-6 text-purple-600" />
              Water Course Admin
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your PIN to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between space-x-2 mb-4">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    id={`pin-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-1/4 h-14 text-3xl text-center border-b-4 border-purple-500 bg-transparent text-purple-700 placeholder-purple-300 focus:outline-none focus:border-blue-500 transition"
                    placeholder="●"
                  />
                ))}
              </div>
              {error && (
                <Alert variant="destructive" className="mt-4 bg-red-900 bg-opacity-50 border-red-700">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full mt-6 bg-purple-600 hover:bg-purple-500 transition">
                Log In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-gray-600 text-sm">
            <p className="w-full">Forgot PIN? Contact your administrator</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
