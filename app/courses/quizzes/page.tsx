// app/courses/quizzes/page.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { toast } from "sonner"
import { Loader2, ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface QuizListItem {
  _id: string
  title: string
  description?: string
  questionIds: string[]
  createdAt: string
  updatedAt: string
  category?: string
}

export default function QuizzesListPage() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([])
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_QUIZ_API_URL}/quizzes`)
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes')
        }
        const data: QuizListItem[] = await response.json()
        setQuizzes(data)
        setFilteredQuizzes(data)
      } catch (err) {
        console.error('Error fetching quizzes:', err)
        setError('Failed to load quizzes. Please try again later.')
        toast.error('Failed to load quizzes. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  useEffect(() => {
    // Filter quizzes based on search query and category
    const filtered = quizzes.filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (quiz.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      const matchesCategory = categoryFilter === "all" || quiz.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    setFilteredQuizzes(filtered)
  }, [searchQuery, categoryFilter, quizzes])

  // Get unique categories from quizzes
  const categories = ["all", ...Array.from(new Set(quizzes.map(quiz => quiz.category).filter((category): category is string => Boolean(category))))]

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="mt-4 text-muted-foreground">Loading quizzes...</p>
          </div>
        </div>
        <Chatbot />
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
        <Chatbot />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Available Quizzes</h1>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quizzes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredQuizzes.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>No quizzes found matching your criteria.</p>
            <Button asChild className="mt-4">
              <Link href="/">Go to Home</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <Card key={quiz._id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{quiz.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{quiz.description || "No description provided."}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {quiz.questionIds.length} Questions
                  </p>
                  {quiz.category && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Category: {quiz.category}
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/courses/quiz/${quiz._id}`}>
                      Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Chatbot />
    </div>
  )
}