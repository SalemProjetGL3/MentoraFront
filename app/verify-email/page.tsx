'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = searchParams.get('token');
  const resent = searchParams.get('resent');

  useEffect(() => {
    if (resent === 'true') {
      toast.success('Verification email has been resent!');
    }
  }, [resent]);

  useEffect(() => {
    if (!token) {
      setError('Invalid verification link');
      setVerifying(false);
      return;
    }

    // Here you would typically make an API call to verify the email
    // For now, we'll just simulate a delay
    const verifyEmail = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Redirect to success page
        window.location.href = '/verify-email/success';
      } catch (err) {
        setError('Failed to verify email. Please try again.');
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [token]);

  if (error) {
    return (
      <div className="container flex items-center justify-center min-h-screen py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verification Failed</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Button asChild>
                <Link href="/resend-verification">Resend Verification Email</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verifying Your Email</CardTitle>
          <CardDescription>Please wait while we verify your email address...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    </div>
  );
} 