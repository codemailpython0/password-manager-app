"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, EyeOff, Clipboard } from "lucide-react"
import toast from "react-hot-toast"
import { useUser } from "@clerk/nextjs"

// ✅ Define PasswordType instead of using any[]
type PasswordType = {
  id: string
  site: string
  username: string
  password: string
  user_id: string
}

export default function YourPasswords() {
  const { user } = useUser()
  const [passwords, setPasswords] = useState<PasswordType[]>([])  // ✅ using PasswordType
  const [revealed, setRevealed] = useState<string | null>(null)

  // ✅ Fetch passwords for the signed-in user only
  const fetchPasswords = async () => {
    const { data, error } = await supabase
      .from("passwords")
      .select("*")
      .eq("user_id", user?.id)  // ✅ fetch only this user’s data
      .order("inserted_at", { ascending: false })

    if (!error) setPasswords(data as PasswordType[] || [])
  }

  useEffect(() => {
    if (user) {
      fetchPasswords()
    }
  }, [user])  // ✅ fetch again if user changes

  // ✅ Delete password
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("passwords").delete().eq("id", id)
    if (!error) {
      setPasswords(passwords.filter((pwd) => pwd.id !== id))
      toast.success("Password deleted!")
    }
  }

  // ✅ Copy password
  const handleCopy = (password: string) => {
    navigator.clipboard.writeText(password)
    toast.success("Password copied!")
  }

  // ✅ If not logged in → show message
  if (!user) {
    return (
      <Card className="bg-card border border-border">
        <CardContent className="p-6 text-center text-muted-foreground">
          🔒 Please sign in to view your saved passwords.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border border-border">
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Website</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {passwords.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.site}</TableCell>
                <TableCell>{entry.username}</TableCell>
                <TableCell>
                  {revealed === entry.id ? entry.password : "••••••••"}
                </TableCell>
                <TableCell className="flex gap-2">
                  {/* 👁 Toggle visibility */}
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setRevealed(revealed === entry.id ? null : entry.id)}
                  >
                    {revealed === entry.id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>

                  {/* 📋 Copy password */}
                  <Button size="icon" variant="outline" onClick={() => handleCopy(entry.password)}>
                    <Clipboard className="h-4 w-4" />
                  </Button>

                  {/* 🗑 Delete password */}
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(entry.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
