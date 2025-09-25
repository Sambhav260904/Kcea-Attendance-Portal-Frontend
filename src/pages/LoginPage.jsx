import { LoginForm } from "../components/login-form"
import { Footer } from "../components/footer"

export default function LoginPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      {/* Main Content */}
      <main className="flex-grow">
        <LoginForm />
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>

  )
}
