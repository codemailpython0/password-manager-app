import AddCard from "@/components/AddCard"
import AddPassword from "@/components/AddPassword"
import YourCards from "@/components/YourCards"
import YourPasswords from "@/components/YourPasswords"
import Link from "next/link"
import { Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Pass-Home',
  description: 'Home Page Of Passwords Manager',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-6">
      
      {/* 🔹 Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            💳 Add Credit/Debit Card
          </h1>
          <AddCard />
        </section>

        <section className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            🔐 Add Password
          </h1>
          <AddPassword />
        </section>
      </div>

      {/* 🔹 Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <section className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            📂 Your Cards
          </h1>
          <YourCards />
        </section>

        <section className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            🔑 Your Passwords
          </h1>
          <YourPasswords />
        </section>
      </div>

      {/* 🔹 Info Note Section */}
      <div className="mt-10 flex justify-center">
        <Card className="w-full md:w-2/3 lg:w-1/2 border border-border shadow-md">
          <CardContent className="flex items-center gap-4 p-4">
            <Info className="text-blue-500 w-6 h-6 flex-shrink-0" />
            <div className="flex flex-col flex-grow">
              <p className="text-foreground font-semibold">
                Facing an issue or error?
              </p>
              <p className="text-muted-foreground text-sm">
                We’re here to help! Click below to reach our contact page and report your issue.
              </p>
            </div>
            <Link href="/contact">
              <Button variant="outline">Contact Me</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
