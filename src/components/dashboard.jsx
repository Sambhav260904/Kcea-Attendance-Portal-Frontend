"use client"

import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Camera, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, CartesianGrid, LabelList, XAxis } from "recharts"
import axios from "axios"
import { toast } from "sonner"
import * as faceapi from "face-api.js"

export function Dashboard() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const [status, setStatus] = useState("Loading face-api models...")
  const [isMarked, setIsMarked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showCamera, setShowCamera] = useState(true)
  const [storedDescriptor, setStoredDescriptor] = useState(null)
  const storedDescriptorRef = useRef(null)
  const [showButton, setShowButton] = useState(false)

  const attendanceData = [
    { day: "Mon", students: 24 },
    { day: "Tue", students: 28 },
    { day: "Wed", students: 30 },
    { day: "Thu", students: 25 },
    { day: "Fri", students: 27 },
    { day: "Sat", students: 22 },
  ]

  const chartConfig = {
    students: {
      label: "Students Present",
      color: "#3b82f6",
    },
  }

  useEffect(() => {
    storedDescriptorRef.current = storedDescriptor
  }, [storedDescriptor])

  const loadModels = async () => {
    const MODEL_URL = "http://localhost:3000/models"
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ])
      setStatus("Models loaded. Starting camera...")
    } catch (err) {
      console.error("Error loading face-api models:", err)
      setStatus("Failed to load models")
    }
  }

  const fetchStoredDescriptor = async (rollNumber) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/student/getStudent?rollNumber=${rollNumber}`)
      if (res.data?.faceDescriptor) {
        setStoredDescriptor(new Float32Array(res.data.faceDescriptor))
      } else {
        setStatus("No face data found. Please register first.")
        setShowCamera(false)
      }
    } catch (error) {
      console.error("Failed to fetch descriptor:", error)
      setStatus("Error fetching face data")
      setShowCamera(false)
    }
  }

  const startRecognition = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const rollNumber = urlParams.get("rollNumber")
    if (!rollNumber) return setStatus("Roll number missing in URL")

    try {
      const res = await axios.get(`http://localhost:3000/api/attendance/status?rollNumber=${rollNumber}`)
      if (res.data.present) {
        setStatus("Attendance already marked today.")
        setIsMarked(true)
        setShowCamera(false)
        return
      }
    } catch (err) {
      console.error("Attendance check error:", err)
    }

    await fetchStoredDescriptor(rollNumber)
    await loadModels()

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      } else {
        console.warn("videoRef not ready")
        setStatus("Camera element not ready. Please refresh.")
        return
      }
    } catch (error) {
      console.error("Camera access error:", error)
      setStatus("Camera access denied")
      return
    }

    const interval = setInterval(async () => {
      try {
        const detection = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor()

        if (detection && storedDescriptorRef.current) {
          const distance = faceapi.euclideanDistance(detection.descriptor, storedDescriptorRef.current)
          if (distance < 0.5) {
            clearInterval(interval)
            stopVideo()
            setShowButton(true)
            setStatus("Face recognized. Click to mark attendance")
          }
        }
      } catch (err) {
        console.error("Face detection error:", err)
      }
    }, 1000)
  }

  const stopVideo = () => {
    const stream = videoRef.current?.srcObject
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    setShowCamera(false)
  }

  const markAttendance = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const rollNumber = urlParams.get("rollNumber")
    setIsLoading(true)
    try {
      const res = await axios.post("http://localhost:3000/api/attendance/mark-attendance", { rollNumber })
      if (res.data.success) {
        toast.success("Attendance marked successfully!")
        setIsMarked(true)
        setStatus("Attendance marked!")
      } else {
        toast.warning(res.data.message || "Already marked")
        setStatus(res.data.message || "Already marked")
      }
    } catch (err) {
      console.error("Error marking attendance:", err)
      toast.error("Server error")
      setStatus("Server error")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      startRecognition()
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col items-center gap-10">
      {/* Status Bar */}
      <div
        className={`px-4 py-2 rounded-md flex items-center gap-2 justify-center w-full max-w-2xl text-center text-lg font-bold
        ${status.includes("successfully")
            ? "text-green-600 border-2 border-green-600 bg-green-50"
            : status.includes("Ready")
              ? "text-blue-600 border-2 border-blue-600 bg-blue-50"
              : status.includes("Processing")
                ? "text-yellow-600 border-2 border-yellow-600 bg-yellow-50"
                : "text-gray-600 border-2 border-gray-600 bg-gray-50"
          }`}
      >
        {status.includes("successfully") ? (
          <CheckCircle className="h-5 w-5 text-green-600" />
        ) : status.includes("denied") ? (
          <AlertCircle className="h-5 w-5 text-red-600" />
        ) : status.includes("Processing") ? (
          <Loader2 className="h-5 w-5 animate-spin text-yellow-600" />
        ) : (
          <Camera className="h-5 w-5 text-blue-600" />
        )}
        {status}
      </div>

      {/* Content Block */}
      <div className={`w-full flex flex-col ${isMarked ? "items-center" : "lg:flex-row"} justify-center gap-10`}>
        {/* Left Section (Video) */}
        {!isMarked && (
          <div className="flex flex-col items-center text-center w-full lg:w-1/2">
            <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] mb-6">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline
                  className="object-cover w-full h-full" 
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Camera className="w-16 h-16 text-white opacity-30" />
              </div>
            </div>

            {showButton && (
              <Button
                onClick={markAttendance}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium shadow-md transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Camera className="mr-2 h-4 w-4 text-white" />
                    Mark Attendance
                  </>
                )}
              </Button>
            )}
          </div>
        )}

        {/* Right Section (Chart) */}
        <Card className="w-full max-w-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
          <CardHeader>
            <CardTitle className="flex justify-center">Weekly Attendance Report</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={attendanceData} margin={{ top: 20 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="students" fill="#3b82f6" radius={8}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground font-semibold"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
            <br />
            <CardDescription className="flex justify-center">
              Number of Students Present (Mon - Sat)
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}