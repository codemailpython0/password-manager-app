"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"
import { useUser } from "@clerk/nextjs"

export default function YourCards() {
  const { user } = useUser()
  const [cards, setCards] = useState<any[]>([])
  const [revealedCardId, setRevealedCardId] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchCards()
    }
  }, [user])

  const fetchCards = async () => {
    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .eq("user_id", user?.id)  // ✅ fetch only this user’s data
      .order("inserted_at", { ascending: false })

    if (!error) setCards(data || [])
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("cards").delete().eq("id", id)
    if (!error) {
      setCards(cards.filter((card) => card.id !== id))
      toast.success("Card deleted!")
    }
  }

  const toggleReveal = (id: string) => {
    setRevealedCardId(revealedCardId === id ? null : id)
  }

  // ✅ If not logged in → show message
  if (!user) {
    return (
      <Card className="bg-card border border-border">
        <CardContent className="p-6 text-center text-muted-foreground">
          🔒 Please sign in to view your saved cards.
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
              <TableHead>Card Number</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>CVV</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map((card) => (
              <TableRow key={card.id}>
                <TableCell>
                  {revealedCardId === card.id
                    ? card.card_number
                    : `**** **** **** ${card.card_number.slice(-4)}`}
                </TableCell>
                <TableCell>{card.expiry}</TableCell>
                <TableCell>{revealedCardId === card.id ? card.cvv : "***"}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => toggleReveal(card.id)}
                  >
                    {revealedCardId === card.id ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(card.id)}
                  >
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
