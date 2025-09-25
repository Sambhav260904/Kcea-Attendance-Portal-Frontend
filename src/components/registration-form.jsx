// components/registration-form.jsx
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { User, BookOpen, GraduationCap, School, LogIn } from "lucide-react"
import logo from "../assets/logo.png"
import { Button } from "./ui/button"
import {
  Card, CardContent, CardFooter, CardHeader, CardTitle
} from "./ui/card"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "./ui/form"
import { Input } from "./ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "./ui/select"
import { AdminButton } from "./admin-button"
import { toast } from "sonner"
import axios from "axios"
// import api from "../api"
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  rollNumber: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10}$/, {
    message: "Roll number must be exactly 10 alphanumeric characters.",
  }),
  branch: z.string({ required_error: "Please select a branch." }),
  year: z.string({ required_error: "Please select a year of study." }),
})

export function RegistrationForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rollNumber: "",
      branch: "",
      year: "",
    },
  })

  async function onSubmit(values) {
    setIsLoading(true)

    try {
      const res = await axios.post("https://kcea-attendance-portal-backend.onrender.com/api/student/check", {
        rollNumber: values.rollNumber,
      })

      const result = res.data
      // console.log("Check user result:", result)

      if (result.exists) {
        toast.error("The given roll number is already registered.")
      } else {
        toast.success("Redirecting to registration...")
        navigate(`/face-registration?rollNumber=${values.rollNumber}&name=${values.name}&branch=${values.branch}&year=${values.year}`)
      }
    } catch (error) {
      console.error("Error checking user:", error)
      toast.error("Error checking user. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-start px-4 py-6 min-h-screen lg:py-0 bg-gray-50 overflow-x-hidden sm:justify-center">
      <div className="flex items-center mb-2 text-2xl font-semibold text-gray-900">
        <img src={logo} width={80} height={80} alt="KCEA Logo" className="mr-2" />
        <span>KCEA Attendance Portal</span>
      </div>

      <Card className="w-full max-w-md shadow-lg bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl md:text-2xl">Register Your Face</CardTitle>
          <AdminButton />
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-blue-500" />
                      <Input placeholder="Enter your name" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Roll Number */}
              <FormField control={form.control} name="rollNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Roll Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-2.5 h-5 w-5 text-green-500" />
                      <Input
                        placeholder="Enter your roll number"
                        className="pl-10 uppercase"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Branch & Year */}
              <div className="grid grid-cols-1 gap-4">
                <FormField control={form.control} name="branch" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <School className="absolute left-3 top-2.5 h-5 w-5 text-purple-500 z-10" />
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="pl-10 w-full">
                            <SelectValue placeholder="Select your branch" />
                          </SelectTrigger>
                          <SelectContent className="z-10 bg-gray-50 border-purple-500 ">
                            <SelectItem value="cse">CSE</SelectItem>
                            <SelectItem value="ece">ECE</SelectItem>
                            <SelectItem value="eee">EEE</SelectItem>
                            <SelectItem value="civil">CIVIL</SelectItem>
                            <SelectItem value="mech">MECH</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="year" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-2.5 h-5 w-5 text-orange-500 z-10" />
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="pl-10 w-full">
                            <SelectValue placeholder="Select your year" />
                          </SelectTrigger>
                          <SelectContent className="z-10 bg-gray-50 border-orange-500 ">
                            <SelectItem value="1">First Year</SelectItem>
                            <SelectItem value="2">Second Year</SelectItem>
                            <SelectItem value="3">Third Year</SelectItem>
                            <SelectItem value="4">Fourth Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full mt-4 bg-blue-500 text-white" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Verify & Register
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-center w-full text-gray-700">
            Already Registered your face?{" "}
            <Link to="/" className="font-medium text-blue-600 hover:underline">
              Get Started
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
