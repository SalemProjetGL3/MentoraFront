"use client"

import { use, useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, Crown, Sparkles, Gift, ShoppingCart } from "lucide-react"



export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [userPoints, setUserPoints] = useState(0);
  const [ownedItems, setOwnedItems] = useState<number[]>([]);
  const [shopItems, setShopItems] = useState<
{ itemId: number; name: string; description: string; price: number, cost: number, type: string, imageUrl?: string }[]
  >([]);
const handlePurchase = async (itemId: number) => {
  try {
    const response = await fetch(`http://localhost:3009/shop/buy/${itemId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: 3 }),
    });

    const result = await response.json();

    if (!response.ok) {
      // Use the message returned by the backend if available
      throw new Error(result.message || "An unexpected error occurred.");
    }

    console.log("Purchase successful:", result);
    setOwnedItems((prev) => [...prev, itemId]);

    // Optionally refresh user points
    fetch("http://localhost:3009/points/3")
      .then((res) => res.json())
      .then((data) => setUserPoints(data.currentPoints));
  } catch (err: any) {
    console.error(err);
    alert(err.message); // Show readable error
  }
};

  useEffect(() => {
    fetch('http://localhost:3009/shop/user/3')
      .then((res) => res.json())
      .then((data) => {
        setOwnedItems(data.ownedItems);
        console.log("Owned items:", data);
      })
      .catch((err) => console.error('Failed to fetch owned items:', err));
  }, []);
  useEffect(() =>{
    fetch('http://localhost:3009/points/3')
    .then((res) => res.json())
    .then((data) => {
      setUserPoints(data.currentPoints)
    })
    .catch((err) => console.error('Failed to fetch user points:', err));
  }, [])
  useEffect(() => {
    fetch('http://localhost:3009/shop')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setShopItems(data);
      })
      .catch((err) => console.error('Failed to fetch shop items:', err));
  }, [])

  const categories = [
    { id: "all", name: "All Items" },
    { id: "avatar", name: "Avatars" },
    { id: "nickname", name: "Nicknames" },
  ]



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
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Shop</h1>

          <div className="flex items-center space-x-2 text-lg font-medium text-green-600">
            <Gift className="h-5 w-5" />
            <span>{userPoints} points</span>
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
            {shopItems.map((item) => (
             <div key={item.itemId} className="border rounded-md bg-card shadow-sm p-4 flex flex-col items-center text-center">
              <h1>{item.itemId}</h1>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-full border shadow mb-3"
              />
              <h3 className="font-semibold text-base mb-1">{item.name}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium text-mentora-blue">{item.cost} pts</span>
                {ownedItems.includes(item.itemId) ? (
                  <span className="text-xs text-green-500">Owned</span>
                ) : (
                  <Button size="sm" onClick={() => handlePurchase(item.itemId)}>
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Buy
                  </Button>
                )}
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