"use client"

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Script from 'next/script'

interface FacialRecognitionProps {
  onEmotionDetected: (emotion: string) => void
}

// Define a more specific type for face-api.js
interface FaceAPI {
  nets: {
    tinyFaceDetector: {
      loadFromUri: (uri: string) => Promise<void>
    }
    faceExpressionNet: {
      loadFromUri: (uri: string) => Promise<void>
    }
  }
  detectSingleFace: (
    input: HTMLVideoElement,
    options: any
  ) => {
    withFaceExpressions: () => Promise<{
      expressions: Record<string, number>
    }>
  }
  TinyFaceDetectorOptions: new (options?: { inputSize?: number; scoreThreshold?: number }) => any
}

declare global {
  interface Window {
    faceapi: FaceAPI
  }
}

export function FacialRecognition({ onEmotionDetected }: FacialRecognitionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isStreamActive, setIsStreamActive] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [debugMessage, setDebugMessage] = useState<string>("Initializing...")
  const [currentEmotion, setCurrentEmotion] = useState<string>("")
  const [emotionScores, setEmotionScores] = useState<Record<string, number>>({})

  // Load face-api.js from CDN
  useEffect(() => {
    console.log("Setting up face-api.js...")
    setDebugMessage("Loading face-api.js script...")
    
    if (typeof window !== 'undefined' && !window.faceapi) {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js'
      script.async = true
      script.onload = () => {
        console.log("face-api.js script loaded successfully")
        setDebugMessage("face-api.js loaded, loading models...")
        setIsScriptLoaded(true)
        loadModels()
      }
      script.onerror = (error) => {
        console.error("Error loading face-api.js script:", error)
        setDebugMessage("Error loading face-api.js script")
      }
      document.head.appendChild(script)
    } else if (window.faceapi) {
      console.log("face-api.js already available")
      setDebugMessage("face-api.js already available, loading models...")
      setIsScriptLoaded(true)
      loadModels()
    }
  }, [])

  const loadModels = async () => {
    if (!window.faceapi) {
      console.error("face-api.js not available")
      setDebugMessage("face-api.js not available")
      return
    }

    try {
      console.log("Loading face-api.js models...")
      setDebugMessage("Loading face detection models...")
      
      await Promise.all([
        window.faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        window.faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ])
      
      console.log("Models loaded successfully")
      setDebugMessage("Models loaded successfully")
      setIsModelLoaded(true)
    } catch (error) {
      console.error('Error loading face-api models:', error)
      setDebugMessage(`Error loading models: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const startVideo = async () => {
    try {
      console.log("Requesting camera access...")
      setDebugMessage("Requesting camera access...")
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: "user"
        } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreamActive(true)
        console.log("Camera started successfully")
        setDebugMessage("Camera started successfully")
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      setDebugMessage(`Error accessing camera: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
      setIsStreamActive(false)
      console.log("Camera stopped")
      setDebugMessage("Camera stopped")
    }
  }

  const detectFace = async () => {
    if (!videoRef.current || !isModelLoaded || !window.faceapi) {
      console.log("Cannot detect face: video not ready or models not loaded")
      return
    }

    try {
      // Create options with the correct configuration
      const options = new window.faceapi.TinyFaceDetectorOptions({
        inputSize: 320,
        scoreThreshold: 0.3
      })
      
      const detections = await window.faceapi
        .detectSingleFace(videoRef.current, options)
        .withFaceExpressions()

      if (detections) {
        const expressions = detections.expressions
        setEmotionScores(expressions)
        
        // Log all emotion scores for debugging
        console.log("Emotion scores:", expressions)
        
        // Find the dominant emotion
        const dominantEmotion = Object.entries(expressions).reduce((a, b) => 
          a[1] > b[1] ? a : b
        )[0]
        
        // Only update if the emotion has changed significantly
        if (dominantEmotion !== currentEmotion) {
          console.log(`Detected emotion: ${dominantEmotion} (score: ${expressions[dominantEmotion].toFixed(2)})`)
          setCurrentEmotion(dominantEmotion)
          onEmotionDetected(dominantEmotion)
          
          // Update debug message with current emotion
          setDebugMessage(`Current emotion: ${dominantEmotion} (${(expressions[dominantEmotion] * 100).toFixed(0)}%)`)
        }
      } else {
        console.log("No face detected")
        setDebugMessage("No face detected")
      }
    } catch (error) {
      console.error("Error detecting face:", error)
      setDebugMessage(`Error detecting face: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isStreamActive && isModelLoaded) {
      console.log("Starting face detection interval")
      interval = setInterval(detectFace, 1000) // Increased detection frequency
    }

    return () => {
      if (interval) {
        clearInterval(interval)
        console.log("Stopped face detection interval")
      }
    }
  }, [isStreamActive, isModelLoaded])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full rounded-lg"
            style={{ display: isStreamActive ? 'block' : 'none' }}
          />
          {!isStreamActive && (
            <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Camera is off</p>
            </div>
          )}
          <div className="mt-4 flex justify-center gap-2">
            {!isStreamActive ? (
              <Button onClick={startVideo} disabled={!isModelLoaded || !isScriptLoaded}>
                Start Camera
              </Button>
            ) : (
              <Button onClick={stopVideo} variant="destructive">
                Stop Camera
              </Button>
            )}
          </div>
          <div className="mt-2 text-xs text-center text-muted-foreground">
            {debugMessage}
          </div>
          {isStreamActive && currentEmotion && (
            <div className="mt-2 p-2 bg-muted rounded text-xs">
              <p className="font-semibold">Current Emotion: {currentEmotion}</p>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {Object.entries(emotionScores).map(([emotion, score]) => (
                  <div key={emotion} className="flex justify-between">
                    <span>{emotion}:</span>
                    <span>{(score * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 