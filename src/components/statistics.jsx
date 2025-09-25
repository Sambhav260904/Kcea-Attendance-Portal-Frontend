import { Card, CardContent } from "./ui/card"
import { Percent, Calendar, Clock } from "lucide-react"

export function Statistics() {
  const stats = [
    {
      value: "85%",
      label: "Attendance Rate",
      icon: <Percent className="h-8 w-8 text-green-600" />,
    },
    {
      value: "90",
      label: "Total Days",
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
    },
    {
      value: "18",
      label: "Days Absent",
      icon: <Clock className="h-8 w-8 text-red-600" />,
    },
  ]

  return (
    <section className="py-16 bg-blue-50" id="stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-12">Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-blue-100 rounded-full">{stat.icon}</div>
                <p className="text-4xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
