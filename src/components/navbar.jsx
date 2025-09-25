"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
// import { ThemeToggle } from "./theme-toggle"
import logo from "../assets/logo.png"
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleDownloadCSV = () => {
    const dateInput = document.getElementById("csvDatePickerNav")
    const selectedDate = dateInput?.value
    let url = "http://localhost:3000/api/attendance/downloadAttendanceCSV"
    if (selectedDate) {
      url += `?date=${selectedDate}`
    }
    window.location.href = url
  }

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side: Logo and Desktop Nav Links */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center text-2xl font-semibold text-gray-900">
                <img src={logo} width={56} height={56} alt="KCEA Logo" className="mr-2" />
                <span>Attendance Portal</span>
              </Link>
            </div>
            {/* Desktop Navigation Links */}
            <div className="hidden sm:flex sm:ml-6 sm:space-x-8">
              <a
                href="#dashboard"
                className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="#features"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#stats"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Stats
              </a>
            </div>
          </div>

          {/* Right side: CSV download, Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-2">
              <Input
                id="csvDatePickerNav"
                type="date"
                className="w-auto border border-gray-300 rounded px-2 py-1 text-sm"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
              <Button onClick={handleDownloadCSV} size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                Download CSV
              </Button>
            </div>

            {/* <ThemeToggle /> */}

            {/* Mobile menu button */}
            <div className="-mr-2 flex sm:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-blue-600" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#dashboard"
              className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </a>
            <a
              href="#features"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#stats"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Stats
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
