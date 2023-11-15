import Navbar from "@/components/Navbar"
import Profile from "@/components/profile"

export default function UserProfile() {

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="mt-20 flex items-center justify-center">
        <Profile />
      </div>
    </div>
  )
}
