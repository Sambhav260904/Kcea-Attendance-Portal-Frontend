"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  User,
  Bell,
  Menu,
  X,
  Home,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Download,
  UserCog,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
  BookOpen,
  Award,
  AlertTriangle,
} from "lucide-react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Select from "react-select"
import { saveAs } from "file-saver"
import * as XLSX from "xlsx"

// UI Components
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Label } from "./ui/label"

export function AdminDashboard() {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)
  const [isManualMarkDialogOpen, setIsManualMarkDialogOpen] = useState(false)
  const [hallTicketNumber, setHallTicketNumber] = useState("")
  const [adminName, setAdminName] = useState("Dr. Rajesh Kumar")

  // Sample student data - in a real app, this would come from an API
  const allStudents = [
    { id: 1, name: "Sambhav Rawani", rollNumber: "22B41A05A3", branch: "CSE", year: "3", status: "Present" },
    { id: 2, name: "Rahul Kumar", rollNumber: "22B41A05B1", branch: "ECE", year: "3", status: "Absent" },
    { id: 3, name: "Priya Sharma", rollNumber: "22B41A05C2", branch: "EEE", year: "3", status: "Present" },
    { id: 4, name: "Amit Singh", rollNumber: "22B41A05D4", branch: "Civil", year: "3", status: "Present" },
    { id: 5, name: "Neha Patel", rollNumber: "22B41A05E5", branch: "Mech", year: "3", status: "Absent" },
    { id: 6, name: "Kiran Reddy", rollNumber: "22B41A05F6", branch: "CSE", year: "2", status: "Present" },
    { id: 7, name: "Ananya Desai", rollNumber: "22B41A05G7", branch: "ECE", year: "2", status: "Absent" },
    { id: 8, name: "Vikram Joshi", rollNumber: "22B41A05H8", branch: "EEE", year: "2", status: "Present" },
    { id: 9, name: "Sneha Gupta", rollNumber: "22B41A05I9", branch: "Civil", year: "2", status: "Present" },
    { id: 10, name: "Rohan Malhotra", rollNumber: "22B41A05J0", branch: "Mech", year: "2", status: "Absent" },
    { id: 11, name: "Divya Sharma", rollNumber: "22B41A05K1", branch: "CSE", year: "1", status: "Present" },
    { id: 12, name: "Arjun Patel", rollNumber: "22B41A05L2", branch: "ECE", year: "1", status: "Absent" },
    { id: 13, name: "Meera Singh", rollNumber: "22B41A05M3", branch: "EEE", year: "1", status: "Present" },
    { id: 14, name: "Rajat Verma", rollNumber: "22B41A05N4", branch: "Civil", year: "1", status: "Present" },
    { id: 15, name: "Kavita Rao", rollNumber: "22B41A05O5", branch: "Mech", year: "1", status: "Absent" },
    { id: 16, name: "Sanjay Kumar", rollNumber: "22B41A05P6", branch: "CSE", year: "4", status: "Present" },
    { id: 17, name: "Pooja Reddy", rollNumber: "22B41A05Q7", branch: "ECE", year: "4", status: "Absent" },
    { id: 18, name: "Aditya Nair", rollNumber: "22B41A05R8", branch: "EEE", year: "4", status: "Present" },
    { id: 19, name: "Nisha Mehta", rollNumber: "22B41A05S9", branch: "Civil", year: "4", status: "Present" },
    { id: 20, name: "Vivek Sharma", rollNumber: "22B41A05T0", branch: "Mech", year: "4", status: "Absent" },
  ]

  // Branch and year options for filters
  const branchOptions = [
    { value: "CSE", label: "Computer Science" },
    { value: "ECE", label: "Electronics & Communication" },
    { value: "EEE", label: "Electrical & Electronics" },
    { value: "Civil", label: "Civil Engineering" },
    { value: "Mech", label: "Mechanical Engineering" },
  ]

  const yearOptions = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" },
  ]

  // Initialize students data
  useEffect(() => {
    setStudents(allStudents)
    setFilteredStudents(allStudents)
  }, [])

  // Filter students based on search query, branch, and year
  useEffect(() => {
    let result = allStudents

    if (searchQuery) {
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedBranch) {
      result = result.filter((student) => student.branch === selectedBranch.value)
    }

    if (selectedYear) {
      result = result.filter((student) => student.year === selectedYear.value)
    }

    setFilteredStudents(result)
  }, [searchQuery, selectedBranch, selectedYear])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleLogout = () => {
    toast.info("Logging out...")
    setTimeout(() => {
      navigate("/")
    }, 1500)
  }

  const handleStatusChange = (id) => {
    const updatedStudents = students.map((student) => {
      if (student.id === id) {
        const newStatus = student.status === "Present" ? "Absent" : "Present"
        toast.success(`${student.name} marked as ${newStatus}`)
        return { ...student, status: newStatus }
      }
      return student
    })

    setStudents(updatedStudents)

    // Update filtered students as well
    const updatedFilteredStudents = filteredStudents.map((student) => {
      if (student.id === id) {
        return { ...student, status: student.status === "Present" ? "Absent" : "Present" }
      }
      return student
    })

    setFilteredStudents(updatedFilteredStudents)
  }

  const handleManualMark = () => {
    if (!hallTicketNumber.trim()) {
      toast.error("Please enter a hall ticket number")
      return
    }

    const studentIndex = students.findIndex(
      (student) => student.rollNumber.toLowerCase() === hallTicketNumber.toLowerCase(),
    )

    if (studentIndex === -1) {
      toast.error("Student not found with this hall ticket number")
      return
    }

    const updatedStudents = [...students]
    updatedStudents[studentIndex].status = "Present"
    setStudents(updatedStudents)

    // Update filtered students as well
    const filteredIndex = filteredStudents.findIndex(
      (student) => student.rollNumber.toLowerCase() === hallTicketNumber.toLowerCase(),
    )

    if (filteredIndex !== -1) {
      const updatedFilteredStudents = [...filteredStudents]
      updatedFilteredStudents[filteredIndex].status = "Present"
      setFilteredStudents(updatedFilteredStudents)
    }

    toast.success(`${updatedStudents[studentIndex].name} marked as Present`)
    setIsManualMarkDialogOpen(false)
    setHallTicketNumber("")
  }

  const handleDownload = () => {
    // Create worksheet from filtered students data
    const worksheet = XLSX.utils.json_to_sheet(
      filteredStudents.map(({ id, ...rest }) => rest), // Remove id from download
    )

    // Create workbook and add the worksheet
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students")

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const data = new Blob([excelBuffer], { type: "application/octet-stream" })

    // Create filename based on filters
    let filename = "students"
    if (selectedBranch) filename += `_${selectedBranch.value}`
    if (selectedYear) filename += `_Year${selectedYear.value}`
    filename += ".xlsx"

    // Save file
    saveAs(data, filename)
    toast.success("File downloaded successfully!")
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedBranch(null)
    setSelectedYear(null)
    toast.info("Filters have been reset")
  }

  // Calculate statistics
  const totalStudents = students.length
  const presentStudents = students.filter((student) => student.status === "Present").length
  const attendanceRate = totalStudents > 0 ? ((presentStudents / totalStudents) * 100).toFixed(1) : 0

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white w-64 fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:inset-auto md:h-screen shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-2">
              FA
            </div>
            <span className="text-lg font-semibold text-gray-900">Face Attendance</span>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <X className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        <div className="p-4">
          <div className="flex flex-col items-center mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <UserCog className="h-8 w-8 text-blue-600" />
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mt-2">{adminName}</h3>
            <p className="text-xs text-gray-500">Super Administrator</p>
          </div>

          <nav className="space-y-1">
            <a href="#" className="flex items-center px-4 py-2 text-gray-900 bg-blue-50 rounded-md">
              <Home className="h-5 w-5 mr-3 text-blue-600" />
              Dashboard
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <Users className="h-5 w-5 mr-3 text-green-600" />
              Students
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <Calendar className="h-5 w-5 mr-3 text-purple-600" />
              Attendance
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <BookOpen className="h-5 w-5 mr-3 text-orange-600" />
              Courses
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <BarChart2 className="h-5 w-5 mr-3 text-red-600" />
              Reports
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <Settings className="h-5 w-5 mr-3 text-gray-600" />
              Settings
            </a>
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden mr-2">
                <Menu className="h-5 w-5 text-gray-600" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-yellow-500" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              <div className="hidden md:flex items-center">
                <span className="text-sm text-gray-700 mr-2">Welcome, {adminName}</span>
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 p-3 bg-blue-100 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                    <p className="text-sm text-gray-500">Registered students</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Today's Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{presentStudents}</p>
                    <p className="text-sm text-gray-500">Students present today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Attendance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 p-3 bg-purple-100 rounded-full">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{attendanceRate}%</p>
                    <p className="text-sm text-gray-500">Average attendance rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <CardTitle>Student Attendance Management</CardTitle>
              <div className="flex mt-2 sm:mt-0">
                <Button
                  variant="outline"
                  className="mr-2 bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100"
                  onClick={() => setIsManualMarkDialogOpen(true)}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Manual Mark
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="w-full md:w-1/3 relative">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-2/3">
                  <div className="w-full sm:w-1/3">
                    <Select
                      placeholder="Select Branch"
                      options={branchOptions}
                      value={selectedBranch}
                      onChange={setSelectedBranch}
                      isClearable
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>

                  <div className="w-full sm:w-1/3">
                    <Select
                      placeholder="Select Year"
                      options={yearOptions}
                      value={selectedYear}
                      onChange={setSelectedYear}
                      isClearable
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>

                  <Button variant="outline" className="w-full sm:w-auto" onClick={resetFilters}>
                    <Filter className="h-4 w-4 mr-2" />
                    Reset Filters
                  </Button>
                </div>
              </div>

              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Branch</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student, index) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.rollNumber}</TableCell>
                            <TableCell>{student.branch}</TableCell>
                            <TableCell>{student.year}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  student.status === "Present"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {student.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusChange(student.id)}
                                className={student.status === "Present" ? "text-red-600" : "text-green-600"}
                              >
                                {student.status === "Present" ? (
                                  <>
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Mark Absent
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Mark Present
                                  </>
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                            No students found matching the current filters
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {filteredStudents.length > 0 && (
                <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                  <span>
                    Showing {filteredStudents.length} of {students.length} students
                  </span>
                  <Button variant="outline" size="sm" className="flex items-center" onClick={handleDownload}>
                    <FileText className="h-4 w-4 mr-2" />
                    Download Current View
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Manual Mark Dialog */}
      <Dialog open={isManualMarkDialogOpen} onOpenChange={setIsManualMarkDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manual Attendance Marking</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="hallTicket">Hall Ticket Number</Label>
              <Input
                id="hallTicket"
                placeholder="Enter hall ticket number"
                value={hallTicketNumber}
                onChange={(e) => setHallTicketNumber(e.target.value)}
              />
              <p className="text-sm text-gray-500">Use this option only when face recognition fails</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsManualMarkDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleManualMark}>Mark as Present</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}
