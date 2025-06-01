'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function VerifyEmailFailPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <CardTitle>Email Verification Failed</CardTitle>
          </div>
          <CardDescription>
            We couldn't verify your email address. This could be because:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-sm text-muted-foreground">
            <li>The verification link has expired</li>
            <li>The verification link is invalid</li>
            <li>There was an error processing your request</li>
          </ul>
          <div className="flex flex-col gap-4">
            <Button asChild variant="default">
              <Link href="/">Return to Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/auth/resend-verification">Request New Verification Link</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 