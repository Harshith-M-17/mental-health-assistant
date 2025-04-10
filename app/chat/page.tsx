"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUp, Bot, User } from "lucide-react"
import { getResponseForMessage } from "@/lib/response-matcher"
import { FacialRecognition } from "@/components/FacialRecognition"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      role: "assistant",
      content:
        "Hi there! I'm your mental health assistant. How are you feeling today? I'm here to listen and provide support. Remember, I'm not a replacement for professional mental health care.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleEmotionDetected = (emotion: string) => {
    setCurrentEmotion(emotion)
    // Add emotion-based response if no user input is present
    if (!input.trim() && emotion !== currentEmotion) {
      const emotionResponses: Record<string, string> = {
        happy: "I notice you're looking happy! That's wonderful. Would you like to talk about what's making you feel good?",
        sad: "I notice you seem sad. I'm here to listen if you'd like to talk about what's troubling you.",
        angry: "I notice you appear to be angry. Would you like to talk about what's causing these feelings?",
        fearful: "I notice you seem anxious or fearful. Remember to take deep breaths. Would you like to discuss what's causing these feelings?",
        disgusted: "I notice you seem uncomfortable. Would you like to talk about what's bothering you?",
        surprised: "I notice you seem surprised. Is there something unexpected that happened?",
        neutral: "I'm here to listen and support you. How are you feeling today?",
      }

      const response = emotionResponses[emotion] || "I'm here to listen and support you. How are you feeling today?"
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate response delay for a more natural feel
    setTimeout(() => {
      const response = getResponseForMessage(input.trim(), messages, currentEmotion)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card className="h-[80vh] flex flex-col">
            <CardHeader>
              <CardTitle>Mental Health Assistant</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto pb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                      <Avatar className="h-8 w-8">
                        {message.role === "user" ? (
                          <>
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          </>
                        ) : (
                          <>
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          </>
                        )}
                      </Avatar>
                      <div
                        className={`rounded-lg p-4 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-grow"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
        <div className="md:col-span-1">
          <FacialRecognition onEmotionDetected={handleEmotionDetected} />
        </div>
      </div>
    </div>
  )
}

