// app/courses/quizzes/page.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { toast } from "sonner"
import { Loader2, ArrowRight } from "lucide-react"

interface QuizListItem {
  _id: string
  title: string
  description?: string
  questionIds: string[]
  createdAt: string
  updatedAt: string
}

export default function QuizzesListPage() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost:3000/quizzes') // API endpoint remains the same
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes')
        }
        const data: QuizListItem[] = await response.json()
        setQuizzes(data)
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
        {quizzes.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>No quizzes available at the moment. Please check back later!</p>
            {/* Assuming you have a home page at the root */}
            <Button asChild className="mt-4">
              <Link href="/">Go to Home</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz._id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{quiz.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{quiz.description || "No description provided."}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {quiz.questionIds.length} Questions
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    {/* IMPORTANT: Link to /courses/quiz/{quizId} */}
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