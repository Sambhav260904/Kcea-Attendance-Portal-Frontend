import { Link } from "react-router-dom"
import { Github, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white shadow-lg w-full py-2 mt-auto fixed bottom-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} Sambhav_Rawani. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <Link to="https://github.com/Sambhav260904" target="_blank" className="text-gray-600 hover:text-gray-900">
            <Github className="h-5 w-5 text-black" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            to="https://www.linkedin.com/in/Sambhav-Rawani"
            target="_blank"
            className="text-gray-600 hover:text-gray-900"
          >
            <Linkedin className="h-5 w-5 text-blue-700" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link to="https://instagram.com/sambhav_rawani" target="_blank" className="text-gray-600 hover:text-gray-900">
            <Instagram className="h-5 w-5 text-pink-600" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
