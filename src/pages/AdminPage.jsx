import { AdminDashboard } from "../components/admin-dashboard"
import { Footer } from "../components/footer"

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <AdminDashboard />
      <Footer />
    </main>
  )
}
