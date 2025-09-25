"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "./ui/card"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import user from "../assets/user.jpg"
export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      quote:
        "KCEA Attendance Portal is just awesome. It contains numerous features and pages starting from login screen to complex dashboard. Perfect choice for your smart attendance site.",
      name: "Sambhav Rawani",
      role: "22B41A05A3",
      avatar: user,
    },
    {
      quote:
        "The facial recognition feature is incredibly accurate and makes taking attendance so much easier. No more manual roll calls or paper sheets. This system has saved us hours every week!",
      name: "Priya Sharma",
      role: "22B41A05C2",
      avatar: user,
    },
    {
      quote:
        "As a department head, I can now track attendance patterns across different classes with ease. The analytics dashboard provides valuable insights that help us improve student engagement.",
      name: "Dr. Rajesh Kumar",
      role: "Professor, CSE Department",
      avatar: user,
    },
    {
      quote:
        "The mobile responsiveness of this portal is impressive. I can mark my attendance or check my records from anywhere, even on the go. The UI is intuitive and user-friendly.The design is clean and modern.",
      name: "Amit Singh",
      role: "22B41A05D4",
      avatar: user,
    },
  ]

  // Auto-advance slides
  useEffect(() => {
    let interval
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1))
      }, 3000) // Change slide every 5 seconds
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  // Pause auto-play when user interacts with controls
  const handleManualNavigation = (index) => {
    setActiveIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    handleManualNavigation(activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1)
  }

  const prevSlide = () => {
    handleManualNavigation(activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1)
  }

  return (
    <section className="mt-12 mb-16">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">What Our Users Say</h2>

      <div className="max-w-4xl mx-auto relative">
        {/* Carousel container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <Card className="max-w-4xl mx-auto shadow-lg bg-gradient-to-br from-blue-50 to-white">
                        <CardContent className="p-8">
                          <div className="flex justify-center mb-6">
                            <div className="p-3 bg-blue-100 rounded-full">
                              <Quote className="h-8 w-8 text-blue-600" />
                            </div>
                          </div>
                
                          <blockquote className="text-center">
                            <p className="text-xl md:text-2xl font-medium text-gray-900 mb-8">
                                "{testimonial.quote}"
                            </p>
                
                            <div className="flex items-center justify-center mt-6">
                              <div className="mr-4">
                                <img
                                  src={testimonial.avatar || "/placeholder.svg?height=48&width=48"}
                                  width={48}
                                  height={48}
                                  alt="User profile"
                                  className="rounded-full border-2 border-blue-500"
                                />
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-gray-900">{testimonial.name}</div>
                                <div className="text-sm text-gray-500">{testimonial.role}</div>
                              </div>
                            </div>
                          </blockquote>
                        </CardContent>
                      </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons - centered on left and right */}
        {/* <div className="absolute inset-y-0 left-0 flex items-center justify-center">
          <Button
            variant="outline"
            size="icon"
            className="bg-white shadow-md hover:bg-blue-50 z-10 rounded-full"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5 text-blue-600" />
          </Button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center justify-center">
          <Button
            variant="outline"
            size="icon"
            className="bg-white shadow-md hover:bg-blue-50 z-10 rounded-full"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5 text-blue-600" />
          </Button>
        </div> */}

        {/* Dots indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleManualNavigation(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? "bg-blue-600" : "bg-gray-300 hover:bg-blue-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
