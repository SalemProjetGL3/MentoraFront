'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PopupMessage } from '@/components/ui/popup-message';

interface RegisterFormProps {
  onLoadingChange: (loading: boolean) => void;
}

export function RegisterForm({ onLoadingChange }: RegisterFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: ''
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Starting registration process...');
  
    if (formData.password !== formData.confirmPassword) {
      console.log('Password mismatch');
      setPopup({
        message: "Passwords do not match",
        type: 'error'
      });
      return;
    }
  
    onLoadingChange(true);
  
    try {
      const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL;
      console.log('API URL:', apiUrl);
      if (!apiUrl) {
        throw new Error('API URL is not configured');
      }
  
      console.log('Sending registration request...');
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username
        }),
        credentials: 'include' 
      });

      const data = await response.json();
      console.log('Registration response:', data);
  
      if (!data) {
        console.error('No data in response');
        setPopup({
          message: "Invalid response from server",
          type: 'error'
        });
        return;
      }

      const { error, message } = data;
      
      if (error) {
        setPopup({
          message: error,
          type: 'error'
        });
        return;
      }
  
      setPopup({
        message: message || "Registration successful! Please verify your email.",
        type: 'success'
      });
      console.log('Redirecting to verification page...');
      router.push('/email-verification');
  
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.message.includes('API URL is not configured')) {
        setPopup({
          message: "Configuration error. Please contact support.",
          type: 'error'
        });
      } else if (error.response?.data?.error) {
        console.error('Error response:', error.response.data);
        setPopup({
          message: error.response.data.error,
          type: 'error'
        });
      } else {
        setPopup({
          message: "Network error. Please check your connection.",
          type: 'error'
        });
      }
    } finally {
      onLoadingChange(false);
      console.log('Registration process completed');
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
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input 
            id="username" 
            type="text" 
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
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </>
  );
} 