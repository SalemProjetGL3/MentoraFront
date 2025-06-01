import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { BookOpen, CheckCircle } from "lucide-react"

export default function MyCoursesPage() {
  // Données de démonstration pour les parcours en cours
  const inProgressCourses = [
    {
      id: 1,
      title: "React.js Fondamentaux",
      description: "Maîtrisez les bases de React et créez vos premières applications.",
      progress: 35,
      lastAccessed: "Aujourd'hui",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Next.js Avancé",
      description: "Apprenez à créer des applications web performantes avec Next.js.",
      progress: 15,
      lastAccessed: "Hier",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  // Données de démonstration pour les parcours terminés
  const completedCourses = [
    {
      id: 3,
      title: "HTML & CSS Fondamentaux",
      description: "Apprenez les bases du développement web avec HTML et CSS.",
      completedDate: "15 mars 2023",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "JavaScript Moderne",
      description: "Maîtrisez JavaScript ES6+ et ses fonctionnalités avancées.",
      completedDate: "2 février 2023",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  // Données de démonstration pour les badges
  const badges = [
    {
      id: 1,
      title: "Maître React",
      description: "Obtenu en terminant le parcours React.js Fondamentaux",
      image: "/placeholder.svg?height=100&width=100",
      date: "En cours",
      progress: 35,
    },
    {
      id: 2,
      title: "Expert Frontend",
      description: "Obtenu en terminant 3 parcours frontend",
      image: "/placeholder.svg?height=100&width=100",
      date: "En cours",
      progress: 67,
    },
    {
      id: 3,
      title: "Développeur HTML/CSS",
      description: "Obtenu en terminant le parcours HTML & CSS Fondamentaux",
      image: "/placeholder.svg?height=100&width=100",
      date: "15 mars 2023",
      progress: 100,
    },
    {
      id: 4,
      title: "JavaScript Ninja",
      description: "Obtenu en terminant le parcours JavaScript Moderne",
      image: "/placeholder.svg?height=100&width=100",
      date: "2 février 2023",
      progress: 100,
    },
  ]

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="blob blob-blue"></div>
      <div className="blob blob-purple"></div>

      <Navbar />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Mes parcours d'apprentissage</h1>

          <Tabs defaultValue="in-progress">
            <TabsList className="mb-8">
              <TabsTrigger value="in-progress">En cours</TabsTrigger>
              <TabsTrigger value="completed">Terminés</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
            </TabsList>

            <TabsContent value="in-progress">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressCourses.map((course) => (
                  <Link href={`/courses/${course.id}`} key={course.id}>
                    <div className="course-card flex flex-col rounded-lg border bg-card shadow-sm h-full">
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-mentora-blue/90 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                          En cours
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        <p className="text-muted-foreground text-sm flex-1">{course.description}</p>

                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span>Progression</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                            <span>Dernier accès: {course.lastAccessed}</span>
                            <span className="font-medium text-primary">Continuer →</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}

                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 p-8 text-center h-full">
                  <BookOpen className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Découvrir plus de parcours</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Explorez notre catalogue pour trouver votre prochain parcours d'apprentissage
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/courses">Parcourir le catalogue</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedCourses.map((course) => (
                  <Link href={`/courses/${course.id}`} key={course.id}>
                    <div className="course-card flex flex-col rounded-lg border bg-card shadow-sm h-full">
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-mentora-green/90 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Terminé
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        <p className="text-muted-foreground text-sm flex-1">{course.description}</p>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-mentora-green" />
                            <span className="text-sm">Terminé le {course.completedDate}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            Revoir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {completedCourses.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 p-12 text-center">
                  <CheckCircle className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucun parcours terminé</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Vous n'avez pas encore terminé de parcours. Continuez votre apprentissage !
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/courses">Parcourir le catalogue</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="badges">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {badges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center rounded-lg border bg-card p-6 text-center">
                    <div className="relative w-24 h-24 mb-4">
                      <Image
                        src={badge.image || "/placeholder.svg"}
                        alt={badge.title}
                        fill
                        className="object-contain"
                      />
                      {badge.progress < 100 && (
                        <svg className="absolute inset-0 w-full h-full progress-ring" viewBox="0 0 100 100">
                          <circle
                            className="text-muted stroke-current"
                            strokeWidth="8"
                            strokeLinecap="round"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className="text-mentora-blue stroke-current"
                            strokeWidth="8"
                            strokeLinecap="round"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - badge.progress / 100)}`}
                          />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-1">{badge.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                    <div
                      className={`text-xs px-2.5 py-0.5 rounded-full ${
                        badge.progress === 100
                          ? "bg-mentora-green/20 text-mentora-green"
                          : "bg-mentora-blue/20 text-mentora-blue"
                      }`}
                    >
                      {badge.progress === 100 ? `Obtenu le ${badge.date}` : `En cours - ${badge.progress}%`}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Chatbot />
    </div>
  )
}
