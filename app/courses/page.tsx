"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, Filter, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import { Course } from "./types/course"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    category: 'all',
    level: 'all',
    sort: 'popular'
  })
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        // Construct the query parameters based on filters
        const params = new URLSearchParams()
        if (filters.category !== 'all') params.append('category', filters.category)
        if (filters.level !== 'all') params.append('level', filters.level)
        if (filters.sort) params.append('sort', filters.sort)
        if (searchQuery) params.append('search', searchQuery)

        const response = await axios.get(`${process.env.NEXT_PUBLIC_COURSE_API_URL}/courses?${params.toString()}`)
        setCourses(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch courses. Please try again later.')
        console.error('Error fetching courses:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [filters, searchQuery])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleFilterChange = (type: 'category' | 'level' | 'sort', value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

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
                <Input 
                  type="search" 
                  placeholder="Rechercher un parcours..." 
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filtrer</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Select 
                value={filters.category}
                onValueChange={(value) => handleFilterChange('category', value)}
              >
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
              <Select 
                value={filters.level}
                onValueChange={(value) => handleFilterChange('level', value)}
              >
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
              <Select 
                value={filters.sort}
                onValueChange={(value) => handleFilterChange('sort', value)}
              >
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

          {error && (
            <div className="text-red-500 text-center mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mentora-blue mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Chargement des cours...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Link href={`/courses/${course.id}`} key={course.id}>
                  <div
                    className={`course-card flex flex-col rounded-lg border bg-card shadow-sm hover:border-mentora-${course.color}`}
                  >
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      {/* <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" /> */}
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
                            <span className="text-xs text-muted-foreground">{course.modules.length} modules</span>
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
          )}

          {!loading && courses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun cours trouvé</p>
            </div>
          )}

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
