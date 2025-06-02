"use client"

import { useState, useEffect } from "react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle, MinusCircle, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Navbar } from "@/components/navbar" // Assuming you want Navbar here too
import { Chatbot } from "@/components/chatbot" // Assuming you want Chatbot here too
export const BASE_URL = "http://localhost:3006"
// --- Interfaces (Copy from your API documentation or define as needed) ---
interface Answer {
  text: string
  isCorrect: boolean
  _id?: string // _id is optional for new answers
}

interface Question {
  _id: string
  text: string
  type: "single-choice" | "multiple-choice" | "true-false"
  answers: Answer[]
  tags?: string[]
}

interface Quiz {
  _id: string
  title: string
  description?: string
  questionIds: string[] // This should be string[] when creating/selecting
}

// --- AdminPanelPage Component ---
export default function AdminPanelPage() {
  // --- State for Question Form ---
  const [questionText, setQuestionText] = useState("")
  const [questionType, setQuestionType] = useState<
    "single-choice" | "multiple-choice" | "true-false"
  >("single-choice")
  const [answers, setAnswers] = useState<Answer[]>([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ])
  const [questionTags, setQuestionTags] = useState("") // Comma-separated
  const [isQuestionLoading, setIsQuestionLoading] = useState(false)

  // --- State for Quiz Form ---
  const [quizTitle, setQuizTitle] = useState("")
  const [quizDescription, setQuizDescription] = useState("")
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([])
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([])
  const [isQuizLoading, setIsQuizLoading] = useState(false)
  const [isQuestionsListLoading, setIsQuestionsListLoading] = useState(false)

  // --- Fetch all questions for Quiz creation ---
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsQuestionsListLoading(true)
      try {
        const response = await fetch(`${BASE_URL}/questions`)
        if (!response.ok) {
          throw new Error("Failed to fetch questions.")
        }
        const data: Question[] = await response.json()
        setAvailableQuestions(data)
      } catch (error: any) {
        console.error("Error fetching available questions:", error)
        toast.error(
          error.message || "Failed to load available questions for quiz creation."
        )
      } finally {
        setIsQuestionsListLoading(false)
      }
    }
    fetchQuestions()
  }, [])

  // --- Question Form Handlers ---
  const handleAddAnswer = () => {
    setAnswers([...answers, { text: "", isCorrect: false }])
  }

  const handleRemoveAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index))
  }

  const handleAnswerTextChange = (index: number, text: string) => {
    const newAnswers = [...answers]
    newAnswers[index].text = text
    setAnswers(newAnswers)
  }

  const handleAnswerCorrectChange = (index: number, isCorrect: boolean) => {
    const newAnswers = [...answers]
    // For single-choice, only one answer can be correct
    if (questionType === "single-choice" || questionType === "true-false") {
      newAnswers.forEach((answer, i) => {
        if (i === index) {
          answer.isCorrect = isCorrect
        } else {
          answer.isCorrect = false
        }
      })
    } else {
      // For multiple-choice, multiple can be correct
      newAnswers[index].isCorrect = isCorrect
    }
    setAnswers(newAnswers)
  }

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsQuestionLoading(true)

    // Basic validation
    if (!questionText.trim()) {
      toast.error("Question text is required.")
      setIsQuestionLoading(false)
      return
    }
    if (answers.length < 2) {
      toast.error("At least two answers are required.")
      setIsQuestionLoading(false)
      return
    }
    if (answers.some((a) => !a.text.trim())) {
      toast.error("All answer texts must be filled.")
      setIsQuestionLoading(false)
      return
    }
    if (!answers.some((a) => a.isCorrect)) {
      toast.error("At least one answer must be marked as correct.")
      setIsQuestionLoading(false)
      return
    }

    // Special validation for 'true-false' type
    if (questionType === 'true-false' && answers.length !== 2) {
      toast.error("True/False questions must have exactly two answers.")
      setIsQuestionLoading(false);
      return;
    }
    if (questionType === 'true-false' && answers.filter(a => a.isCorrect).length !== 1) {
      toast.error("True/False questions must have exactly one correct answer.")
      setIsQuestionLoading(false);
      return;
    }


    const payload = {
      text: questionText,
      type: questionType,
      answers: answers.map((a) => ({ text: a.text, isCorrect: a.isCorrect })),
      tags: questionTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean), // Clean and remove empty tags
    }

    try {
      const response = await fetch(`${BASE_URL}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create question.")
      }

      const newQuestion = await response.json()
      toast.success("Question created successfully!")
      console.log("Created Question:", newQuestion)

      // Reset form
      setQuestionText("")
      setQuestionType("single-choice")
      setAnswers([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ])
      setQuestionTags("")

      // Refresh available questions for quiz creation
      setAvailableQuestions((prev) => [...prev, newQuestion])
    } catch (error: any) {
      console.error("Error creating question:", error)
      toast.error(error.message || "Failed to create question.")
    } finally {
      setIsQuestionLoading(false)
    }
  }

  // --- Quiz Form Handlers ---
  const handleToggleQuestionSelection = (questionId: string) => {
    setSelectedQuestionIds((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    )
  }

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsQuizLoading(true)

    // Basic validation
    if (!quizTitle.trim()) {
      toast.error("Quiz title is required.")
      setIsQuizLoading(false)
      return
    }
    if (selectedQuestionIds.length === 0) {
      toast.error("At least one question must be selected for the quiz.")
      setIsQuizLoading(false)
      return
    }

    const payload = {
      title: quizTitle,
      description: quizDescription.trim() || undefined, // Send undefined if empty
      questionIds: selectedQuestionIds,
    }

    try {
      const response = await fetch(`${BASE_URL}/quizzes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create quiz.")
      }

      const newQuiz = await response.json()
      toast.success("Quiz created successfully!")
      console.log("Created Quiz:", newQuiz)

      // Reset form
      setQuizTitle("")
      setQuizDescription("")
      setSelectedQuestionIds([])
    } catch (error: any) {
      console.error("Error creating quiz:", error)
      toast.error(error.message || "Failed to create quiz.")
    } finally {
      setIsQuizLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Panel</h1>

        {/* Create New Question Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Question</CardTitle>
            <CardDescription>Define a new question and its answers.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateQuestion} className="space-y-6">
              <div>
                <Label htmlFor="questionText">Question Text</Label>
                <Textarea
                  id="questionText"
                  placeholder="Enter the question text"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="questionType">Question Type</Label>
                <Select
                  value={questionType}
                  onValueChange={(value: "single-choice" | "multiple-choice" | "true-false") => {
                    setQuestionType(value);
                     // Adjust answers for True/False
                    if (value === 'true-false') {
                        setAnswers([
                            { text: "True", isCorrect: false },
                            { text: "False", isCorrect: false }
                        ]);
                    } else {
                        // Reset to generic for other types if they were True/False
                        if (answers.length === 2 && answers.every(a => a.text === "True" || a.text === "False")) {
                             setAnswers([
                                { text: "", isCorrect: false },
                                { text: "", isCorrect: false }
                            ]);
                        }
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-choice">Single Choice</SelectItem>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="true-false">True/False</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Answers */}
              <div className="space-y-4">
                <Label>Answers</Label>
                {answers.map((answer, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {questionType === "multiple-choice" ? (
                      <Checkbox
                        id={`answer-correct-${index}`}
                        checked={answer.isCorrect}
                        onCheckedChange={(checked) =>
                          handleAnswerCorrectChange(index, !!checked)
                        }
                      />
                    ) : (
                      <RadioGroup
                        value={answer.isCorrect ? "true" : "false"}
                        onValueChange={(val) =>
                          handleAnswerCorrectChange(index, val === "true")
                        }
                      >
                        <RadioGroupItem value="true" id={`answer-correct-${index}`} className="sr-only" />
                        <Label
                          htmlFor={`answer-correct-${index}`}
                          className={`flex items-center justify-center h-4 w-4 rounded-full border ${answer.isCorrect ? 'bg-primary' : 'border-input'} cursor-pointer`}
                        >
                          {answer.isCorrect && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                        </Label>
                      </RadioGroup>
                    )}
                    <Input
                      placeholder={`Answer ${index + 1} text`}
                      value={answer.text}
                      onChange={(e) =>
                        handleAnswerTextChange(index, e.target.value)
                      }
                      required
                      disabled={questionType === 'true-false' && (answer.text === "True" || answer.text === "False")}
                    />
                    {answers.length > 2 && (
                      <Button
                        variant="destructive"
                        size="icon"
                        type="button"
                        onClick={() => handleRemoveAnswer(index)}
                        disabled={questionType === 'true-false'}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {questionType !== 'true-false' && (
                    <Button type="button" onClick={handleAddAnswer} variant="outline" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Answer
                    </Button>
                )}
              </div>

              <div>
                <Label htmlFor="questionTags">Tags (comma-separated)</Label>
                <Input
                  id="questionTags"
                  placeholder="e.g., JavaScript, Frontend, Beginner"
                  value={questionTags}
                  onChange={(e) => setQuestionTags(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isQuestionLoading}>
                {isQuestionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Question
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Create New Quiz Section */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Quiz</CardTitle>
            <CardDescription>
              Combine existing questions to form a new quiz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateQuiz} className="space-y-6">
              <div>
                <Label htmlFor="quizTitle">Quiz Title</Label>
                <Input
                  id="quizTitle"
                  placeholder="Enter quiz title"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="quizDescription">Quiz Description (Optional)</Label>
                <Textarea
                  id="quizDescription"
                  placeholder="Describe the quiz"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                />
              </div>

              <div>
                <Label>Select Questions</Label>
                {isQuestionsListLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-2 text-muted-foreground">Loading questions...</p>
                  </div>
                ) : availableQuestions.length === 0 ? (
                  <p className="text-muted-foreground">No questions available. Create some first!</p>
                ) : (
                  <div className="grid gap-2 max-h-60 overflow-y-auto border rounded-md p-3">
                    {availableQuestions.map((question) => (
                      <div key={question._id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`question-${question._id}`}
                          checked={selectedQuestionIds.includes(question._id)}
                          onCheckedChange={() =>
                            handleToggleQuestionSelection(question._id)
                          }
                        />
                        <Label
                          htmlFor={`question-${question._id}`}
                          className="flex-1 text-sm font-normal cursor-pointer"
                        >
                          {question.text}
                          <span className="text-xs text-muted-foreground ml-2">
                            ({question.type})
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
                {selectedQuestionIds.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                        Selected: {selectedQuestionIds.length} question(s)
                    </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isQuizLoading}>
                {isQuizLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Quiz
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Chatbot />
    </div>
  )
}