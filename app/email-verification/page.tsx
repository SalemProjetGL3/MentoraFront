"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import axios from "axios"
import { toast } from "sonner"

export default function EmailVerificationPage() {
  const router = useRouter()
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [hasResent, setHasResent] = useState(false)

  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else {
      setIsButtonDisabled(false)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [countdown])

  // Handle Resend Email
  const handleResendEmail = async () => {
    if (isButtonDisabled || isResending) return
    
    setIsResending(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL
      if (!apiUrl) {
        throw new Error('API URL is not configured')
      }

      const token = localStorage.getItem('emailToken')
      if (!token) {
        console.log('No token found')
        return
      }

      const response = await axios.post(`${apiUrl}/resend-verification`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.data.success) {
        toast.success("Verification email resent successfully!")
        setHasResent(true)
        setIsButtonDisabled(true)
        setCountdown(60)
      }
    } catch (error: any) {
      console.error('Resend Error:', error)
      if (error.response?.status === 403) {
        console.log('403 error')
      } else {
        toast.error(error.response?.data?.message || "Failed to resend verification email. Please try again.")
      }
    } finally {
      setIsResending(false)
    }
  }

  const getButtonText = () => {
    if (isResending) return "Sending..."
    if (hasResent) return `Email Resent (${countdown}s)`
    if (isButtonDisabled) return `Resend in ${countdown}s`
    return "Resend Verification Email"
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="blob blob-blue"></div>
      <div className="blob blob-orange"></div>

      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md px-4 md:px-6">
          <div className="flex flex-col space-y-6 text-center">
            <div className="relative w-20 h-20 mx-auto">
              <Image 
                src="/images/logo.png"
                alt="Mentora Logo"
                fill
                sizes="(max-width: 80px) 100vw, 80px"
                style={{ 
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                }}
                priority
              />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">Check Your Email</h1>
              <p className="text-muted-foreground">
                We've sent you a verification email. Please check your inbox and click the verification link to continue.
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleResendEmail} 
                className="w-full"
                disabled={isButtonDisabled || isResending}
              >
                {getButtonText()}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => router.push('/login')}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 