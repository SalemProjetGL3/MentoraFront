"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Chatbot } from '@/components/chatbot';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function ResetPasswordSuccessPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="blob blob-blue"></div>
      <div className="blob blob-orange"></div>

      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md px-4 md:px-6">
          <div className="flex flex-col space-y-2 text-center mb-8">
            <Image src="/images/logo.png" alt="Mentora Logo" width={80} height={80} className="mx-auto" />
            <h1 className="text-2xl font-bold tracking-tight">Password Reset Complete</h1>
          </div>

          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-center">Success!</CardTitle>
              <CardDescription className="text-center">
                Your password has been successfully reset. You can now log in with your new password.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild>
                <Link href="/login">Go to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Chatbot />
    </div>
  );
} 