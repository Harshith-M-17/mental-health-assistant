import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MoodTracker } from "@/components/mood-tracker"
import { ArrowRight, Brain, Heart, MessageCircle } from "lucide-react"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="flex flex-col items-center text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          AI Mental Health <span className="text-primary">Assistant</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          A supportive companion to help you navigate your mental health journey with personalized guidance and
          resources.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/chat">
              Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/resources">Browse Resources</Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6 flex flex-col items-center text-center">
          <MessageCircle className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Supportive Conversations</h2>
          <p className="text-muted-foreground">
            Chat with an assistant trained to provide empathetic and helpful mental health support.
          </p>
        </Card>
        <Card className="p-6 flex flex-col items-center text-center">
          <Brain className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Coping Strategies</h2>
          <p className="text-muted-foreground">
            Learn evidence-based techniques to manage stress, anxiety, and improve your overall wellbeing.
          </p>
        </Card>
        <Card className="p-6 flex flex-col items-center text-center">
          <Heart className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Mood Tracking</h2>
          <p className="text-muted-foreground">
            Monitor your emotional patterns over time to gain insights into your mental health journey.
          </p>
        </Card>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Track Your Mood</h2>
        <MoodTracker />
      </section>
    </main>
  )
}

