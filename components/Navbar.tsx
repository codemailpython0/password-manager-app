"use client"
import React, { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // ✅ Ensures correct theme icon after hydration
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  // ✅ Toggle function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <nav className="flex justify-between items-center px-4 h-16 bg-foreground text-background">
      {/* ✅ Left side logo */}
      <span className="font-bold text-xl">PASS</span>

      {/* ✅ Middle navigation links */}
      
{/* <ul className="flex gap-5 items-center justify-start">
  <li><Link href="/">Home</Link></li>
  <li><Link href="/services">Services</Link></li>
  <li><Link href="/contact">Contact</Link></li>
</ul> */}
<ul className="flex gap-5 items-center justify-start">
  <li>
    <Link href="/">
      <Button variant="ghost">Home</Button>
    </Link>
  </li>
  <li>
    <Link href="/services">
      <Button variant="ghost">Services</Button>
    </Link>
  </li>
  <li>
    <Link href="/contact">
      <Button variant="ghost">Contact</Button>
    </Link>
  </li>
</ul>


      {/* ✅ Right side - theme toggle + auth */}
      <div className="flex justify-center items-center gap-2">
        
        {/* 🌙/🌞 Theme toggle button */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Clerk Auth buttons */}
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
        <SignedOut>
  <SignInButton mode="redirect">
    <Button variant="ghost">
      Sign In
    </Button>
  </SignInButton>
</SignedOut>

<SignedIn>
  <UserButton
    afterSignOutUrl="/"
    appearance={{
      elements: {
        userButtonAvatarBox: "w-8 h-8", // optional styling for avatar
      },
    }}
  >
    <Button variant="ghost">
      Profile
    </Button>
  </UserButton>
</SignedIn>

      </div>
    </nav>
  )
}

export default Navbar
