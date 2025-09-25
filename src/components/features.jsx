import { Card, CardContent } from "./ui/card"
import { Camera, ClipboardCheck, BarChart3 } from "lucide-react"

export function Features() {
  const features = [
    {
      title: "Real-time Facial Recognition",
      description: "Instantly verify your identity with cutting-edge face detection technology.",
      icon: <Camera className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Attendance Management",
      description: "Easily mark and manage your daily attendance with a user-friendly interface.",
      icon: <ClipboardCheck className="h-8 w-8 text-green-600" />,
    },
    {
      title: "Advanced Analytics",
      description: "Gain insights into your attendance trends with interactive charts and reports.",
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
    },
  ]

  return (
    <section className="mt-12 " id="features">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-white">
        {features.map((feature, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-blue-100 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{feature.title}</h3>
                <p className="text-gray-80">{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
