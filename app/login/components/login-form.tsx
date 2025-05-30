'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PopupMessage } from '@/components/ui/popup-message';
import Cookies from 'js-cookie';

interface LoginFormProps {
  onLoadingChange: (loading: boolean) => void;
}

export function LoginForm({ onLoadingChange }: LoginFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [popup, setPopup] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);

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
      setPopup({
        message: "Configuration error. Please contact support.",
        type: 'error'
      });
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

      const data = await response.json();
      console.log('Login response:', data);

      if (data.error) {
        setPopup({
          message: "Login failed. Please try again.",
          type: 'error'
        });
        return;
      }

      if (response.ok) {
        if (data.clientSideToken) {
          localStorage.setItem('emailToken', data.clientSideToken);
          await router.push("/email-verification");
          return;
        }
        else if (data.token) {
          // Store token in localStorage
          localStorage.setItem('token', 'true');
          await router.push("/courses");
        }
      } else {
        setPopup({
          message: "Login failed. Please try again.",
          type: 'error'
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setPopup({
        message: "Login failed. Please try again.",
        type: 'error'
      });
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <>
      {popup && (
        <PopupMessage
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
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
    </>
  );
} 