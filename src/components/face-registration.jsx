import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import * as faceapi from "face-api.js"
import axios from "axios"
import { toast } from "sonner"
import { Camera, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import logo from "../assets/logo.png"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Features } from "./features"
import { TestimonialCarousel } from "./testimonial-carousel"

export function FaceRegistration() {
  const navigate = useNavigate()
  const location = useLocation()
  const videoRef = useRef(null)
  const [status, setStatus] = useState("Loading models, please wait...")
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [isButtonVisible, setIsButtonVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const queryParams = new URLSearchParams(location.search)
  const name = queryParams.get("name")
  const rollNumber = queryParams.get("rollNumber")
  const branch = queryParams.get("branch")
  const year = queryParams.get("year")

  useEffect(() => {
    loadModels()
  }, [])

  const loadModels = async () => {
    try {
      // const MODEL_URL = "/models"
      const MODEL_URL = "http://localhost:3000/models"; // Backend URL
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ])
      setStatus("Models loaded. Please position your face.")
      setIsVideoVisible(true)
    } catch (error) {
      console.error("Error loading face-api models:", error)
      setStatus("Failed to load models.")
    }
  }

  useEffect(() => {
    if (isVideoVisible && videoRef.current) {
      startVideo()
    }
  }, [isVideoVisible])

  const startVideo = async () => {
    try {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        videoRef.current.srcObject = stream
        detectFace()
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setStatus("Camera access denied. Please enable camera permissions.")
    }
  }

  const detectFace = async () => {
    const interval = setInterval(async () => {
      if (!videoRef.current) return
      const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor()

      if (detection) {
        clearInterval(interval)
        setIsButtonVisible(true)
        setStatus("Face detected! Click Register.")
      }
    }, 1000)
  }

  const handleRegister = async () => {
    setIsLoading(true)
    setStatus("Processing your face data...")

    try {
      const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor()

      if (!detection) {
        setStatus("No face detected. Please try again.")
        setIsLoading(false)
        return
      }

      const faceDescriptor = Array.from(detection.descriptor)

      console.log("Face Descriptor: ", faceDescriptor)
      console.log(name, rollNumber, branch, year)

      await axios.post("http://localhost:3000/api/student/registerface", {
        name,
        rollNumber,
        branch,
        year,
        faceDescriptor
      })

      setIsLoading(false)
      setIsRegistered(true)
      setStatus("Face registered successfully!")
      toast.success("Face registered successfully!")

      setTimeout(() => {
        navigate(`/dashboard?rollNumber=${rollNumber}`)
      }, 2000)
    } catch (error) {
      console.error("Error during face registration:", error)
      toast.error("Registration failed. Try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 flex-grow">
      <div className="flex flex-col items-center justify-center mt-2">
        <div className="flex items-center mb-6 text-xl font-semibold text-gray-900">
          <img src={logo} width={80} height={80} alt="KCEA Logo" className="mr-2" />
          <span>KCEA Face Registration</span>
        </div>

        <div className={`mb-6 px-4 py-2 rounded-md flex items-center gap-2 ${
          status.includes("successfully")
            ? "text-green-600 border-2 border-green-600 bg-green-50"
            : status.includes("Ready")
              ? "text-blue-600 border-2 border-blue-600 bg-blue-50"
              : status.includes("Processing")
                ? "text-yellow-600 border-2 border-yellow-600 bg-yellow-50"
                : "text-gray-600 border-2 border-gray-600 bg-gray-50"
        }`}>
          {status.includes("successfully") ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : status.includes("denied") ? (
            <AlertCircle className="h-5 w-5 text-red-600" />
          ) : status.includes("Processing") ? (
            <Loader2 className="h-5 w-5 animate-spin text-yellow-600" />
          ) : (
            <Camera className="h-5 w-5 text-blue-600" />
          )}
          <span className="text-lg font-bold">{status}</span>
        </div>

        {isVideoVisible && (
          <div className="relative w-[300px] h-[300px] mb-6">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
              <video ref={videoRef} width="300" height="300" autoPlay muted className="object-cover w-full h-full" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {isRegistered ? (
                <div className="bg-green-500/30 w-full h-full flex items-center justify-center rounded-full">
                  <CheckCircle className="h-20 w-20 text-white" />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-16 h-16 text-white opacity-30" />
                </div>
              )}
            </div>
          </div>
        )}

        {isButtonVisible && (
          <Button size="lg"
            onClick={handleRegister}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium shadow-md transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center">
                <Camera className="mr-2 h-4 w-4 text-white" />
                Register Face
              </span>
            )}
          </Button>
        )}
      </div>


      <Card className="mt-12 shadow-lg hover:shadow-xl transition-all duration-300 bg-white w-1/2 mx-auto flex justify-center"> 
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Keep Smiling!</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Your face is your best asset. Register your face with ease and enjoy seamless attendance management. Stay
            confident, and let your smile shine through!
          </p>
        </CardContent>
      </Card>

      <Features />
      <TestimonialCarousel />
    </div>
  )
}
