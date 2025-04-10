import { predefinedResponses } from "./predefined-responses"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

// Simple keyword-based response matching
export function getResponseForMessage(
  message: string,
  conversationHistory: Message[],
  currentEmotion: string | null = null
): string {
  const lowercaseMessage = message.toLowerCase()

  // Check for crisis keywords first
  const crisisKeywords = ["suicide", "kill myself", "end my life", "want to die", "harm myself"]
  for (const keyword of crisisKeywords) {
    if (lowercaseMessage.includes(keyword)) {
      return predefinedResponses.crisis
    }
  }

  // If emotion is detected and message is short, prioritize emotion-based response
  if (currentEmotion && message.length < 50) {
    const emotionResponses: Record<string, string> = {
      happy: "I'm glad you're feeling happy! Would you like to talk about what's making you feel good?",
      sad: "I notice you seem sad. I'm here to listen if you'd like to talk about what's troubling you.",
      angry: "I notice you appear to be angry. Would you like to talk about what's causing these feelings?",
      fearful: "I notice you seem anxious or fearful. Remember to take deep breaths. Would you like to discuss what's causing these feelings?",
      disgusted: "I notice you seem uncomfortable. Would you like to talk about what's bothering you?",
      surprised: "I notice you seem surprised. Is there something unexpected that happened?",
      neutral: "I'm here to listen and support you. How are you feeling today?",
    }
    return emotionResponses[currentEmotion] || predefinedResponses.default
  }

  // Check for greetings
  const greetingKeywords = ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"]
  for (const keyword of greetingKeywords) {
    if (lowercaseMessage === keyword || lowercaseMessage.startsWith(keyword + " ")) {
      return predefinedResponses.greeting
    }
  }

  // Check for gratitude
  const gratitudeKeywords = ["thank you", "thanks", "appreciate", "grateful"]
  for (const keyword of gratitudeKeywords) {
    if (lowercaseMessage.includes(keyword)) {
      return predefinedResponses.gratitude
    }
  }

  // Check for feeling-related keywords
  if (lowercaseMessage.includes("anxious") || lowercaseMessage.includes("anxiety")) {
    return predefinedResponses.anxiety
  }

  if (lowercaseMessage.includes("depress") || lowercaseMessage.includes("sad")) {
    return predefinedResponses.depression
  }

  if (lowercaseMessage.includes("stress") || lowercaseMessage.includes("overwhelm")) {
    return predefinedResponses.stress
  }

  if (
    lowercaseMessage.includes("sleep") ||
    lowercaseMessage.includes("insomnia") ||
    lowercaseMessage.includes("tired")
  ) {
    return predefinedResponses.sleep
  }

  if (lowercaseMessage.includes("meditat") || lowercaseMessage.includes("mindful")) {
    return predefinedResponses.mindfulness
  }

  // Check for questions about the assistant
  if (
    lowercaseMessage.includes("who are you") ||
    lowercaseMessage.includes("what are you") ||
    lowercaseMessage.includes("how do you work")
  ) {
    return predefinedResponses.aboutAssistant
  }

  // Check for help requests
  if (
    lowercaseMessage.includes("help") ||
    lowercaseMessage.includes("advice") ||
    lowercaseMessage.includes("suggestion")
  ) {
    return predefinedResponses.helpRequest
  }

  // Check for feeling questions
  if (lowercaseMessage.includes("how are you") || lowercaseMessage.includes("how do you feel")) {
    return predefinedResponses.howAreYou
  }

  // Check for feeling statements
  if (
    lowercaseMessage.includes("i feel ") ||
    lowercaseMessage.includes("feeling ") ||
    lowercaseMessage.includes("i am ") ||
    lowercaseMessage.includes("i'm ")
  ) {
    // Check for positive feelings
    const positiveKeywords = ["good", "great", "happy", "better", "awesome", "amazing", "excellent"]
    for (const keyword of positiveKeywords) {
      if (lowercaseMessage.includes(keyword)) {
        return predefinedResponses.positiveFeeling
      }
    }

    // Check for negative feelings
    const negativeKeywords = ["bad", "terrible", "awful", "worse", "horrible", "miserable"]
    for (const keyword of negativeKeywords) {
      if (lowercaseMessage.includes(keyword)) {
        return predefinedResponses.negativeFeeling
      }
    }
  }

  // Check for exercise related questions
  if (
    lowercaseMessage.includes("exercise") ||
    lowercaseMessage.includes("physical activity") ||
    lowercaseMessage.includes("workout")
  ) {
    return predefinedResponses.exercise
  }

  // Check for nutrition related questions
  if (
    lowercaseMessage.includes("food") ||
    lowercaseMessage.includes("nutrition") ||
    lowercaseMessage.includes("diet") ||
    lowercaseMessage.includes("eat")
  ) {
    return predefinedResponses.nutrition
  }

  // Check for social support related questions
  if (
    lowercaseMessage.includes("friend") ||
    lowercaseMessage.includes("family") ||
    lowercaseMessage.includes("relationship") ||
    lowercaseMessage.includes("social")
  ) {
    return predefinedResponses.socialSupport
  }

  // Check for work/school stress
  if (
    lowercaseMessage.includes("work") ||
    lowercaseMessage.includes("job") ||
    lowercaseMessage.includes("school") ||
    lowercaseMessage.includes("study") ||
    lowercaseMessage.includes("college")
  ) {
    return predefinedResponses.workSchoolStress
  }

  // Check for therapy related questions
  if (
    lowercaseMessage.includes("therapy") ||
    lowercaseMessage.includes("therapist") ||
    lowercaseMessage.includes("counseling") ||
    lowercaseMessage.includes("counselor") ||
    lowercaseMessage.includes("psychologist") ||
    lowercaseMessage.includes("psychiatrist")
  ) {
    return predefinedResponses.therapy
  }

  // Check for medication related questions
  if (
    lowercaseMessage.includes("medication") ||
    lowercaseMessage.includes("medicine") ||
    lowercaseMessage.includes("drug") ||
    lowercaseMessage.includes("prescription")
  ) {
    return predefinedResponses.medication
  }

  // Check for self-care related questions
  if (
    lowercaseMessage.includes("self-care") ||
    lowercaseMessage.includes("self care") ||
    lowercaseMessage.includes("take care of myself")
  ) {
    return predefinedResponses.selfCare
  }

  // Check for relaxation techniques
  if (
    lowercaseMessage.includes("relax") ||
    lowercaseMessage.includes("calm down") ||
    lowercaseMessage.includes("breathing") ||
    lowercaseMessage.includes("technique")
  ) {
    return predefinedResponses.relaxationTechniques
  }

  // Check for panic attack related questions
  if (lowercaseMessage.includes("panic attack") || lowercaseMessage.includes("panic")) {
    return predefinedResponses.panicAttack
  }

  // Check for trauma related questions
  if (
    lowercaseMessage.includes("trauma") ||
    lowercaseMessage.includes("ptsd") ||
    lowercaseMessage.includes("traumatic")
  ) {
    return predefinedResponses.trauma
  }

  // Check for goodbye
  const goodbyeKeywords = ["bye", "goodbye", "see you", "talk to you later", "farewell"]
  for (const keyword of goodbyeKeywords) {
    if (lowercaseMessage.includes(keyword)) {
      return predefinedResponses.goodbye
    }
  }

  // Default response if no specific match is found
  return predefinedResponses.default
}

