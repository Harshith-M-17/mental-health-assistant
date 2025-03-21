import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Mental Health Resources</h1>

      <Tabs defaultValue="crisis">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="crisis">Crisis Support</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="apps">Apps</TabsTrigger>
        </TabsList>

        <TabsContent value="crisis" className="mt-6">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Crisis Helplines</CardTitle>
                <CardDescription>Immediate support for mental health emergencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ResourceItem
                  title="National Suicide Prevention Lifeline"
                  description="24/7, free and confidential support for people in distress"
                  contact="1-800-273-8255"
                  link="https://suicidepreventionlifeline.org/"
                />
                <ResourceItem
                  title="Crisis Text Line"
                  description="Text HOME to 741741 to connect with a Crisis Counselor"
                  contact="Text HOME to 741741"
                  link="https://www.crisistextline.org/"
                />
                <ResourceItem
                  title="SAMHSA's National Helpline"
                  description="Treatment referral and information service for individuals facing mental health or substance use disorders"
                  contact="1-800-662-4357"
                  link="https://www.samhsa.gov/find-help/national-helpline"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="articles" className="mt-6">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Educational Articles</CardTitle>
                <CardDescription>Learn more about mental health topics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ResourceItem
                  title="Understanding Anxiety"
                  description="Learn about the different types of anxiety disorders and treatment options"
                  link="https://www.nimh.nih.gov/health/topics/anxiety-disorders"
                />
                <ResourceItem
                  title="Depression Basics"
                  description="Information about depression symptoms, causes, and treatments"
                  link="https://www.nimh.nih.gov/health/publications/depression"
                />
                <ResourceItem
                  title="Stress Management Techniques"
                  description="Evidence-based strategies for managing stress in daily life"
                  link="https://www.apa.org/topics/stress/tips"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="exercises" className="mt-6">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Mental Health Exercises</CardTitle>
                <CardDescription>Practical techniques to improve your mental wellbeing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ResourceItem
                  title="5-Minute Mindfulness Meditation"
                  description="A quick meditation practice to center yourself during stressful moments"
                  link="https://www.mindful.org/a-five-minute-breathing-meditation/"
                />
                <ResourceItem
                  title="Progressive Muscle Relaxation"
                  description="Technique to reduce physical tension associated with stress and anxiety"
                  link="https://www.verywellmind.com/how-do-i-practice-progressive-muscle-relaxation-3024400"
                />
                <ResourceItem
                  title="Gratitude Journaling Exercise"
                  description="Simple daily practice to improve mood and outlook"
                  link="https://ggia.berkeley.edu/practice/gratitude_journal"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="apps" className="mt-6">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Apps</CardTitle>
                <CardDescription>Mobile applications to support your mental health journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ResourceItem
                  title="Headspace"
                  description="Guided meditation and mindfulness practices"
                  link="https://www.headspace.com/"
                />
                <ResourceItem
                  title="Calm"
                  description="Sleep stories, meditation, and relaxation exercises"
                  link="https://www.calm.com/"
                />
                <ResourceItem
                  title="Woebot"
                  description="AI-powered chatbot for cognitive behavioral therapy techniques"
                  link="https://woebothealth.com/"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ResourceItem({
  title,
  description,
  contact,
  link,
}: {
  title: string
  description: string
  contact?: string
  link: string
}) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          {contact && <p className="text-sm font-medium mt-2">{contact}</p>}
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline flex items-center text-sm"
        >
          Visit <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>
    </div>
  )
}

