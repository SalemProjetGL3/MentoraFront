"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { User, Lock, Bell, Globe, Shield, Trash2, Upload, Github, Linkedin } from "lucide-react"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simuler la sauvegarde
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="blob blob-blue"></div>
      <div className="blob blob-purple"></div>

      <Navbar isLoggedIn={true} />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Mon Profil</h1>

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg bg-card">
                <div className="relative">
                  <Image
                    src="/placeholder.svg"
                    alt="Photo de profil"
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-background"
                  />
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold">Jean Dupont</h2>
                  <p className="text-sm text-muted-foreground">jean.dupont@example.com</p>
                </div>
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Membre depuis</span>
                    <span className="text-sm font-medium">Janvier 2023</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Parcours terminés</span>
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Badges obtenus</span>
                    <span className="text-sm font-medium">4</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4">
                  <h3 className="font-medium">Navigation</h3>
                </div>
                <div className="p-2">
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#personal-info">
                        <User className="mr-2 h-4 w-4" />
                        Informations personnelles
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#account-security">
                        <Lock className="mr-2 h-4 w-4" />
                        Sécurité du compte
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#notifications">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#preferences">
                        <Globe className="mr-2 h-4 w-4" />
                        Préférences
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#connected-accounts">
                        <Shield className="mr-2 h-4 w-4" />
                        Comptes connectés
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div id="personal-info" className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4 flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  <h3 className="font-medium">Informations personnelles</h3>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">Prénom</Label>
                        <Input id="first-name" defaultValue="Jean" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Nom</Label>
                        <Input id="last-name" defaultValue="Dupont" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="jean.dupont@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biographie</Label>
                      <Textarea
                        id="bio"
                        placeholder="Parlez-nous de vous..."
                        defaultValue="Développeur web passionné par les nouvelles technologies et l'apprentissage continu."
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="job-title">Titre professionnel</Label>
                        <Input id="job-title" defaultValue="Développeur Frontend" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Entreprise / Organisation</Label>
                        <Input id="company" defaultValue="Acme Inc." />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              <div id="account-security" className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4 flex items-center">
                  <Lock className="mr-2 h-5 w-5" />
                  <h3 className="font-medium">Sécurité du compte</h3>
                </div>
                <div className="p-6">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mot de passe actuel</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nouveau mot de passe</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit">Mettre à jour le mot de passe</Button>
                    </div>
                  </form>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h4 className="font-medium">Authentification à deux facteurs</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Activer l'authentification à deux facteurs</p>
                        <p className="text-sm text-muted-foreground">
                          Ajoutez une couche de sécurité supplémentaire à votre compte.
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>

              <div id="notifications" className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4 flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notifications par email</p>
                        <p className="text-sm text-muted-foreground">
                          Recevez des emails concernant votre activité et vos parcours.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notifications de nouveaux parcours</p>
                        <p className="text-sm text-muted-foreground">
                          Soyez informé lorsque de nouveaux parcours sont disponibles.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Rappels d'apprentissage</p>
                        <p className="text-sm text-muted-foreground">
                          Recevez des rappels pour continuer vos parcours en cours.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Newsletter mensuelle</p>
                        <p className="text-sm text-muted-foreground">
                          Recevez notre newsletter avec des conseils et des actualités.
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>

              <div id="preferences" className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4 flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  <h3 className="font-medium">Préférences</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Langue</Label>
                      <Select defaultValue="fr">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Sélectionner une langue" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme">Thème</Label>
                      <Select defaultValue="dark">
                        <SelectTrigger id="theme">
                          <SelectValue placeholder="Sélectionner un thème" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Clair</SelectItem>
                          <SelectItem value="dark">Sombre</SelectItem>
                          <SelectItem value="system">Système</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Lecture automatique des vidéos</p>
                        <p className="text-sm text-muted-foreground">
                          Lire automatiquement les vidéos dans les parcours.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div id="connected-accounts" className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4 flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  <h3 className="font-medium">Comptes connectés</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                            <path
                              fill="currentColor"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="currentColor"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Google</p>
                          <p className="text-sm text-muted-foreground">jean.dupont@gmail.com</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Déconnecter
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <Github className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">GitHub</p>
                          <p className="text-sm text-muted-foreground">jdupont</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Déconnecter
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <Linkedin className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">LinkedIn</p>
                          <p className="text-sm text-muted-foreground">Non connecté</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connecter
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4 flex items-center">
                  <Trash2 className="mr-2 h-5 w-5 text-destructive" />
                  <h3 className="font-medium text-destructive">Supprimer le compte</h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    La suppression de votre compte est définitive et supprimera toutes vos données, y compris vos
                    parcours, badges et certifications.
                  </p>
                  <Button variant="destructive">Supprimer mon compte</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Chatbot />
    </div>
  )
}
