import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Wifi, Coffee, Monitor, Shield, Sparkles, ArrowRight } from 'lucide-react'
import Link from "next/link"

export default function HomePage() {
  const benefits = [
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Reserve rooms and spaces with just a few clicks",
    },
    {
      icon: Clock,
      title: "Real-time Availability",
      description: "See what's available right now or plan ahead",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Book spaces for your team and manage group reservations",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your bookings are safe and always accessible",
    },
  ]

  const features = [
    { icon: Wifi, label: "High-Speed WiFi" },
    { icon: Coffee, label: "Complimentary Coffee" },
    { icon: Monitor, label: "4K Displays" },
    { icon: Users, label: "Collaboration Tools" },
  ]

  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl -z-10"></div>
        <div className="space-y-6">
          <Badge variant="secondary" className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <Sparkles className="mr-2 h-4 w-4" />
            Smart Workspace Solutions
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Reserve Your Perfect
            <span className="block bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Workspace
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Book meeting rooms, hot desks, and collaborative spaces in our modern coworking environment. Simple, fast,
            and designed for productivity.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 focus-ring">
            <Link href="/reservation" className="flex items-center gap-2">
              Book Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent border-border/50 hover:bg-accent/50 focus-ring transition-all duration-300">
            <Link href="/calendar">View Calendar</Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-6 card-gradient border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
            <CardContent className="pt-4">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium text-foreground">{feature.label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Benefits Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Why Choose CoWork Reserve?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for productive workspace management
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="card-gradient border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-3xl"></div>
        <div className="relative p-12 text-center space-y-6">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of professionals who trust CoWork Reserve for their workspace needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 focus-ring">
              <Link href="/login" className="flex items-center gap-2">
                Sign Up Free
                <Sparkles className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-border/50 hover:bg-accent/50 focus-ring transition-all duration-300">
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
