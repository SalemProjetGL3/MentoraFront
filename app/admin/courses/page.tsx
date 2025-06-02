"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"

export const BASE_URL = "http://localhost:3006"

interface Course {
  title: string
  description: string
  price: number
  duration: number // in hours
  level: "beginner" | "intermediate" | "advanced"
  category: string
  imageUrl?: string
}

export default function AddCoursePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [courseData, setCourseData] = useState<Course>({
    title: "",
    description: "",
    price: 0,
    duration: 0,
    level: "beginner",
    category: "",
    imageUrl: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setCourseData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "duration" ? Number(value) : value,
    }))
  }

  const handleLevelChange = (value: string) => {
    setCourseData((prev) => ({
      ...prev,
      level: value as "beginner" | "intermediate" | "advanced",
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${BASE_URL}/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create course.")
      }

      const newCourse = await response.json()
      toast.success("Course created successfully!")
      
      // Reset form
      setCourseData({
        title: "",
        description: "",
        price: 0,
        duration: 0,
        level: "beginner",
        category: "",
        imageUrl: "",
      })
    } catch (error: any) {
      toast.error(error.message || "Failed to create course.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Add New Course</CardTitle>
            <CardDescription>
              Fill in the details below to create a new course.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={courseData.title}
                  onChange={handleInputChange}
                  placeholder="Enter course title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={courseData.description}
                  onChange={handleInputChange}
                  placeholder="Enter course description"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    value={courseData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    min="0"
                    value={courseData.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Course Level</Label>
                <Select
                  value={courseData.level}
                  onValueChange={handleLevelChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select course level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={courseData.category}
                  onChange={handleInputChange}
                  placeholder="Enter course category"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={courseData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Course...
                </>
              ) : (
                "Create Course"
              )}
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Chatbot />
    </div>
  )
} 