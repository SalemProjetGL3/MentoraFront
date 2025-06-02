"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { User, Lock, Bell, Globe, Shield, Trash2, Upload, Github, Linkedin, ShoppingCart, Crown, Sparkles, Star } from "lucide-react"
import { api, UserProfile } from "@/lib/api";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)

  const [profile, setProfile] = useState<UserProfile | null>(null);

useEffect(() => {
  api.getUserProfile().then(setProfile);
}, []);

const [formProfile, setFormProfile] = useState<Partial<UserProfile>>({})
useEffect(() => {
  api.getUserProfile().then((data) => {
    setProfile(data)
    setFormProfile(data) 
  })
}, [])
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  try {
    if (formProfile.id) { 
      const updated = await api.updateUserProfile({
        ...formProfile,
        id: String(formProfile.id),
      } as Partial<UserProfile> & { id: string })
      setProfile(updated)       
      setFormProfile(updated)   
    }
  } finally {
    setIsLoading(false)
  }
}

// Add this handler for input changes
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { id, value } = e.target;
  setFormProfile((prev) => ({
    ...prev,
    [id]: value,
  }));
};

return (
  <div className="relative min-h-screen flex flex-col">
    <div className="blob blob-blue"></div>
    <div className="blob blob-purple"></div>

      <Navbar />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-8">My Profile</h1>

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg bg-card">
                <div className="relative">
                  <Image
                    src="/placeholder.svg"
                    alt="Profile picture"
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-background"
                  />
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{profile?.firstName} {profile?.lastName}</h2>
                  <p className="text-sm text-muted-foreground">{profile?.email}</p>
                </div>
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Member since</span>
                    <span className="text-sm font-medium">January 2023</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Points</span>
                    <span className="text-sm font-medium text-mentora-blue">1,500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Courses completed</span>
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Badges earned</span>
                    <span className="text-sm font-medium">4</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4">
                  <h3 className="font-medium">Navigation</h3>
                </div>
                <div className="p-2">
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#personal-info">
                        <User className="mr-2 h-4 w-4" />
                        Personal Information
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#account-security">
                        <Lock className="mr-2 h-4 w-4" />
                        Account Security
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#notifications">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#preferences">
                        <Globe className="mr-2 h-4 w-4" />
                        Preferences
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#connected-accounts">
                        <Shield className="mr-2 h-4 w-4" />
                        Connected Accounts
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#inventory">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Inventory
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div id="personal-info" className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4 flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  <h3 className="font-medium">Personal Information</h3>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="firstName" value={formProfile.firstName || ""} onChange={handleInputChange} />

                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="lastName" value={formProfile.lastName || ""} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={formProfile.email || ""} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biography</Label>
                     <Textarea id="bio" value={formProfile.bio || ""} onChange={handleInputChange} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="job-title">Job Title</Label>
                        <Input id="jobTitle" value={formProfile.jobTitle || ""} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company / Organization</Label>
                        <Input id="company" value={formProfile.company || ""} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              <div id="account-security" className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4 flex items-center">
                  <Lock className="mr-2 h-5 w-5" />
                  <h3 className="font-medium">Account Security</h3>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit">Update Password</Button>
                    </div>
                  </form>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account.
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>

              <div id="notifications" className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4 flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notifications by email</p>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about your activity and courses.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notifications of new courses</p>
                        <p className="text-sm text-muted-foreground">
                          Be notified when new courses are available.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Learning reminders</p>
                        <p className="text-sm text-muted-foreground">
                          Receive reminders to continue your ongoing courses.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Monthly newsletter</p>
                        <p className="text-sm text-muted-foreground">
                          Receive our newsletter with tips and updates.
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>

              <div id="preferences" className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4 flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  <h3 className="font-medium">Preferences</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select defaultValue="dark">
                        <SelectTrigger id="theme">
                          <SelectValue placeholder="Select a theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Automatic video playback</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically play videos in courses.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div id="connected-accounts" className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4 flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  <h3 className="font-medium">Connected Accounts</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                            <path
                              fill="currentColor"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="currentColor"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Google</p>
                          <p className="text-sm text-muted-foreground">john.doe@gmail.com</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <Github className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">GitHub</p>
                          <p className="text-sm text-muted-foreground">jdupont</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <Linkedin className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">LinkedIn</p>
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div id="inventory" className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4 flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  <h3 className="font-medium">Inventory</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="aspect-square relative mb-4">
                        <img
                          src="/placeholder.svg"
                          alt="Golden Crown Frame"
                          className="object-cover w-full h-full rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <Crown className="h-4 w-4 text-yellow-400" />
                        </div>
                      </div>
                      <h4 className="font-medium mb-1">Golden Crown Frame</h4>
                      <p className="text-sm text-muted-foreground mb-2">Equipped</p>
                      <Button variant="outline" size="sm" className="w-full">
                        Unequip
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="aspect-square relative mb-4">
                        <img
                          src="/placeholder.svg"
                          alt="Rainbow Sparkles"
                          className="object-cover w-full h-full rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <Sparkles className="h-4 w-4 text-purple-400" />
                        </div>
                      </div>
                      <h4 className="font-medium mb-1">Rainbow Sparkles</h4>
                      <p className="text-sm text-muted-foreground mb-2">Not equipped</p>
                      <Button variant="outline" size="sm" className="w-full">
                        Equip
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="aspect-square relative mb-4">
                        <img
                          src="/placeholder.svg"
                          alt="Master Coder Badge"
                          className="object-cover w-full h-full rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <Star className="h-4 w-4 text-blue-400" />
                        </div>
                      </div>
                      <h4 className="font-medium mb-1">Master Coder Badge</h4>
                      <p className="text-sm text-muted-foreground mb-2">Not equipped</p>
                      <Button variant="outline" size="sm" className="w-full">
                        Equip
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4 flex items-center">
                  <Trash2 className="mr-2 h-5 w-5 text-destructive" />
                  <h3 className="font-medium text-destructive">Delete Account</h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Deleting your account is permanent and will remove all your data, including your courses, badges, and certifications.
                  </p>
                  <Button variant="destructive">Delete My Account</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Chatbot />
    </div>
  )
}
