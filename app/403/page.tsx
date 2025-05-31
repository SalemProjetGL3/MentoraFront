'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

export default function ForbiddenPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto py-8 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-mentora-red">403</h1>
          <h2 className="text-2xl font-semibold">Access Forbidden</h2>
          <p className="text-muted-foreground max-w-md">
            Sorry, you don't have permission to access this page. Please contact an administrator if you believe this is a mistake.
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <Button onClick={() => router.push('/')}>
              Go Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
} 