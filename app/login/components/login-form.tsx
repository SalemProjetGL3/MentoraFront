'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PopupMessage } from '@/components/ui/popup-message';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

interface LoginFormProps {
  onLoadingChange: (loading: boolean) => void;
}

export function LoginForm({ onLoadingChange }: LoginFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
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
    setLoading(true);
    onLoadingChange(true);
    
    const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL;
    
    if (!apiUrl) {
      setPopup({
        message: "Configuration error. Please contact support.",
        type: 'error'
      });
      setLoading(false);
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
          password: formData.password,
          rememberMe: formData.rememberMe
        }),
        credentials: 'include'
      });

      const data = await response.json();

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
      setLoading(false);
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
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            required 
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="rememberMe" 
              checked={formData.rememberMe}
              onCheckedChange={(checked) => {
                setFormData(prev => ({
                  ...prev,
                  rememberMe: checked as boolean
                }));
              }}
              className="border-primary"
            />
            <Label 
              htmlFor="rememberMe" 
              className="text-sm text-muted-foreground cursor-pointer select-none"
            >
              Remember me
            </Label>
          </div>
          <Link 
            href="/forgot-password" 
            className="text-xs text-muted-foreground underline hover:text-primary"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </>
  );
} 