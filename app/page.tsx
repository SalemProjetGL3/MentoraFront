'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { BookOpen, Award, CheckCircle, Code, Video, FileText } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName] = useState("")

  // Function to delete a specific user (example)
  const deleteUser = async () => {
    let response; // Declare response outside the try block
    try {
      response = await fetch('http://localhost:3000/users/delete/selma.sghaier%40insat.ucar.tn');
      if (response.ok) {
        console.log('User deleted successfully');
        // You might want to add some UI feedback here, like a success message
      } else {
        console.error('Failed to delete user:', response.statusText);
        // Handle errors, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error during user deletion:', error);
      // Handle network errors
    }
  };

  useEffect(() => {
    // Check if user is logged in by looking for token
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  useEffect(() => {
    // Call the deleteUser function when the component mounts
    deleteUser();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleLogin = () => {
    console.log('Navigating to login page...')
    router.push('/login')
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="blob blob-blue"></div>
      <div className="blob blob-orange"></div>
      <div className="blob blob-green"></div>
      <div className="blob blob-purple"></div>

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    {isLoggedIn ? `Welcome back, ${userName}!` : <><span className="whitespace-nowrap">Learn Web Frameworks</span> <br/> Interactively</>}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {isLoggedIn 
                      ? "Continue your learning journey with our structured courses."
                      : "Structured and progressive learning paths to master modern web frameworks."}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  {isLoggedIn ? (
                    <>
                      <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-mentora-blue to-mentora-purple hover:opacity-90"
                      >
                        <Link href="/dashboard">Go to Dashboard</Link>
                      </Button>
                      <Button 
                        asChild
                        variant="outline" 
                        size="lg"
                      >
                        <Link href="/courses">Continue Learning</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-mentora-blue to-mentora-purple hover:opacity-90"
                      >
                        <a href="/courses">Discover Courses</a>
                      </Button>
                      <Button 
                        onClick={handleLogin}
                        variant="outline" 
                        size="lg"
                      >
                        Start Free
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="relative hidden lg:block w-full h-full min-h-[300px] flex items-center justify-center animate-float">
                <Image
                  src="/images/xs logo.png"
                  alt="Web Frameworks Illustration"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  A Complete Learning Experience
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Mentora offers an innovative pedagogical approach to master web frameworks.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Video className="h-6 w-6 text-mentora-blue" />
                </div>
                <h3 className="text-xl font-bold">Diverse Content</h3>
                <p className="text-center text-muted-foreground">
                  Videos, text, images, and explanatory GIFs for comprehensive learning.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Code className="h-6 w-6 text-mentora-green" />
                </div>
                <h3 className="text-xl font-bold">IDE Environment</h3>
                <p className="text-center text-muted-foreground">
                  Run code directly in the course for immediate practice.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle className="h-6 w-6 text-mentora-orange" />
                </div>
                <h3 className="text-xl font-bold">Quizzes and Assessments</h3>
                <p className="text-center text-muted-foreground">
                  Test your knowledge with quizzes at the end of each course.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Award className="h-6 w-6 text-mentora-purple" />
                </div>
                <h3 className="text-xl font-bold">Badges and Points</h3>
                <p className="text-center text-muted-foreground">
                  Earn badges and points for each completed course.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <BookOpen className="h-6 w-6 text-mentora-blue" />
                </div>
                <h3 className="text-xl font-bold">Structured Courses</h3>
                <p className="text-center text-muted-foreground">
                  Progressively organized modules for effective learning.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-mentora-green" />
                </div>
                <h3 className="text-xl font-bold">Progress Tracking</h3>
                <p className="text-center text-muted-foreground">
                  Track your progress and check your position in the rankings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Courses Section */}
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Popular Courses</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Discover our most followed courses by the community.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                {
                  title: "React.js Fundamentals",
                  description: "Master the basics of React and create your first applications.",
                  modules: 8,
                  level: "Beginner",
                  color: "blue",
                },
                {
                  title: "Advanced Next.js",
                  description: "Learn to create high-performance web applications with Next.js.",
                  modules: 10,
                  level: "Intermediate",
                  color: "purple",
                },
                {
                  title: "Complete Vue.js 3",
                  description: "Discover Vue.js 3 and its ecosystem from A to Z.",
                  modules: 12,
                  level: "All Levels",
                  color: "green",
                },
              ].map((course, index) => (
                <Link href={`/courses/${index + 1}`} key={index}>
                  <div
                    className={`course-card flex flex-col rounded-lg border p-6 bg-card shadow-sm hover:border-mentora-${course.color}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full bg-mentora-${course.color}/20 text-mentora-${course.color}`}
                      >
                        {course.level}
                      </div>
                      <div className="text-sm text-muted-foreground">{course.modules} modules</div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-muted-foreground flex-1">{course.description}</p>
                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">4.8k learners</span>
                      </div>
                      <div className="text-sm font-medium">View Course →</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button asChild variant="outline" size="lg">
                <Link href="/courses">View All Courses</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Start Your Journey?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Join thousands of learners and develop your web framework skills today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  onClick={handleLogin}
                  size="lg"
                  className="bg-gradient-to-r from-mentora-blue to-mentora-purple hover:opacity-90"
                >
                  Create Account
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                >
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} MENTORA. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}
