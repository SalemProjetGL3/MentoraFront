import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { CheckCircle, Trophy, Download } from "lucide-react"

export default function BadgesPage() {
  // Données de démonstration pour les badges
  const badges = [
    {
      id: 1,
      title: "Maître React",
      description: "Obtenu en terminant le parcours React.js Fondamentaux",
      image: "/placeholder.svg?height=100&width=100",
      date: "En cours",
      progress: 35,
      category: "Framework",
    },
    {
      id: 2,
      title: "Expert Frontend",
      description: "Obtenu en terminant 3 parcours frontend",
      image: "/placeholder.svg?height=100&width=100",
      date: "En cours",
      progress: 67,
      category: "Spécialité",
    },
    {
      id: 3,
      title: "Développeur HTML/CSS",
      description: "Obtenu en terminant le parcours HTML & CSS Fondamentaux",
      image: "/placeholder.svg?height=100&width=100",
      date: "15 mars 2023",
      progress: 100,
      category: "Fondamentaux",
    },
    {
      id: 4,
      title: "JavaScript Ninja",
      description: "Obtenu en terminant le parcours JavaScript Moderne",
      image: "/placeholder.svg?height=100&width=100",
      date: "2 février 2023",
      progress: 100,
      category: "Langage",
    },
    {
      id: 5,
      title: "Développeur Backend",
      description: "Obtenu en terminant le parcours Node.js & Express",
      image: "/placeholder.svg?height=100&width=100",
      date: "En cours",
      progress: 10,
      category: "Backend",
    },
    {
      id: 6,
      title: "Apprenant Assidu",
      description: "Obtenu en se connectant 30 jours consécutifs",
      image: "/placeholder.svg?height=100&width=100",
      date: "En cours",
      progress: 80,
      category: "Engagement",
    },
  ]

  // Données de démonstration pour les certifications
  const certifications = [
    {
      id: 1,
      title: "Développeur Frontend",
      description: "Certification obtenue en terminant tous les parcours frontend",
      image: "/placeholder.svg?height=200&width=300",
      date: "En cours",
      progress: 50,
      requiredBadges: ["Maître React", "Développeur HTML/CSS", "JavaScript Ninja"],
    },
    {
      id: 2,
      title: "Développeur Fullstack JavaScript",
      description: "Certification obtenue en terminant les parcours frontend et backend",
      image: "/placeholder.svg?height=200&width=300",
      date: "En cours",
      progress: 30,
      requiredBadges: ["Expert Frontend", "Développeur Backend"],
    },
  ]

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="blob blob-blue"></div>
      <div className="blob blob-purple"></div>

      <Navbar />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Badges et Certifications</h1>
              <p className="text-muted-foreground">Suivez votre progression et affichez vos réalisations</p>
            </div>
            <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">4</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
              <div className="h-10 border-l"></div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs text-muted-foreground">Obtenus</div>
              </div>
              <div className="h-10 border-l"></div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs text-muted-foreground">En cours</div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="badges">
            <TabsList className="mb-8">
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

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
                    <div className="text-xs px-2.5 py-0.5 rounded-full mb-2 bg-muted/50 text-muted-foreground">
                      {badge.category}
                    </div>
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

            <TabsContent value="certifications">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((certification) => (
                  <div key={certification.id} className="flex flex-col rounded-lg border bg-card overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={certification.image || "/placeholder.svg"}
                        alt={certification.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold mb-1">{certification.title}</h3>
                        <p className="text-sm text-muted-foreground">{certification.description}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <div className="flex justify-between items-center text-sm mb-2">
                          <span>Progression</span>
                          <span>{certification.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-mentora-blue h-2.5 rounded-full"
                            style={{ width: `${certification.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="text-sm font-medium">Badges requis:</div>
                        {certification.requiredBadges.map((badge, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {badges.find((b) => b.title === badge)?.progress === 100 ? (
                              <CheckCircle className="h-4 w-4 text-mentora-green" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border border-muted-foreground"></div>
                            )}
                            <span className="text-sm">{badge}</span>
                          </div>
                        ))}
                      </div>

                      {certification.progress === 100 ? (
                        <Button className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger le certificat
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/courses">Continuer l'apprentissage</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-lg border bg-muted/30">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-shrink-0">
                    <Trophy className="h-16 w-16 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Obtenez des certifications reconnues</h3>
                    <p className="text-muted-foreground mb-4">
                      Complétez les parcours associés pour obtenir des certifications qui valoriseront votre profil
                      professionnel. Chaque certification atteste de compétences spécifiques dans un domaine du
                      développement web.
                    </p>
                    <Button asChild>
                      <Link href="/courses">Explorer les parcours</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Chatbot />
    </div>
  )
}
