"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, BookOpen, Award, Home, LogOut, User, Trophy, ShoppingCart } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { toast } from "sonner"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in by looking for token
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL;
      if (!apiUrl) {
        throw new Error('API URL not configured');
      }

      // Call logout endpoint
      const response = await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear frontend state
      localStorage.removeItem('token');
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setIsLoggedIn(false);
      
      toast.success("Logged out successfully");
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Failed to logout. Please try again.");
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <Image 
              src="/images/logo.png" 
              alt="Mentora Logo" 
              fill
              sizes="(max-width: 768px) 40px, 40px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <span className="text-xl font-bold">MENTORA</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary/90 transition-colors">
            Home
          </Link>
          <Link href="/courses" className="text-sm font-medium hover:text-primary/90 transition-colors">
            Courses
          </Link>
          {isLoggedIn && (
            <Link href="/my-courses" className="text-sm font-medium hover:text-primary/90 transition-colors">
              My Courses
            </Link>
          )}
          {isLoggedIn && (
            <Link href="/badges" className="text-sm font-medium hover:text-primary/90 transition-colors">
              Badges
            </Link>
          )}
          {isLoggedIn && (
            <Link href="/leaderboard" className="text-sm font-medium hover:text-primary/90 transition-colors">
              Leaderboard
            </Link>
          )}
          {isLoggedIn && (
            <Link href="/shop" className="text-sm font-medium hover:text-primary/90 transition-colors">
              Shop
            </Link>
          )}
          {isLoggedIn && (
            <Link href="/users" className="text-sm font-medium hover:text-primary/90 transition-colors">
              Users
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">User</p>
                    <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-courses" className="flex items-center gap-2 cursor-pointer">
                    <BookOpen className="h-4 w-4" />
                    <span>My Courses</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/badges" className="flex items-center gap-2 cursor-pointer">
                    <Award className="h-4 w-4" />
                    <span>Badges</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/leaderboard" className="flex items-center gap-2 cursor-pointer">
                    <Trophy className="h-4 w-4" />
                    <span>Leaderboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/shop" className="flex items-center gap-2 cursor-pointer">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Shop</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/users" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    <span>Users</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default">
              <Link href="/login">Login</Link>
            </Button>
          )}

          <Button variant="ghost" className="md:hidden" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden container py-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary/90 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/courses"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary/90 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="h-4 w-4" />
              <span>Courses</span>
            </Link>
            {isLoggedIn && (
              <Link
                href="/my-courses"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary/90 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-4 w-4" />
                <span>My Courses</span>
              </Link>
            )}
            {isLoggedIn && (
              <Link
                href="/badges"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary/90 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Award className="h-4 w-4" />
                <span>Badges</span>
              </Link>
            )}
            {isLoggedIn && (
              <Link
                href="/leaderboard"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary/90 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Trophy className="h-4 w-4" />
                <span>Leaderboard</span>
              </Link>
            )}
            {isLoggedIn && (
              <Link
                href="/shop"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary/90 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Shop</span>
              </Link>
            )}
            {isLoggedIn && (
              <Link
                href="/users"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary/90 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                <span>Users</span>
              </Link>
            )}
            {isLoggedIn && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
