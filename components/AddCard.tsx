"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent } from "@/components/ui/card"
import toast from "react-hot-toast"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useUser, SignInButton } from "@clerk/nextjs"

const formSchema = z.object({
  cardNumber: z.string()
    .min(16, { message: "Card number must be 16 digits." })
    .max(16, { message: "Card number must be 16 digits." })
    .regex(/^\d{16}$/, { message: "Card number can only contain digits." }),
  expiry: z.string()
    .min(5, { message: "Expiry must be in MM/YY format." })
    .max(5, { message: "Expiry must be in MM/YY format." })
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry must be in MM/YY format." }),
  cvv: z.string()
    .min(3, { message: "CVV must be at least 3 digits." })
    .max(4, { message: "CVV cannot exceed 4 digits." })
    .regex(/^\d{3,4}$/, { message: "CVV must be numeric." }),
})

export default function AddCard() {
  const { user } = useUser()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { cardNumber: "", expiry: "", cvv: "" },
  })

  // ✅ If not logged in → show sign-in button instead of form
  if (!user) {
    return (
      <Card className="bg-card border border-border">
        <CardContent className="p-6 text-center">
          <p className="mb-4 text-muted-foreground">🔒 You must sign in to add a card.</p>
          <SignInButton mode="redirect">
            <Button>Sign In</Button>
          </SignInButton>
        </CardContent>
      </Card>
    )
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { error } = await supabase.from("cards").insert([
      {
        card_number: values.cardNumber,
        expiry: values.expiry,
        cvv: values.cvv,
        user_id: user.id,
      },
    ])

    if (error) {
      toast.error("Something went wrong")
    } else {
      toast.success("Card added successfully!")
      form.reset()
    }
  }

  return (
    <Card className="bg-card border border-border">
      <CardContent className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="**** **** **** 5678" {...field} />
                  </FormControl>
                  <FormDescription>Enter your 16-digit card number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="***" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Add Card</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
