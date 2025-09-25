import { Navbar } from "../components/navbar"
import { Dashboard } from "../components/dashboard"
import { Features2 } from "../components/features2"
import { Statistics } from "../components/statistics"
import { TestimonialCarousel } from "../components/testimonial-carousel"
import { MainFooter } from "../components/main-footer"
import { DownloadSection } from "../components/download-section"
export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Dashboard />
        <DownloadSection />
        <Features2 />
        <Statistics />
        <TestimonialCarousel />
      </main>
      <MainFooter />
    </div>
  )
}
