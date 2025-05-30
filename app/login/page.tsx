"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/navbar';
import { Chatbot } from '@/components/chatbot';
import { RegisterForm } from './components/register-form';
import { LoginForm } from './components/login-form';
import { SocialLogin } from './components/social-login';
import { PageLoading } from '@/components/ui/page-loading';
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/'

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        // User is authenticated, redirect to the original destination or home
        router.push(from);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="blob blob-blue"></div>
      <div className="blob blob-orange"></div>

      <Navbar />
      <PageLoading isLoading={isLoading} />

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
                <Card className="w-full max-w-md">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
                    <CardDescription className="text-center">
                      Enter your email and password to sign in to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LoginForm onLoadingChange={setIsLoading} />
                  </CardContent>
                </Card>
                <SocialLogin />
              </div>
            </TabsContent>

            <TabsContent value="register">
              <div className="space-y-4">
                <RegisterForm onLoadingChange={setIsLoading} />
                <SocialLogin />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Chatbot />
    </div>
  );
}
