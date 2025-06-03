"use client"

import { useState } from "react"
import { useEffect } from "react"
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
import { Loader2, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { Course, Module, Lesson } from "@/app/courses/types/course"
import { Quiz } from "@/app/courses/types/quiz"

export default function AddCoursePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [courseData, setCourseData] = useState<Course>({
    id: 0,
    title: "",
    description: "",
    shortDescription: "",
    modules: [],
    duration: "",
    level: "Débutant",
    category: "Frontend",
    color: "#000000",
    image: "",
    apercu: ""
  })

  // NEW STATE FOR QUIZZES
  const [availableQuizzes, setAvailableQuizzes] = useState<Quiz[]>([])
  const [isQuizzesLoading, setIsQuizzesLoading] = useState(true) // Set to true to show loading initially
  const [selectedQuizId, setSelectedQuizId] = useState<string>("") // State to hold selected quiz in the dropdown

  // Fetch quizzes on component mount
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_QUIZ_API_URL}/quizzes`);
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes.");
        }
        const quizzes = await response.json();
        setAvailableQuizzes(quizzes);
      } catch (error) {
        toast.error("Failed to load quizzes.");
        console.error("Error fetching quizzes:", error);
      } finally {
        setIsQuizzesLoading(false);
      }
    };
    fetchQuizzes();
  }, []); // Empty dependency array means this runs once on mount


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (field: keyof Course, value: string) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addModule = () => {
    setCourseData((prev) => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          id: prev.modules.length + 1,
          title: "",
          lessons: []
        }
      ]
    }))
  }

  const updateModule = (moduleIndex: number, field: keyof Module, value: string) => {
    setCourseData((prev) => {
      const newModules = [...prev.modules]
      newModules[moduleIndex] = {
        ...newModules[moduleIndex],
        [field]: value
      }
      return { ...prev, modules: newModules }
    })
  }

  const removeModule = (moduleIndex: number) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, index) => index !== moduleIndex)
    }))
  }

  const addLesson = (moduleIndex: number) => {
    setCourseData((prev) => {
      const newModules = [...prev.modules]
      newModules[moduleIndex].lessons.push({
        id: newModules[moduleIndex].lessons.length + 1,
        title: "",
        type: "text",
        duration: "00:00",
        completed: false,
        order: newModules[moduleIndex].lessons.length + 1
      })
      return { ...prev, modules: newModules }
    })
  }

  const updateLesson = (
    moduleIndex: number,
    lessonIndex: number,
    field: keyof Lesson,
    value: string | string[]
  ) => {
    setCourseData((prev) => {
      const newModules = [...prev.modules]
      newModules[moduleIndex].lessons[lessonIndex] = {
        ...newModules[moduleIndex].lessons[lessonIndex],
        [field]: value
      }
      return { ...prev, modules: newModules }
    })
  }

  const removeLesson = (moduleIndex: number, lessonIndex: number) => {
    setCourseData((prev) => {
      const newModules = [...prev.modules]
      newModules[moduleIndex].lessons = newModules[moduleIndex].lessons.filter(
        (_, index) => index !== lessonIndex
      )
      return { ...prev, modules: newModules }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_COURSE_API_URL}/courses`, {
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

      toast.success("Course created successfully!")

      // Reset form
      setCourseData({
        id: 0,
        title: "",
        description: "",
        shortDescription: "",
        modules: [],
        duration: "",
        level: "Débutant",
        category: "Frontend",
        color: "#000000",
        image: "",
        apercu: ""
      })
    } catch (error: any) {
      toast.error(error.message || "Failed to create course.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto border bg-card">
          <CardHeader>
            <CardTitle>Add New Course</CardTitle>
            <CardDescription>
              Fill in the details below to create a new course.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Basic Information */}
              <div className="space-y-4">
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

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    id="shortDescription"
                    name="shortDescription"
                    value={courseData.shortDescription}
                    onChange={handleInputChange}
                    placeholder="Enter short description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={courseData.duration}
                      onChange={handleInputChange}
                      placeholder="e.g., 10 hours"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">Course Level</Label>
                    <Select
                      value={courseData.level}
                      onValueChange={(value) => handleSelectChange('level', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select course level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Débutant">Débutant</SelectItem>
                        <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                        <SelectItem value="Avancé">Avancé</SelectItem>
                        <SelectItem value="Tous niveaux">Tous niveaux</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={courseData.category}
                      onValueChange={(value) => handleSelectChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Frontend">Frontend</SelectItem>
                        <SelectItem value="Backend">Backend</SelectItem>
                        <SelectItem value="Fullstack">Fullstack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Theme Color</Label>
                    <Input
                      id="color"
                      name="color"
                      type="color"
                      value={courseData.color}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">Course Image URL</Label>
                    <Input
                      id="image"
                      name="image"
                      value={courseData.image}
                      onChange={handleInputChange}
                      placeholder="Enter image URL"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apercu">Preview Image URL</Label>
                    <Input
                      id="apercu"
                      name="apercu"
                      value={courseData.apercu}
                      onChange={handleInputChange}
                      placeholder="Enter preview image URL"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Modules Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Modules</Label>
                  <Button type="button" variant="outline" onClick={addModule}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Module
                  </Button>
                </div>

                {courseData.modules.map((module, moduleIndex) => (
                  <Card key={moduleIndex}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Input
                          value={module.title}
                          onChange={(e) => updateModule(moduleIndex, 'title', e.target.value)}
                          placeholder="Module Title"
                          className="max-w-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeModule(moduleIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="space-y-2 p-4 border rounded-lg bg-card/50">
                            <div className="flex items-center justify-between">
                              <Input
                                value={lesson.title}
                                onChange={(e) =>
                                  updateLesson(moduleIndex, lessonIndex, "title", e.target.value)
                                }
                                placeholder="Lesson Title"
                                className="max-w-md"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeLesson(moduleIndex, lessonIndex)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Lesson Type</Label>
                                <Select
                                  value={lesson.type}
                                  onValueChange={(value) =>
                                    updateLesson(moduleIndex, lessonIndex, "type", value as Lesson['type'])
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select lesson type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="video">Video</SelectItem>
                                    <SelectItem value="image">Image</SelectItem>
                                    <SelectItem value="quiz">Quiz</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label>Duration</Label>
                                <Input
                                  value={lesson.duration}
                                  onChange={(e) =>
                                    updateLesson(moduleIndex, lessonIndex, "duration", e.target.value)
                                  }
                                  placeholder="Duration (e.g., 00:30)"
                                />
                              </div>
                            </div>

                            {lesson.type === "video" && (
                              <div className="space-y-2">
                                <Label>Video URL</Label>
                                <Input
                                  value={lesson.videoUrl || ""}
                                  onChange={(e) =>
                                    updateLesson(moduleIndex, lessonIndex, "videoUrl", e.target.value)
                                  }
                                  placeholder="Enter video URL"
                                />
                              </div>
                            )}

                            {(lesson.type === "text" || lesson.type === "image") && (
                              <div className="space-y-2">
                                <Label>Content</Label>
                                <Textarea
                                  value={lesson.content || ""}
                                  onChange={(e) =>
                                    updateLesson(moduleIndex, lessonIndex, "content", e.target.value)
                                  }
                                  placeholder="Enter lesson content"
                                />
                              </div>
                            )}

                            {lesson.type === "image" && (
                              <div className="space-y-2">
                                <Label>Image URLs (one per line)</Label>
                                <Textarea
                                  value={lesson.images?.join('\n') || ""}
                                  onChange={(e) =>
                                    updateLesson(moduleIndex, lessonIndex, "images", e.target.value.split('\n'))
                                  }
                                  placeholder="Enter image URLs (one per line)"
                                />
                              </div>
                            )}

                            {lesson.type === "quiz" && (
                              <div className="space-y-2">
                                <Label>Select Quiz</Label>
                                {isQuizzesLoading ? (
                                  <div className="flex items-center space-x-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Loading quizzes...</span>
                                  </div>
                                ) : (
                                  <Select
                                    value={lesson.quizId || ""}
                                    onValueChange={(value) =>
                                      updateLesson(moduleIndex, lessonIndex, "quizId", value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a quiz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {availableQuizzes.length > 0 ? (
                                        availableQuizzes.map((quiz) => (
                                          <SelectItem key={quiz._id} value={String(quiz._id)}>
                                            {quiz.title}
                                          </SelectItem>
                                        ))
                                      ) : (
                                        <SelectItem value="" disabled>
                                          No quizzes available
                                        </SelectItem>
                                      )}
                                    </SelectContent>
                                  </Select>
                                )}
                              </div>
                            )}

                            <div className="space-y-2">
                              <Label>Description (optional)</Label>
                              <Textarea
                                value={lesson.description || ""}
                                onChange={(e) =>
                                  updateLesson(moduleIndex, lessonIndex, "description", e.target.value)
                                }
                                placeholder="Enter lesson description"
                              />
                            </div>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addLesson(moduleIndex)}
                          className="w-full"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Lesson
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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