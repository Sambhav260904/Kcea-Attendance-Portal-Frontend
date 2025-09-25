"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Download, Calendar, User } from "lucide-react"

export function DownloadSection() {
  const [rollNumber, setRollNumber] = useState("22B41A05A3")
  const [isDateLoading, setIsDateLoading] = useState(false)
  const [isRollLoading, setIsRollLoading] = useState(false)

  const handleDownloadCSV = () => {
    setIsDateLoading(true)
    const selectedDate = document.getElementById("csvDatePicker")?.value
    let url = "https://kcea-attendance-portal-backend.onrender.com/api/attendance/downloadAttendanceCSV"
    if (selectedDate) {
      url += `?date=${selectedDate}`
    }

    // Simulate download delay
    setTimeout(() => {
      window.location.href = url
      setIsDateLoading(false)
    }, 1000)
  }

  const handleDownloadCompleteCSV = () => {
    setIsRollLoading(true)
    // Simulate download delay
    setTimeout(() => {
      const url = `https://kcea-attendance-portal-backend.onrender.com/api/attendance/downloadCompleteAttendanceCSV?rollNumber=${rollNumber}`
      window.location.href = url
      setIsRollLoading(false)
    }, 1000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CSV Download Section: Specific Date */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="mb-4 p-3 bg-blue-100 rounded-full">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">Download Present Students Data</h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-md">
                <Input
                  id="csvDatePicker"
                  type="date"
                  className="border border-gray-300 rounded px-2 py-1"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
                <Button
                  onClick={handleDownloadCSV}
                  disabled={isDateLoading}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isDateLoading ? (
                    <span className="flex items-center">
                      <Download className="mr-2 h-4 w-4 animate-pulse text-white" />
                      Downloading...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Download className="mr-2 h-4 w-4 text-white" />
                      Download CSV
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CSV Download Section: Complete Attendance */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="mb-4 p-3 bg-blue-100 rounded-full">
                <User className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">Download Complete Attendance Record</h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-md">
                <Input
                  type="text"
                  placeholder="Enter roll number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <Button
                  onClick={handleDownloadCompleteCSV}
                  disabled={isRollLoading || !rollNumber}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isRollLoading ? (
                    <span className="flex items-center">
                      <Download className="mr-2 h-4 w-4 animate-pulse text-white" />
                      Downloading...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Download className="mr-2 h-4 w-4 text-white" />
                      Download CSV
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
