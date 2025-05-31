import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, Filter, Clock } from "lucide-react"

export default function CoursesPage() {
  // Données de démonstration pour les parcours
  const courses = [
    {
      id: 1,
      title: "React.js Fondamentaux",
      description: "Maîtrisez les bases de React et créez vos premières applications.",
      modules: 8,
      duration: "10 heures",
      level: "Débutant",
      category: "Frontend",
      color: "blue",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Next.js Avancé",
      description: "Apprenez à créer des applications web performantes avec Next.js.",
      modules: 10,
      duration: "15 heures",
      level: "Intermédiaire",
      category: "Frontend",
      color: "purple",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Vue.js 3 Complet",
      description: "Découvrez Vue.js 3 et son écosystème de A à Z.",
      modules: 12,
      duration: "18 heures",
      level: "Tous niveaux",
      category: "Frontend",
      color: "green",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "Node.js & Express",
      description: "Créez des API RESTful avec Node.js et Express.",
      modules: 9,
      duration: "12 heures",
      level: "Intermédiaire",
      category: "Backend",
      color: "orange",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      title: "Angular Complet",
      description: "Maîtrisez Angular pour développer des applications d'entreprise.",
      modules: 14,
      duration: "20 heures",
      level: "Avancé",
      category: "Frontend",
      color: "blue",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      title: "Django REST Framework",
      description: "Développez des API robustes avec Django REST Framework.",
      modules: 10,
      duration: "16 heures",
      level: "Intermédiaire",
      category: "Backend",
      color: "green",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="blob blob-blue"></div>
      <div className="blob blob-orange"></div>

      <Navbar />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Parcours d'apprentissage</h1>
              <p className="text-muted-foreground">Découvrez tous nos parcours pour maîtriser les frameworks web</p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
              <div className="relative w-full md:w-[260px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Rechercher un parcours..." className="w-full pl-8" />
              </div>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filtrer</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="fullstack">Fullstack</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les niveaux</SelectItem>
                  <SelectItem value="beginner">Débutant</SelectItem>
                  <SelectItem value="intermediate">Intermédiaire</SelectItem>
                  <SelectItem value="advanced">Avancé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="popular">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popularité</SelectItem>
                  <SelectItem value="newest">Plus récents</SelectItem>
                  <SelectItem value="oldest">Plus anciens</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link href={`/courses/${course.id}`} key={course.id}>
                <div
                  className={`course-card flex flex-col rounded-lg border bg-card shadow-sm hover:border-mentora-${course.color}`}
                >
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                    <div
                      className={`absolute top-2 right-2 text-xs font-medium px-2.5 py-0.5 rounded-full bg-mentora-${course.color}/20 text-mentora-${course.color}`}
                    >
                      {course.level}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-sm text-muted-foreground mb-2">{course.category}</div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-muted-foreground text-sm flex-1">{course.description}</p>
                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{course.modules} modules</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{course.duration}</span>
                        </div>
                      </div>
                      <div className="text-sm font-medium">Voir →</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button variant="default" size="icon" className="bg-mentora-blue hover:bg-mentora-blue/90">
                1
              </Button>
              <Button variant="outline" size="icon">
                2
              </Button>
              <Button variant="outline" size="icon">
                3
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Chatbot />
    </div>
  )
}
