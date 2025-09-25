import { Github, Mail, Phone } from "lucide-react";

export function MainFooter() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Us</h3>
            <p className="text-gray-600 dark:text-gray-300">
              KCEA Attendance Portal provides a modern solution for tracking and managing attendance using facial
              recognition technology.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#dashboard" className="text-blue-600 dark:text-blue-400 hover:underline">Dashboard</a></li>
              <li><a href="#features" className="text-blue-600 dark:text-blue-400 hover:underline">Features</a></li>
              <li><a href="#stats" className="text-blue-600 dark:text-blue-400 hover:underline">Statistics</a></li>
              <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Github className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                <a
                  href="https://github.com/Sambhav260904"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Sambhav260904
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  <a href="mailto:sambhavrawani@gmail.com"  className="hover:underline">
                    Sambhav Rawani
                  </a>
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-600 dark:text-gray-300">+91 9959211510</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()} KCEA Attendance Portal. All rights reserved.
          </p>
          <p className="text-sm mt-2 md:mt-0">
            Developed by{" "}
            <a
              href="https://github.com/Sambhav260904"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sambhav Rawani
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
