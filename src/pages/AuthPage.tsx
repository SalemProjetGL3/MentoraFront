import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {Link, useSearchParams} from "react-router-dom";

import "../styles/auth-background.css";// Import your CSS file for custom styles


export default function AuthPage() {
    // Retrieve query parameters using useSearchParams
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "signin";
  
  // Set initial active tab based on the query parameter
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });
  const [signInErrors, setSignInErrors] = useState<Record<string, string>>({});

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [signUpErrors, setSignUpErrors] = useState<Record<string, string>>({});

  // Handle form changes
  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({ ...prev, [name]: value }));
  };

  // Form validation
  const validateSignIn = () => {
    const newErrors: Record<string, string> = {};
    
    if (!signInData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(signInData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!signInData.password) {
      newErrors.password = "Password is required";
    }
    
    setSignInErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUp = () => {
    const newErrors: Record<string, string> = {};
    
    if (!signUpData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!signUpData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(signUpData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!signUpData.password) {
      newErrors.password = "Password is required";
    } else if (signUpData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setSignUpErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handlers
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignIn()) return;
    
    setIsSubmitting(true);
    
    try {
      /* Backend integration example - uncomment and implement later
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signInData.email,
          password: signInData.password
        }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Redirect on successful login
      window.location.href = '/dashboard';
      */
      
      // For now, just simulate success
      console.log("Sign in submitted:", signInData);
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Sign in successful (simulated)");
      }, 1000);
      
    } catch (error) {
      setSignInErrors({
        ...signInErrors,
        form: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
      setIsSubmitting(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignUp()) return;
    
    setIsSubmitting(true);
    
    try {
      /* Backend integration example - uncomment and implement later
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signUpData.name,
          email: signUpData.email,
          password: signUpData.password
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Sign up failed');
      }
      
      // Switch to sign in tab after successful signup
      setActiveTab("signin");
      */
      
      // For now, just simulate success
      console.log("Sign up submitted:", signUpData);
      setTimeout(() => {
        setIsSubmitting(false);
        setActiveTab("signin");
        alert("Account created successfully (simulated)");
      }, 1000);
      
    } catch (error) {
      setSignUpErrors({
        ...signUpErrors,
        form: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page-container"> 
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
        {/* New background elements similar to Mentora logo */}
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        <Card className="w-full max-w-md border-[#5b00b3] bg-[#1E293B]">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                <img src="/LOGO WEB FIN-01.png" alt="Mentora Logo" className="h-16 w-16" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">
                Welcome to Mentora
                </CardTitle>
                <CardDescription className="text-gray-400">
                {activeTab === "signin" ? "Sign in to continue your learning" : "Create an account to get started"}
                </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full transition-all duration-300">
                <TabsList className="grid w-full grid-cols-2 bg-[#0F172A] relative h-10 rounded-none">
                  {/* Animated underline */}
                  <div 
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#F59E0B] transition-all duration-300 ${
                      activeTab === "signin" ? "translate-x-0 w-1/2" : "translate-x-full w-1/2"
                    }`}
                  />
                  <TabsTrigger 
                    value="signin" 
                    className="data-[state=active]:bg-transparent text-white relative z-10 transition-colors duration-200"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="data-[state=active]:bg-transparent text-white relative z-10 transition-colors duration-200"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* Animated content container */}
                <div className="relative overflow-hidden mt-4" style={{ height: activeTab === "signin" ? "auto" : "auto" }}>
                  {/* Sign In Tab with transition */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      activeTab === "signin"
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 absolute translate-y-4"
                    }`}
                  >
                    <TabsContent value="signin" forceMount>
                      <form onSubmit={handleSignInSubmit} className="space-y-4">
                        {signInErrors.form && (
                          <Alert variant="destructive" className="bg-red-900 border-red-700">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <AlertDescription>{signInErrors.form}</AlertDescription>
                          </Alert>
                        )}
                        
                        <div className="space-y-2">
                          <Label htmlFor="signin-email" className="text-white">Email Address</Label>
                          <Input
                            id="signin-email"
                            name="email"
                            type="email"
                            className="bg-[#0F172A] border-[#334155] text-white focus:border-[#5b00b3]"
                            value={signInData.email}
                            onChange={handleSignInChange}
                            required
                          />
                          {signInErrors.email && <p className="text-sm text-red-400">{signInErrors.email}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="signin-password" className="text-white">Password</Label>
                          <Input
                            id="signin-password"
                            name="password"
                            type="password"
                            className="bg-[#0F172A] border-[#334155] text-white focus:border-[#5b00b3]"
                            value={signInData.password}
                            onChange={handleSignInChange}
                            required
                          />
                          {signInErrors.password && <p className="text-sm text-red-400">{signInErrors.password}</p>}
                        </div>
                        
                        <div className="flex items-center justify-end">
                          <Link 
                            to="/forgot-password" 
                            className="text-sm font-medium text-[#3B82F6] hover:text-[#2563EB]"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-[#3B82F6] hover:bg-[#4400a3] text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                              Signing in...
                            </>
                          ) : "Sign in"}
                        </Button>
                      </form>
                    </TabsContent>
                  </div>

                  {/* Sign Up Tab with transition */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      activeTab === "signup"
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 absolute translate-y-4"
                    }`}
                  >
                    <TabsContent value="signup" forceMount>
                      <form onSubmit={handleSignUpSubmit} className="space-y-4">
                        {signUpErrors.form && (
                          <Alert variant="destructive" className="bg-red-900 border-red-700">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <AlertDescription>{signUpErrors.form}</AlertDescription>
                          </Alert>
                        )}
                        
                        <div className="space-y-2">
                          <Label htmlFor="signup-name" className="text-white">Full Name</Label>
                          <Input
                            id="signup-name"
                            name="name"
                            type="text"
                            className="bg-[#0F172A] border-[#334155] text-white focus:border-[#5b00b3]"
                            value={signUpData.name}
                            onChange={handleSignUpChange}
                            required
                          />
                          {signUpErrors.name && <p className="text-sm text-red-400">{signUpErrors.name}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="signup-email" className="text-white">Email Address</Label>
                          <Input
                            id="signup-email"
                            name="email"
                            type="email"
                            className="bg-[#0F172A] border-[#334155] text-white focus:border-[#5b00b3]"
                            value={signUpData.email}
                            onChange={handleSignUpChange}
                            required
                          />
                          {signUpErrors.email && <p className="text-sm text-red-400">{signUpErrors.email}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="signup-password" className="text-white">Password</Label>
                          <Input
                            id="signup-password"
                            name="password"
                            type="password"
                            className="bg-[#0F172A] border-[#334155] text-white focus:border-[#5b00b3]"
                            value={signUpData.password}
                            onChange={handleSignUpChange}
                            required
                          />
                          <div className="h-1 w-full bg-[#334155] rounded-full">
                            <div 
                              className={`h-1 rounded-full ${
                                signUpData.password.length === 0 ? 'bg-[#334155]' :
                                signUpData.password.length < 4 ? 'bg-red-500' :
                                signUpData.password.length < 8 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(100, (signUpData.password.length / 8) * 100)}%` }}
                            />
                          </div>
                          {signUpErrors.password && <p className="text-sm text-red-400">{signUpErrors.password}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="signup-confirm-password" className="text-white">Confirm Password</Label>
                          <Input
                            id="signup-confirm-password"
                            name="confirmPassword"
                            type="password"
                            className="bg-[#0F172A] border-[#334155] text-white focus:border-[#5b00b3]"
                            value={signUpData.confirmPassword}
                            onChange={handleSignUpChange}
                            required
                          />
                          {signUpErrors.confirmPassword && <p className="text-sm text-red-400">{signUpErrors.confirmPassword}</p>}
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-[#3B82F6] hover:bg-[#4400a3] text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                              Creating account...
                            </>
                          ) : "Sign up"}
                        </Button>
                      </form>
                    </TabsContent>
                  </div>
                </div>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex flex-col items-center space-y-4">
                <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-[#334155]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#1E293B] px-2 text-gray-400">
                    Or continue with
                    </span>
                </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                <Button 
                    variant="outline" 
                    className="border-[#334155] text-white hover:bg-[#0F172A] hover:border-[#3B82F6] bg-transparent hover:text-white"
                >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="white"
                    />
                    </svg>
                    Google
                </Button>
                <Button 
                    variant="outline" 
                    className="border-[#334155] text-white hover:bg-[#0F172A] hover:border-[#3B82F6] bg-transparent hover:text-white"
                >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                        d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                        fill="white"
                    />
                    </svg>
                    GitHub
                </Button>
                </div>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}