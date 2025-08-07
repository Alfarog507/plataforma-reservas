"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Users, MapPin } from "lucide-react"
import { format } from "date-fns"

const rooms = [
  {
    id: "conf-a",
    name: "Conference Room A",
    capacity: 12,
    features: ["4K Display", "Video Conferencing", "Whiteboard"],
    hourlyRate: 25,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "meeting-b",
    name: "Meeting Room B",
    capacity: 6,
    features: ["Smart TV", "Wireless Presentation", "Coffee Machine"],
    hourlyRate: 15,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "hot-desk",
    name: "Hot Desk",
    capacity: 1,
    features: ["High-Speed WiFi", "Power Outlets", "Ergonomic Chair"],
    hourlyRate: 8,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "phone-booth",
    name: "Phone Booth",
    capacity: 1,
    features: ["Soundproof", "Privacy", "Phone Charging"],
    hourlyRate: 5,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

export default function ReservationPage() {
  const [selectedRoom, setSelectedRoom] = useState("")
  const [date, setDate] = useState<Date>()
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [attendees, setAttendees] = useState("")
  const [purpose, setPurpose] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Reservation submitted successfully!")
    }, 1000)
  }

  const selectedRoomData = rooms.find((room) => room.id === selectedRoom)
  const calculateDuration = () => {
    if (startTime && endTime) {
      const start = Number.parseInt(startTime.replace(":", ""))
      const end = Number.parseInt(endTime.replace(":", ""))
      return Math.max(0, (end - start) / 100)
    }
    return 0
  }

  const totalCost = selectedRoomData ? selectedRoomData.hourlyRate * calculateDuration() : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">New Reservation</h1>
        <p className="text-muted-foreground">Book your perfect workspace</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Reservation Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Reservation Details</CardTitle>
              <CardDescription>Fill in the details for your booking</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Room Selection */}
                <div className="space-y-2">
                  <Label htmlFor="room">Select Room/Space</Label>
                  <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a room or workspace" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{room.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">${room.hourlyRate}/hr</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Select value={endTime} onValueChange={setEndTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="End time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Attendees */}
                <div className="space-y-2">
                  <Label htmlFor="attendees">Number of Attendees</Label>
                  <Input
                    id="attendees"
                    type="number"
                    min="1"
                    max={selectedRoomData?.capacity || 20}
                    value={attendees}
                    onChange={(e) => setAttendees(e.target.value)}
                    placeholder="How many people?"
                  />
                  {selectedRoomData && (
                    <p className="text-sm text-muted-foreground">
                      Maximum capacity: {selectedRoomData.capacity} people
                    </p>
                  )}
                </div>

                {/* Purpose */}
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose/Description</Label>
                  <Textarea
                    id="purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="Brief description of your meeting or work session"
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Reservation"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Room Preview */}
          {selectedRoomData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {selectedRoomData.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <img
                  src={selectedRoomData.image || "/placeholder.svg"}
                  alt={selectedRoomData.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Up to {selectedRoomData.capacity} people</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedRoomData.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Duration:</span>
                <span className="text-sm font-medium">{calculateDuration()} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Rate:</span>
                <span className="text-sm font-medium">${selectedRoomData?.hourlyRate || 0}/hour</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-lg">${totalCost}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Book at least 30 minutes in advance</p>
              <p>• Cancel 2 hours before to avoid charges</p>
              <p>• Check room features match your needs</p>
              <p>• Arrive 5 minutes early for setup</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
