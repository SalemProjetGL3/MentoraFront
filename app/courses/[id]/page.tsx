"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import {
  BookOpen,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Play,
  FileText,
  Code,
  BarChart,
  Users,
  Star,
} from "lucide-react"

export default function CoursePage({ params }: { params: { id: string } }) {
  const [activeModule, setActiveModule] = useState(0)
  const [activeLesson, setActiveLesson] = useState(0)

  // Données de démonstration pour le parcours
  const course = {
    id: Number.parseInt(params.id),
    title: "React.js Fondamentaux",
    description: "Maîtrisez les bases de React et créez vos premières applications.",
    longDescription:
      "Ce parcours complet vous permettra de maîtriser les fondamentaux de React.js, la bibliothèque JavaScript la plus populaire pour créer des interfaces utilisateur interactives. Vous apprendrez à créer des composants, gérer l'état, utiliser les hooks, et bien plus encore.",
    instructor: "Marie Dupont",
    instructorRole: "Développeuse Senior Frontend",
    level: "Débutant",
    category: "Frontend",
    duration: "10 heures",
    rating: 4.8,
    students: 4823,
    lastUpdated: "Avril 2023",
    progress: 35,
    image: "/placeholder.svg?height=400&width=800",
    instructorImage: "/placeholder.svg?height=100&width=100",
    modules: [
      {
        title: "Introduction à React",
        lessons: [
          { title: "Qu'est-ce que React?", type: "video", duration: "8 min", completed: true },
          { title: "Installation et configuration", type: "text", duration: "12 min", completed: true },
          { title: "Votre première application React", type: "code", duration: "15 min", completed: false },
          { title: "Quiz - Introduction", type: "quiz", duration: "5 min", completed: false },
        ],
      },
      {
        title: "Les composants React",
        lessons: [
          { title: "Composants fonctionnels", type: "video", duration: "10 min", completed: false },
          { title: "Composants de classe", type: "video", duration: "12 min", completed: false },
          { title: "Props et état", type: "text", duration: "15 min", completed: false },
          { title: "Exercice pratique", type: "code", duration: "20 min", completed: false },
          { title: "Quiz - Composants", type: "quiz", duration: "5 min", completed: false },
        ],
      },
      {
        title: "Les Hooks",
        lessons: [
          { title: "Introduction aux Hooks", type: "video", duration: "8 min", completed: false },
          { title: "useState", type: "text", duration: "10 min", completed: false },
          { title: "useEffect", type: "text", duration: "12 min", completed: false },
          { title: "Hooks personnalisés", type: "code", duration: "15 min", completed: false },
          { title: "Quiz - Hooks", type: "quiz", duration: "5 min", completed: false },
        ],
      },
      {
        title: "Routage avec React Router",
        lessons: [
          { title: "Installation de React Router", type: "text", duration: "5 min", completed: false },
          { title: "Configuration des routes", type: "video", duration: "12 min", completed: false },
          { title: "Navigation et paramètres", type: "code", duration: "15 min", completed: false },
          { title: "Quiz - Routage", type: "quiz", duration: "5 min", completed: false },
        ],
      },
      {
        title: "Gestion d'état avancée",
        lessons: [
          { title: "Context API", type: "video", duration: "10 min", completed: false },
          { title: "Introduction à Redux", type: "video", duration: "15 min", completed: false },
          { title: "Projet final", type: "code", duration: "30 min", completed: false },
          { title: "Évaluation finale", type: "quiz", duration: "15 min", completed: false },
        ],
      },
    ],
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      case "code":
        return <Code className="h-4 w-4" />
      case "quiz":
        return <BarChart className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter((lesson) => lesson.completed).length,
    0,
  )

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-80 border-r bg-muted/30 overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Contenu du parcours</h2>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={course.progress} className="h-2" />
              <span className="text-xs text-muted-foreground">{course.progress}%</span>
            </div>
          </div>

          <div className="flex-1 py-2">
            {course.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="mb-2">
                <div
                  className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-muted ${
                    moduleIndex === activeModule ? "bg-muted" : ""
                  }`}
                  onClick={() => setActiveModule(moduleIndex)}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{module.title}</span>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${moduleIndex === activeModule ? "rotate-90" : ""}`}
                  />
                </div>

                {moduleIndex === activeModule && (
                  <div className="pl-4 pr-2 py-1">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer ${
                          lessonIndex === activeLesson && moduleIndex === activeModule
                            ? "bg-primary/10"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setActiveLesson(lessonIndex)}
                      >
                        <div className="flex items-center gap-2">
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4 text-mentora-green" />
                          ) : (
                            getLessonIcon(lesson.type)
                          )}
                          <span className="text-sm">{lesson.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-1">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Retour aux parcours
                </Link>
                <h1 className="text-3xl font-bold tracking-tight mb-2">{course.title}</h1>
                <p className="text-muted-foreground mb-4">{course.longDescription}</p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{totalLessons} leçons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{course.students} apprenants</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{course.rating} (124 avis)</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <Image
                    src={course.instructorImage || "/placeholder.svg"}
                    alt={course.instructor}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">{course.instructor}</div>
                    <div className="text-sm text-muted-foreground">{course.instructorRole}</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button className="flex-1 bg-gradient-to-r from-mentora-blue to-mentora-purple hover:opacity-90">
                    Continuer l'apprentissage
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Télécharger les ressources
                  </Button>
                </div>
              </div>

              <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
                  <div className="relative aspect-video">
                    <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="icon" className="rounded-full bg-primary/90 hover:bg-primary/100 h-12 w-12">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm font-medium">Votre progression</div>
                      <div className="text-sm text-muted-foreground">
                        {completedLessons}/{totalLessons} leçons
                      </div>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-4" />
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Niveau:</span>
                        <span className="font-medium">{course.level}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Catégorie:</span>
                        <span className="font-medium">{course.category}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Dernière mise à jour:</span>
                        <span className="font-medium">{course.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="content">
              <TabsList className="mb-6">
                <TabsTrigger value="content">Contenu</TabsTrigger>
                <TabsTrigger value="overview">Aperçu</TabsTrigger>
                <TabsTrigger value="reviews">Avis</TabsTrigger>
                <TabsTrigger value="notes">Mes notes</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6">
                {course.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 p-4 flex justify-between items-center">
                      <div className="font-medium">{module.title}</div>
                      <div className="text-sm text-muted-foreground">{module.lessons.length} leçons</div>
                    </div>
                    <div className="divide-y">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="p-4 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            {lesson.completed ? (
                              <CheckCircle className="h-5 w-5 text-mentora-green" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                                {getLessonIcon(lesson.type)}
                              </div>
                            )}
                            <div>
                              <div className="font-medium">{lesson.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {lesson.type === "video"
                                  ? "Vidéo"
                                  : lesson.type === "text"
                                    ? "Lecture"
                                    : lesson.type === "code"
                                      ? "Exercice pratique"
                                      : "Quiz"}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                            <Button variant="ghost" size="sm">
                              {lesson.completed ? "Revoir" : "Commencer"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="overview">
                <div className="prose prose-invert max-w-none">
                  <h2>À propos de ce parcours</h2>
                  <p>
                    Ce parcours complet vous permettra de maîtriser les fondamentaux de React.js, la bibliothèque
                    JavaScript la plus populaire pour créer des interfaces utilisateur interactives. Vous apprendrez à
                    créer des composants, gérer l'état, utiliser les hooks, et bien plus encore.
                  </p>

                  <h3>Ce que vous apprendrez</h3>
                  <ul>
                    <li>Comprendre les concepts fondamentaux de React</li>
                    <li>Créer des composants réutilisables</li>
                    <li>Gérer l'état local et global</li>
                    <li>Utiliser les Hooks React</li>
                    <li>Implémenter le routage avec React Router</li>
                    <li>Créer une application React complète</li>
                  </ul>

                  <h3>Prérequis</h3>
                  <ul>
                    <li>Connaissances de base en HTML, CSS et JavaScript</li>
                    <li>Compréhension des concepts de programmation</li>
                    <li>Environnement de développement configuré (instructions fournies)</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 bg-muted/30 p-6 rounded-lg">
                      <div className="text-center mb-4">
                        <div className="text-5xl font-bold">{course.rating}</div>
                        <div className="flex justify-center my-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < Math.floor(course.rating) ? "text-yellow-500" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">Basé sur 124 avis</div>
                      </div>

                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2">
                            <div className="text-sm w-2">{rating}</div>
                            <Star className="h-4 w-4 text-yellow-500" />
                            <Progress
                              value={rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 5 : 0}
                              className="h-2 flex-1"
                            />
                            <div className="text-sm text-muted-foreground w-8">
                              {rating === 5 ? "75%" : rating === 4 ? "20%" : rating === 3 ? "5%" : "0%"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="md:w-2/3 space-y-6">
                      {[
                        {
                          name: "Sophie Martin",
                          rating: 5,
                          date: "15 mars 2023",
                          comment:
                            "Excellent parcours ! Les explications sont claires et les exercices pratiques très utiles. J'ai pu créer ma première application React en suivant ce parcours.",
                        },
                        {
                          name: "Thomas Dubois",
                          rating: 4,
                          date: "2 février 2023",
                          comment:
                            "Très bon contenu, bien structuré. J'aurais aimé plus d'exercices pratiques, mais dans l'ensemble c'est un excellent parcours pour débuter avec React.",
                        },
                        {
                          name: "Julie Leroy",
                          rating: 5,
                          date: "18 janvier 2023",
                          comment:
                            "Ce parcours m'a permis de comprendre les concepts fondamentaux de React que je n'arrivais pas à saisir auparavant. Les explications sont claires et progressives.",
                        },
                      ].map((review, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{review.name}</div>
                            <div className="text-sm text-muted-foreground">{review.date}</div>
                          </div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-500" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                          <p className="text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notes">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <textarea
                      className="w-full bg-transparent border-none focus:outline-none resize-none h-32"
                      placeholder="Prenez des notes pendant votre apprentissage..."
                    ></textarea>
                  </div>
                  <Button>Enregistrer les notes</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Chatbot />
    </div>
  )
}
