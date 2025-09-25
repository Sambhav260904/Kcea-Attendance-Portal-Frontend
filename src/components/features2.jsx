import { Card, CardContent } from "./ui/card"
import { Camera, ClipboardCheck, BarChart3 } from "lucide-react"

export function Features2() {
  const features = [
    {
      title: "Real-time Facial Recognition",
      description: "Verify your identity instantly using advanced face detection technology.",
      icon: <Camera className="h-8 w-8 text-pink-600" />,
    },
    {
      title: "Attendance Management",
      description: "Easily mark, view, and manage your daily attendance records with a simple interface.",
      icon: <ClipboardCheck className="h-8 w-8 text-green-600" />,
    },
    {
      title: "Advanced Analytics",
      description: "Visualize trends and insights through interactive dashboards and detailed reports.",
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
    },
  ]

  return (
    <section className="py-16 bg-blue-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-blue-500"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-blue-100 rounded-full">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
