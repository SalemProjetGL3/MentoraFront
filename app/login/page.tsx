"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { Github, Linkedin } from "lucide-react"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: ""
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!mounted) return

    setIsLoading(true)
    
    const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL
    
    if (!apiUrl) {
      toast.error("Configuration error. Please contact support.")
      setIsLoading(false)
      return
    }

    console.log('Login attempt with:', { email: formData.email })

    try {
      console.log('Making login API call to:', `${apiUrl}/login`)
      const response = await axios.post(`${apiUrl}/login`, {
        email: formData.email,
        password: formData.password
      })

      console.log('Login API Response:', response.data)

      
      if (response.data.token) {
        console.log('Login successful, storing token')
        localStorage.setItem('token', response.data.token)
        toast.success("Login successful!")
        // Check if the error is related to unverified email
        if (response.data.message &&response.data.message.includes("User is not verified")) {
          await router.push("/email-verification")
          return
        }
        await router.push("/courses")
      }
    } catch (error: any) {
      console.error('Login Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url,
        apiUrl: process.env.NEXT_PUBLIC_AUTH_API_URL
      })
      
      if (error.response) {
        const errorMessage = error.response.data?.message || "Login failed. Please try again."
        toast.error(errorMessage)
      } else {
        toast.error("Network error. Please check your connection.")
      }
    } finally {
      setIsLoading(false)
      console.log('Login process completed')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!mounted) return
    
    if (formData.password !== formData.confirmPassword) {
      console.warn('Password mismatch detected')
      toast.error("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL
      
      if (!apiUrl) {
        throw new Error('API URL is not configured. Please check your environment variables.')
      }

      const response = await axios.post(`${apiUrl}/register`, {
        email: formData.email,
        password: formData.password,
        username: formData.username
      })

      console.log('Registration API Response:', response.data)

      // Store email for verification page
      localStorage.setItem('pendingVerificationEmail', formData.email)

      console.log('Attempting to redirect to email-verification page...')
      try {
        await router.push('/email-verification')
        console.log('Redirect successful')
      } catch (redirectError) {
        console.error('Redirect failed:', redirectError)
        // Fallback to window.location if router.push fails
        window.location.href = '/email-verification'
      }

      if (response.data.token) {
        console.log('Registration successful, storing token')
        localStorage.setItem('token', response.data.token)
        toast.success("Registration successful! Please verify your email.")
        
        // Force a small delay to ensure the toast is visible
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        return
      }
    } catch (error: any) {
      console.error('Registration Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url,
        apiUrl: process.env.NEXT_PUBLIC_AUTH_API_URL
      })
      
      if (error.message.includes('API URL is not configured')) {
        toast.error("Configuration error. Please contact support.")
      } else if (error.response) {
        toast.error(error.response.data?.message || "Registration failed. Please try again.")
      } else {
        toast.error("Network error. Please check your connection.")
      }
    } finally {
      setIsLoading(false)
      console.log('Registration process completed')
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="blob blob-blue"></div>
      <div className="blob blob-orange"></div>

      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md px-4 md:px-6">
          <div className="flex flex-col space-y-2 text-center mb-8">
            <Image src="/images/logo.png" alt="Mentora Logo" width={80} height={80} className="mx-auto" />
            <h1 className="text-2xl font-bold tracking-tight">Welcome to MENTORA</h1>
            <p className="text-sm text-muted-foreground">Sign in to access your learning paths</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <div className="space-y-4">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="example@email.com" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="text-xs text-muted-foreground hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        required 
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                  </div>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="register">
              <div className="space-y-4">
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        placeholder="johndoe" 
                        required 
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="example@email.com" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        required 
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        required 
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                  </div>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            By signing in, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </main>

      <Chatbot />
    </div>
  )
}
