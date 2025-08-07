"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, Filter, Plus, Search, TrendingUp, ArrowUpRight } from 'lucide-react'
import Link from "next/link"

// Mock data
const reservations = [
  {
    id: 1,
    room: "Conference Room A",
    user: "John Doe",
    date: "2024-01-15",
    time: "09:00 - 11:00",
    purpose: "Team Meeting",
    status: "confirmed",
    attendees: 8,
  },
  {
    id: 2,
    room: "Hot Desk 12",
    user: "Jane Smith",
    date: "2024-01-15",
    time: "13:00 - 17:00",
    purpose: "Individual Work",
    status: "confirmed",
    attendees: 1,
  },
  {
    id: 3,
    room: "Meeting Room B",
    user: "Mike Johnson",
    date: "2024-01-16",
    time: "14:00 - 15:30",
    purpose: "Client Presentation",
    status: "pending",
    attendees: 4,
  },
  {
    id: 4,
    room: "Phone Booth 3",
    user: "Sarah Wilson",
    date: "2024-01-16",
    time: "10:00 - 10:30",
    purpose: "Private Call",
    status: "confirmed",
    attendees: 1,
  },
]

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roomFilter, setRoomFilter] = useState("all")

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter
    const matchesRoom = roomFilter === "all" || reservation.room.includes(roomFilter)

    return matchesSearch && matchesStatus && matchesRoom
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
      case "pending":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400"
      case "cancelled":
        return "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">Manage your reservations and bookings</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 focus-ring">
          <Link href="/reservation" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Reservation
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-gradient border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Reservations</CardTitle>
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
              <Calendar className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">24</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-gradient border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
            <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-lg group-hover:from-emerald-500/30 group-hover:to-emerald-600/30 transition-all duration-300">
              <Clock className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">8</div>
            <p className="text-xs text-muted-foreground">4 confirmed, 2 pending</p>
          </CardContent>
        </Card>
        
        <Card className="card-gradient border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Hours Booked</CardTitle>
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all duration-300">
              <Users className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">42</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card className="card-gradient border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Favorite Room</CardTitle>
            <div className="p-2 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg group-hover:from-orange-500/30 group-hover:to-orange-600/30 transition-all duration-300">
              <MapPin className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">Room A</div>
            <p className="text-xs text-muted-foreground">8 bookings</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-gradient border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg">
              <Filter className="h-5 w-5 text-primary" />
            </div>
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reservations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 focus-ring"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background/50 border-border/50 focus:border-primary/50 focus-ring">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roomFilter} onValueChange={setRoomFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background/50 border-border/50 focus:border-primary/50 focus-ring">
                <SelectValue placeholder="Room Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rooms</SelectItem>
                <SelectItem value="Conference">Conference Rooms</SelectItem>
                <SelectItem value="Meeting">Meeting Rooms</SelectItem>
                <SelectItem value="Hot Desk">Hot Desks</SelectItem>
                <SelectItem value="Phone Booth">Phone Booths</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reservations List */}
      <Card className="card-gradient border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Recent Reservations</CardTitle>
          <CardDescription className="text-base">Your upcoming and recent bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border border-border/50 rounded-xl hover:bg-accent/30 hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="space-y-3 sm:space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg text-foreground">{reservation.room}</h3>
                    <Badge className={`${getStatusColor(reservation.status)} font-medium`}>
                      {reservation.status}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">{reservation.user}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{reservation.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{reservation.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 font-medium">{reservation.purpose}</p>
                </div>
                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <Badge variant="outline" className="bg-background/50 border-border/50">
                    {reservation.attendees} {reservation.attendees === 1 ? "person" : "people"}
                  </Badge>
                  <Button variant="outline" size="sm" className="bg-transparent border-border/50 hover:bg-accent/50 focus-ring transition-all duration-200 group-hover:border-primary/30">
                    Edit
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
