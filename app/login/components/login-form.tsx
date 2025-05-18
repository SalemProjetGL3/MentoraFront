'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface LoginFormProps {
  onLoadingChange: (loading: boolean) => void;
}

export function LoginForm({ onLoadingChange }: LoginFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    onLoadingChange(true);
    
    const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL;
    console.log(apiUrl);
    
    if (!apiUrl) {
      toast.error("Configuration error. Please contact support.");
      onLoadingChange(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message?.includes("User is not verified")) {
          localStorage.setItem('emailToken', data.clientSideToken);
          await router.push("/email-verification");
          return;
        }
        if (data.token) {
          localStorage.setItem('token', data.token);
          toast.success("Login successful!");
          
          await router.push("/courses");
        }
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.message || "Login failed. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
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
      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
} 