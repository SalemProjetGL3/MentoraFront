"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Star, Crown } from "lucide-react"

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState("all-time")

  const topUsers = [
    { rank: 1, name: "Sarah Johnson", points: 2500, courses: 12, badges: 8, avatar: "/placeholder.svg" },
    { rank: 2, name: "Michael Chen", points: 2300, courses: 10, badges: 7, avatar: "/placeholder.svg" },
    { rank: 3, name: "Emma Wilson", points: 2100, courses: 9, badges: 6, avatar: "/placeholder.svg" },
    { rank: 4, name: "David Brown", points: 1900, courses: 8, badges: 5, avatar: "/placeholder.svg" },
    { rank: 5, name: "Lisa Anderson", points: 1800, courses: 7, badges: 5, avatar: "/placeholder.svg" },
    { rank: 6, name: "James Wilson", points: 1700, courses: 7, badges: 4, avatar: "/placeholder.svg" },
    { rank: 7, name: "Maria Garcia", points: 1600, courses: 6, badges: 4, avatar: "/placeholder.svg" },
    { rank: 8, name: "John Smith", points: 1500, courses: 6, badges: 3, avatar: "/placeholder.svg" },
    { rank: 9, name: "Anna Lee", points: 1400, courses: 5, badges: 3, avatar: "/placeholder.svg" },
    { rank: 10, name: "Tom Harris", points: 1300, courses: 5, badges: 3, avatar: "/placeholder.svg" },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400" />
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />
      default:
        return <Star className="h-6 w-6 text-blue-400" />
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="blob blob-blue"></div>
      <div className="blob blob-purple"></div>

      <Navbar isLoggedIn={true} />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Leaderboard</h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Top performers in our learning community
            </p>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <Button
              variant={timeFilter === "weekly" ? "default" : "outline"}
              onClick={() => setTimeFilter("weekly")}
            >
              Weekly
            </Button>
            <Button
              variant={timeFilter === "monthly" ? "default" : "outline"}
              onClick={() => setTimeFilter("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={timeFilter === "all-time" ? "default" : "outline"}
              onClick={() => setTimeFilter("all-time")}
            >
              All Time
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium">Rank</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">User</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Points</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Courses</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Badges</th>
                  </tr>
                </thead>
                <tbody>
                  {topUsers.map((user) => (
                    <tr key={user.rank} className="border-b">
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          {getRankIcon(user.rank)}
                          <span className="font-medium">#{user.rank}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-8 w-8 rounded-full"
                          />
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <span className="font-medium text-mentora-blue">{user.points}</span>
                      </td>
                      <td className="p-4 align-middle">{user.courses}</td>
                      <td className="p-4 align-middle">{user.badges}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Chatbot />
    </div>
  )
} 