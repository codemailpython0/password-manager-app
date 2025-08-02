"use client"
import { useState } from "react"
import toast from "react-hot-toast"  // ✅ Using react-hot-toast
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Facebook,
    Github,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Send,
} from "lucide-react"
import { cn } from "@/lib/utils"
import emailjs from "@emailjs/browser"

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const form = e.currentTarget

        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
                form,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
            )
            .then(() => {
                toast.success("Message sent successfully!")   // ✅ Success toast
                setIsSubmitting(false)
                form.reset()
            })
            .catch((error) => {
                console.error(error)
                toast.error("Something went wrong!")   // ✅ Error toast
                setIsSubmitting(false)
            })
    }

    return (
        <section id="contact" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Get In <span className="text-primary">Touch</span>
                </h2>

                <p className="text-center text-muted-foreground mb max-w-2xl mx-auto">
                    Have a project in mind or want to collaborate? Feel free to reach out.
                </p>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    I&apos;m always open to discussing new opportunities.
                    </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* LEFT SIDE: CONTACT INFO */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

                        <div className="space-y-6 justify-center">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Email</h4>
                                    <a
                                        href="mailto:kiranbehera2001@gmail.com"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        kiranbehera2001@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Phone</h4>
                                    <a
                                        href="tel:+917873709837"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        +91 7873709837
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Location</h4>
                                    <p className="text-muted-foreground">
                                        Sambalpur, Odisha, India
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* SOCIAL LINKS */}
                        <div className="pt-8">
                            <h4 className="font-medium mb-4">Connect With Me</h4>
                            <div className="flex space-x-4 justify-center">
                                <a href="https://in.linkedin.com/in/kiran-kumar-behera-253965206" target="_blank">
                                    <Linkedin />
                                </a>
                                <a href="https://github.com/codemailpython0" target="_blank">
                                    <Github />
                                </a>
                                <a href="https://www.instagram.com/kiran___kumar_/" target="_blank">
                                    <Instagram />
                                </a>
                                <a href="https://www.facebook.com/kiranbehera2001/" target="_blank">
                                    <Facebook />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: CONTACT FORM */}
                    <div className="bg-card p-8 rounded-lg shadow-xs">
                        <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* NAME FIELD */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Your Name
                                </label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Your Full Name"
                                    required
                                />
                            </div>

                            {/* EMAIL FIELD */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Your Email
                                </label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="youremail@example.com"
                                    required
                                />
                            </div>

                            {/* MESSAGE FIELD */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Your Message
                                </label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Hello, I&#39;d like to talk about...
"
                                    rows={4}
                                    required
                                />
                            </div>

                            {/* SUBMIT BUTTON */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn("w-full flex items-center justify-center gap-2")}
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                                <Send size={16} />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
