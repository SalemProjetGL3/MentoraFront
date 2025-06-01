"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, Crown, Sparkles, Gift, ShoppingCart } from "lucide-react"

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Items" },
    { id: "frames", name: "Profile Frames" },
    { id: "badges", name: "Special Badges" },
    { id: "effects", name: "Profile Effects" },
  ]

  const shopItems = [
    {
      id: 1,
      name: "Golden Crown Frame",
      description: "A prestigious golden crown frame for your profile picture",
      price: 1000,
      category: "frames",
      image: "/placeholder.svg",
      rarity: "legendary",
    },
    {
      id: 2,
      name: "Rainbow Sparkles",
      description: "Add rainbow sparkles to your profile picture",
      price: 500,
      category: "effects",
      image: "/placeholder.svg",
      rarity: "rare",
    },
    {
      id: 3,
      name: "Master Coder Badge",
      description: "Show off your coding expertise with this special badge",
      price: 750,
      category: "badges",
      image: "/placeholder.svg",
      rarity: "epic",
    },
    {
      id: 4,
      name: "Neon Glow Frame",
      description: "A vibrant neon frame that makes your profile stand out",
      price: 800,
      category: "frames",
      image: "/placeholder.svg",
      rarity: "epic",
    },
    {
      id: 5,
      name: "Fire Trail Effect",
      description: "Add a cool fire trail effect to your profile",
      price: 600,
      category: "effects",
      image: "/placeholder.svg",
      rarity: "rare",
    },
    {
      id: 6,
      name: "Early Adopter Badge",
      description: "Exclusive badge for early platform adopters",
      price: 400,
      category: "badges",
      image: "/placeholder.svg",
      rarity: "rare",
    },
  ]

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return <Crown className="h-4 w-4 text-yellow-400" />
      case "epic":
        return <Sparkles className="h-4 w-4 text-purple-400" />
      case "rare":
        return <Star className="h-4 w-4 text-blue-400" />
      default:
        return <Gift className="h-4 w-4 text-green-400" />
    }
  }

  const filteredItems = shopItems.filter(
    (item) =>
      (selectedCategory === "all" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="blob blob-blue"></div>
      <div className="blob blob-purple"></div>

      <Navbar />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Shop</h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Customize your profile with exclusive items
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden bg-card">
                <div className="aspect-square relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2">
                    {getRarityIcon(item.rarity)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-mentora-blue">{item.price} points</span>
                    <Button size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Purchase
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Chatbot />
    </div>
  )
} 