"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import { useUser, SignInButton } from "@clerk/nextjs"

export default function AddPassword() {
  const { user } = useUser() // ✅ Clerk user object
  const [site, setSite] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // ✅ If user is not signed in → show Sign-In card instead of form
  if (!user) {
    return (
      <Card className="bg-card border border-border">
        <CardContent className="p-6 text-center">
          <p className="mb-4 text-muted-foreground">🔒 You must sign in to save a password.</p>
          <SignInButton mode="redirect">
            <Button>Sign In</Button>
          </SignInButton>
        </CardContent>
      </Card>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from("passwords").insert([
      {
        site,
        username,
        password,
        user_id: user.id, // ✅ Save real Clerk user ID
      },
    ])

    setLoading(false)

    if (error) {
      console.error("Supabase Insert Error:", error.message)
      toast.error("Something went wrong")
    } else {
      toast.success("Password saved successfully!")

      // ✅ Clear form after submit
      setSite("")
      setUsername("")
      setPassword("")
    }
  }

  return (
    <Card className="bg-card border border-border">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <Label>Website</Label>
            <Input
              type="text"
              placeholder="example.com"
              value={site}
              onChange={(e) => setSite(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Username/Email</Label>
            <Input
              type="text"
              placeholder="Email or Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
