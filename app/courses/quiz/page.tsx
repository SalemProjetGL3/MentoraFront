"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { CheckCircle2, XCircle, Timer, Trophy, ArrowRight, ChevronLeft, BarChart } from "lucide-react"
import { toast } from "sonner"

interface Answer {
  _id: string
  text: string
  isCorrect: boolean
}

interface Question {
  _id: string
  text: string
  type: 'single-choice' | 'multiple-choice' | 'true-false'
  answers: Answer[]
  tags?: string[]
}

interface Quiz {
  _id: string
  title: string
  description?: string
  questionIds: Question[]
}

interface QuizSubmission {
  quizId: string
  score: number
  totalQuestions: number
  detailedResults: {
    questionId: string
    selectedAnswerIds: string[]
    correctAnswerIds: string[]
    isCorrect: boolean
    message?: string
  }[]
}

export default function QuizPage() {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string[] }>({})
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [submissionResults, setSubmissionResults] = useState<QuizSubmission | null>(null)

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch('http://localhost:3000/quizzes/1?populate=true')
        if (!response.ok) {
          throw new Error('Failed to fetch quiz')
        }
        const data = await response.json()
        setQuiz(data)
      } catch (error) {
        console.error('Error fetching quiz:', error)
        toast.error('Failed to load quiz. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuiz()
  }, [])

  // Timer effect
  useEffect(() => {
    if (!quiz || quizCompleted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quiz, quizCompleted])

  // Calculate progress
  const progress = quiz ? ((currentQuestion + 1) / quiz.questionIds.length) * 100 : 0

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: [answerId] // For single-choice questions
    }))
  }

  // Handle next question
  const handleNext = () => {
    if (!quiz) return

    if (currentQuestion < quiz.questionIds.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmit()
    }
  }

  // Handle quiz submission
  const handleSubmit = async () => {
    if (!quiz) return

    try {
      const answers = Object.entries(selectedAnswers).map(([questionId, selectedAnswerIds]) => ({
        questionId,
        selectedAnswerIds
      }))

      const response = await fetch(`http://localhost:3000/quizzes/${quiz._id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers })
      })

      if (!response.ok) {
        throw new Error('Failed to submit quiz')
      }

      const results = await response.json()
      setSubmissionResults(results)
      setQuizCompleted(true)
      setShowResults(true)
    } catch (error) {
      console.error('Error submitting quiz:', error)
      toast.error('Failed to submit quiz. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading quiz...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="relative min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Quiz not found</p>
            <Button asChild className="mt-4">
              <Link href="/courses">Back to Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-80 border-r bg-muted/30 overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Course Progress</h2>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={progress} className="h-2" />
              <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
            </div>
          </div>

          <div className="flex-1 py-2">
            <div className="px-4 py-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BarChart className="h-4 w-4" />
                <span className="font-medium">{quiz.title}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col gap-6 mb-8">
              <Link
                href="/courses"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Courses
              </Link>

              {/* Quiz Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{quiz.title}</h1>
                  <p className="text-muted-foreground">{quiz.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5" />
                  <span className="font-medium">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <Progress value={progress} className="h-2" />

              {!showResults ? (
                /* Quiz Questions */
                <Card>
                  <CardHeader>
                    <CardTitle>Question {currentQuestion + 1} of {quiz.questionIds.length}</CardTitle>
                    <CardDescription>{quiz.questionIds[currentQuestion].text}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={selectedAnswers[quiz.questionIds[currentQuestion]._id]?.[0]}
                      onValueChange={(value) => handleAnswerSelect(quiz.questionIds[currentQuestion]._id, value)}
                      className="space-y-4"
                    >
                      {quiz.questionIds[currentQuestion].answers.map((answer) => (
                        <div key={answer._id} className="flex items-center space-x-2">
                          <RadioGroupItem value={answer._id} id={`option-${answer._id}`} />
                          <Label htmlFor={`option-${answer._id}`} className="text-base cursor-pointer">
                            {answer.text}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                      disabled={currentQuestion === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!selectedAnswers[quiz.questionIds[currentQuestion]._id]}
                    >
                      {currentQuestion === quiz.questionIds.length - 1 ? "Finish" : "Next"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                /* Results Card */
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-6 w-6 text-yellow-500" />
                      Quiz Results
                    </CardTitle>
                    <CardDescription>Your performance summary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">Score</span>
                        <span className="text-2xl font-bold">
                          {submissionResults?.score} / {submissionResults?.totalQuestions}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {submissionResults?.detailedResults.map((result, index) => {
                          const question = quiz.questionIds.find(q => q._id === result.questionId)
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-3 rounded-lg bg-muted"
                            >
                              {result.isCorrect ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-500" />
                              )}
                              <span className="flex-1">{question?.text}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => window.location.reload()}>
                      Retake Quiz
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Chatbot />
    </div>
  )
} 