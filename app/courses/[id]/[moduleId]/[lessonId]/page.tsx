"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { Course, Lesson, Module } from "@/app/courses/types/course"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ReactMarkdown from "react-markdown"
import DOMPurify from 'dompurify'
import styles from './lesson-content.module.css'

interface LessonPageProps {
  params: Promise<{
    id: string
    moduleId: string
    lessonId: string
  }>
}

export default function LessonPage({ params }: LessonPageProps) {
  const { id, moduleId, lessonId } = use(params)
  const [course, setCourse] = useState<Course | null>(null)
  const [currentModule, setCurrentModule] = useState<Module | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        console.log('Fetching course data for ID:', id)
        const res = await fetch(`${process.env.NEXT_PUBLIC_COURSE_API_URL}/courses/${id}`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const courseData = await res.json()
        console.log('Course data received:', courseData)
        setCourse(courseData)

        const module = courseData.modules.find((m: Module) => m.id.toString() === moduleId)
        console.log('Found module:', module)
        setCurrentModule(module || null)

        if (module) {
          const lesson = module.lessons.find((l: Lesson) => l.id.toString() === lessonId)
          console.log('Found lesson:', lesson)
          setCurrentLesson(lesson || null)
        }

        setError(null)
      } catch (err) {
        console.error('Error fetching lesson:', err)
        setError('Failed to fetch lesson data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, moduleId, lessonId])

  const navigateToLesson = (direction: 'prev' | 'next') => {
    if (!course || !currentModule || !currentLesson) {
      console.log('Cannot navigate: missing course data', { course, currentModule, currentLesson })
      return
    }

    const currentModuleIndex = course.modules.findIndex(m => m.id.toString() === moduleId)
    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id.toString() === lessonId)
    console.log('Navigation indices:', { currentModuleIndex, currentLessonIndex })

    if (direction === 'next') {
      if (currentLessonIndex < currentModule.lessons.length - 1) {
        // Next lesson in same module
        const nextLesson = currentModule.lessons[currentLessonIndex + 1]
        console.log('Navigating to next lesson in same module:', nextLesson)
        window.location.href = `/courses/${id}/${moduleId}/${nextLesson.id}`
      } else if (currentModuleIndex < course.modules.length - 1) {
        // First lesson of next module
        const nextModule = course.modules[currentModuleIndex + 1]
        const firstLesson = nextModule.lessons[0]
        console.log('Navigating to first lesson of next module:', { nextModule, firstLesson })
        window.location.href = `/courses/${id}/${nextModule.id}/${firstLesson.id}`
      }
    } else {
      if (currentLessonIndex > 0) {
        // Previous lesson in same module
        const prevLesson = currentModule.lessons[currentLessonIndex - 1]
        console.log('Navigating to previous lesson in same module:', prevLesson)
        window.location.href = `/courses/${id}/${moduleId}/${prevLesson.id}`
      } else if (currentModuleIndex > 0) {
        // Last lesson of previous module
        const prevModule = course.modules[currentModuleIndex - 1]
        const lastLesson = prevModule.lessons[prevModule.lessons.length - 1]
        console.log('Navigating to last lesson of previous module:', { prevModule, lastLesson })
        window.location.href = `/courses/${id}/${prevModule.id}/${lastLesson.id}`
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mentora-blue"></div>
      </div>
    )
  }

  if (error || !currentLesson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Lesson not found'}</p>
          <Button asChild variant="outline">
            <Link href={`/courses/${id}`}>Return to Course</Link>
          </Button>
        </div>
      </div>
    )
  }

  const renderLessonContent = () => {
    console.log('Rendering lesson content:', { type: currentLesson?.type, content: currentLesson?.content })
    switch (currentLesson?.type) {
      case 'video':
        console.log('Rendering video lesson:', currentLesson.videoUrl)
        // Extract video ID from YouTube URL
        const getYoutubeEmbedUrl = (url: string) => {
          const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
          const match = url.match(regExp)
          const videoId = (match && match[2].length === 11) ? match[2] : null
          return videoId ? `https://www.youtube.com/embed/${videoId}` : null
        }

        if (!currentLesson.videoUrl) {
          console.error('No video URL provided')
          return <div className="text-red-500">No video URL provided</div>
        }

        const embedUrl = getYoutubeEmbedUrl(currentLesson.videoUrl)
        console.log('YouTube embed URL:', embedUrl)

        if (!embedUrl) {
          console.error('Invalid YouTube URL:', currentLesson.videoUrl)
          return <div className="text-red-500">Invalid video URL</div>
        }

        return (
          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={currentLesson.title}
            />
          </div>
        )
      
      case 'text':
        console.log('Rendering text lesson with content length:', currentLesson.content?.length)
        return (
          <div className="prose prose-invert max-w-none">
            <div 
              className={styles.lessonContent}
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(currentLesson.content || '') 
              }} 
            />
          </div>
        )
      
      case 'image':
        return (
          <div className="space-y-6">
            {currentLesson.content && (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{currentLesson.content}</ReactMarkdown>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentLesson.images?.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-video relative rounded-lg overflow-hidden border bg-muted">
                    <img
                      src={imageUrl}
                      alt={`Image ${index + 1} of ${currentLesson.title}`}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => window.open(imageUrl, '_blank')}
                  >
                    View Full Size
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'quiz':
        return (
          <div className="space-y-4">
            <p>Quiz content will be implemented here</p>
            <Link href={`/quizzes/${currentLesson.quizId}`}>
              <Button>Start Quiz</Button>
            </Link>
          </div>
        )
      
      default:
        return <p>Content type not supported</p>
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            href={`/courses/${id}`}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Course
          </Link>
          <div className="text-sm text-muted-foreground">
            Module {currentModule?.title} • Lesson {currentLesson.title}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h1 className="text-2xl font-bold mb-4">{currentLesson.title}</h1>
              {renderLessonContent()}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigateToLesson('prev')}
                disabled={
                  moduleId === course?.modules[0].id.toString() &&
                  lessonId === currentModule?.lessons[0].id.toString()
                }
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous Lesson
              </Button>
              <Button
                onClick={() => navigateToLesson('next')}
                disabled={
                  moduleId === course?.modules[course.modules.length - 1].id.toString() &&
                  lessonId === currentModule?.lessons[currentModule.lessons.length - 1].id.toString()
                }
              >
                Next Lesson
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-4 shadow-sm">
              <h2 className="font-semibold mb-4">Course Progress</h2>
              <Progress value={60} className="mb-2" />
              <p className="text-sm text-muted-foreground mb-4">12/20 lessons completed</p>
              
              <div className="space-y-2">
                {course?.modules.map((module) => (
                  <div key={module.id} className="space-y-1">
                    <div className="font-medium text-sm">{module.title}</div>
                    <div className="pl-4 space-y-1">
                      {module.lessons.map((lesson) => (
                        <Link
                          key={lesson.id}
                          href={`/courses/${id}/${module.id}/${lesson.id}`}
                          className={`block text-sm py-1 px-2 rounded ${
                            lesson.id.toString() === lessonId
                              ? 'bg-primary/10 text-primary'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {lesson.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Chatbot />
    </div>
  )
} 