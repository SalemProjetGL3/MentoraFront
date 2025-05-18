'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

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
      toast.error("Passwords do not match");
      return;
    }
  
    onLoadingChange(true);
  
    try {
      const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL;
  
      if (!apiUrl) {
        throw new Error('API URL is not configured');
      }
  
      console.log('Sending registration request...');
      const response = await axios.post(`${apiUrl}/register`, {
        email: formData.email,
        password: formData.password,
        username: formData.username
      }, {
        withCredentials: true
      });
  
      console.log('Registration response:', response);
      console.log('Response data:', response.data);
      console.log('Response status:', response.status);
  
      if (!response.data) {
        console.error('No data in response');
        toast.error("Invalid response from server");
        return;
      }
  
      const { token, message } = response.data;
      console.log('Token:', token);
      console.log('Message:', message);
  
      if (token) {
        console.log('Storing token and redirecting...');
        localStorage.setItem('emailToken', token);
        toast.success(message || "Registration successful! Please verify your email.");
        console.log('Redirecting to verification page...');
        router.push('/email-verification');
      } else {
        console.error('No token in response data:', response.data);
        toast.error("Unexpected response from server.");
      }
  
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.message.includes('API URL is not configured')) {
        toast.error("Configuration error. Please contact support.");
      } else if (error.response) {
        console.error('Error response:', error.response.data);
        toast.error(error.response.data?.message || "Registration failed. Please try again.");
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      onLoadingChange(false);
      console.log('Registration process completed');
    }
  };
  

  return (
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
  );
} 