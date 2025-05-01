import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { BookOpen, Award, CheckCircle, Code, Video, FileText } from "lucide-react"

export default function Home() {
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
                    Apprenez les frameworks web de manière interactive
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Des parcours d'apprentissage structurés et progressifs pour maîtriser les frameworks web modernes.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-mentora-blue to-mentora-purple hover:opacity-90"
                  >
                    <Link href="/courses">Découvrir les parcours</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/login">Commencer gratuitement</Link>
                  </Button>
                </div>
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
                  Une expérience d'apprentissage complète
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Mentora propose une approche pédagogique innovante pour maîtriser les frameworks web.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Video className="h-6 w-6 text-mentora-blue" />
                </div>
                <h3 className="text-xl font-bold">Contenus variés</h3>
                <p className="text-center text-muted-foreground">
                  Vidéos, textes, images et GIFs explicatifs pour un apprentissage complet.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Code className="h-6 w-6 text-mentora-green" />
                </div>
                <h3 className="text-xl font-bold">Environnement IDE</h3>
                <p className="text-center text-muted-foreground">
                  Exécutez du code directement dans le parcours pour une pratique immédiate.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle className="h-6 w-6 text-mentora-orange" />
                </div>
                <h3 className="text-xl font-bold">Quiz et évaluations</h3>
                <p className="text-center text-muted-foreground">
                  Testez vos connaissances avec des quiz à la fin de chaque parcours.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Award className="h-6 w-6 text-mentora-purple" />
                </div>
                <h3 className="text-xl font-bold">Badges et points</h3>
                <p className="text-center text-muted-foreground">
                  Gagnez des badges et des points pour chaque parcours achevé.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <BookOpen className="h-6 w-6 text-mentora-blue" />
                </div>
                <h3 className="text-xl font-bold">Parcours structurés</h3>
                <p className="text-center text-muted-foreground">
                  Des modules organisés de manière progressive pour un apprentissage efficace.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-mentora-green" />
                </div>
                <h3 className="text-xl font-bold">Suivi de progression</h3>
                <p className="text-center text-muted-foreground">
                  Suivez votre avancement et consultez votre position dans les classements.
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Parcours populaires</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Découvrez nos parcours les plus suivis par la communauté.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                {
                  title: "React.js Fondamentaux",
                  description: "Maîtrisez les bases de React et créez vos premières applications.",
                  modules: 8,
                  level: "Débutant",
                  color: "blue",
                },
                {
                  title: "Next.js Avancé",
                  description: "Apprenez à créer des applications web performantes avec Next.js.",
                  modules: 10,
                  level: "Intermédiaire",
                  color: "purple",
                },
                {
                  title: "Vue.js 3 Complet",
                  description: "Découvrez Vue.js 3 et son écosystème de A à Z.",
                  modules: 12,
                  level: "Tous niveaux",
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
                        <span className="text-sm text-muted-foreground">4.8k apprenants</span>
                      </div>
                      <div className="text-sm font-medium">Voir le parcours →</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button asChild variant="outline" size="lg">
                <Link href="/courses">Voir tous les parcours</Link>
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
                  Prêt à commencer votre parcours ?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Rejoignez des milliers d'apprenants et développez vos compétences en frameworks web dès aujourd'hui.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-mentora-blue to-mentora-purple hover:opacity-90"
                >
                  <Link href="/login">Créer un compte</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/courses">Explorer les parcours</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} MENTORA. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Conditions d'utilisation
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Politique de confidentialité
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}
