import { Card, CardContent } from "./ui/card"
import { Quote } from "lucide-react"
import user from "../assets/user.jpg"
export function Testimonial() {
  return (
    <section className="mt-12 mb-16">
      <Card className="max-w-4xl mx-auto shadow-lg bg-gradient-to-br from-blue-50 to-white">
        <CardContent className="p-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-100 rounded-full">
              <Quote className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <blockquote className="text-center">
            <p className="text-xl md:text-2xl font-medium text-gray-900 mb-8">
              "KCEA Attendance Portal is just awesome. It contains numerous features and pages starting from login
              screen to complex dashboard. Perfect choice for your smart attendance site."
            </p>

            <div className="flex items-center justify-center mt-6">
              <div className="mr-4">
                <img
                  src={user}
                  width={48}
                  height={48}
                  alt="User profile"
                  className="rounded-full border-2 border-blue-500"
                />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Sambhav Rawani</div>
                <div className="text-sm text-gray-500">22B41A05A3</div>
              </div>
            </div>
          </blockquote>
        </CardContent>
      </Card>
    </section>
  )
}
