"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type MoodEntry = {
  date: string
  mood: number
  note: string
}

// Mock data - in a real app, this would come from a database
const initialMoodData: MoodEntry[] = [
  { date: "2023-11-01", mood: 3, note: "Feeling okay" },
  { date: "2023-11-02", mood: 4, note: "Good day at work" },
  { date: "2023-11-03", mood: 2, note: "Stressed about deadline" },
  { date: "2023-11-04", mood: 5, note: "Great day with friends" },
  { date: "2023-11-05", mood: 3, note: "Average day" },
  { date: "2023-11-06", mood: 4, note: "Productive day" },
  { date: "2023-11-07", mood: 3, note: "Feeling balanced" },
]

const moodLabels = ["Very Low", "Low", "Neutral", "Good", "Excellent"]

export function MoodTracker() {
  const [moodData, setMoodData] = useState<MoodEntry[]>(initialMoodData)
  const [selectedMood, setSelectedMood] = useState<string>("3")

  const addMoodEntry = () => {
    const today = new Date().toISOString().split("T")[0]
    const newEntry: MoodEntry = {
      date: today,
      mood: Number.parseInt(selectedMood),
      note: "",
    }

    // Check if we already have an entry for today
    const existingEntryIndex = moodData.findIndex((entry) => entry.date === today)

    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedData = [...moodData]
      updatedData[existingEntryIndex] = newEntry
      setMoodData(updatedData)
    } else {
      // Add new entry
      setMoodData([...moodData, newEntry])
    }
  }

  const chartData = moodData.map((entry) => ({
    date: entry.date,
    mood: entry.mood,
  }))

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-4">Your Mood History</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                  <Tooltip formatter={(value: number) => [moodLabels[value - 1], "Mood"]} />
                  <Line type="monotone" dataKey="mood" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="md:w-64">
            <h3 className="text-lg font-medium mb-4">Log Today's Mood</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">How are you feeling today?</label>
                <Select value={selectedMood} onValueChange={setSelectedMood}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Very Low</SelectItem>
                    <SelectItem value="2">Low</SelectItem>
                    <SelectItem value="3">Neutral</SelectItem>
                    <SelectItem value="4">Good</SelectItem>
                    <SelectItem value="5">Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addMoodEntry} className="w-full">
                Save Mood
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

