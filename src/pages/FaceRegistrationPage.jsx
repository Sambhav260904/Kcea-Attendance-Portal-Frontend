import { FaceRegistration } from "../components/face-registration"
import { MainFooter } from "../components/main-footer"

export default function FaceRegistrationPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <FaceRegistration />
      <MainFooter />
    </main>
  )
}
