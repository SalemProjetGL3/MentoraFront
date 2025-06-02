"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Star, Crown } from "lucide-react"

type Player = {
  userId: string;
  totalPoints: number;
  currentPoints: number;
  streak: number;
  badgesIds: string[];
};

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState("all-time")
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Step 1: Fetch initial leaderboard
  useEffect(() => {
    const apiUrl = (process.env.NEXT_PUBLIC_LEADERBOARD_API_URL)
    console.log("API URL:", apiUrl)
    if (!apiUrl) {
      setError('API URL not configured')
      setLoading(false)
      return
    }

    fetch(`${apiUrl}/leaderboard`)
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch leaderboard:', err)
        setError('Failed to load leaderboard')
        setLoading(false)
      })
  }, [])

  // Step 2: Subscribe to updates via SSE
  useEffect(() => {
    const apiUrl = (process.env.NEXT_PUBLIC_LEADERBOARD_API_URL)
    
    if (!apiUrl) return

    const eventSource = new EventSource(`${apiUrl}/leaderboard/stream`)

    eventSource.addEventListener('leaderboardUpdate', (event: MessageEvent) => {
      const updated = JSON.parse(event.data)
      setPlayers(updated)
    })

    eventSource.onerror = (err) => {
      console.error("SSE error:", err)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

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

      <Navbar />

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

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="border rounded-lg overflow-hidden bg-card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">Rank</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">User</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Total Points</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Current Points</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Streak</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Badges</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player, index) => (
                      <tr key={player.userId} className="border-b">
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            {getRankIcon(index + 1)}
                            <span className="font-medium">#{index + 1}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <img
                              src="/placeholder.svg"
                              alt={`User ${player.userId}`}
                              className="h-8 w-8 rounded-full"
                            />
                            <span className="font-medium">User {player.userId}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <span className="font-medium text-mentora-blue">{player.totalPoints}</span>
                        </td>
                        <td className="p-4 align-middle">
                          <span className="font-medium">{player.currentPoints}</span>
                        </td>
                        <td className="p-4 align-middle">{player.streak}</td>
                        <td className="p-4 align-middle">{player.badgesIds.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <Chatbot />
    </div>
  )
} 