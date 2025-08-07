"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import Link from "next/link"

// Mock data for calendar events
const events = [
  { id: 1, title: "Team Meeting", room: "Conference Room A", time: "09:00", duration: 2, day: 1, status: "confirmed" },
  { id: 2, title: "Client Call", room: "Phone Booth 1", time: "14:00", duration: 1, day: 1, status: "confirmed" },
  { id: 3, title: "Workshop", room: "Meeting Room B", time: "10:00", duration: 3, day: 2, status: "pending" },
  { id: 4, title: "Individual Work", room: "Hot Desk 5", time: "13:00", duration: 4, day: 3, status: "confirmed" },
  { id: 5, title: "Presentation", room: "Conference Room A", time: "15:00", duration: 2, day: 4, status: "confirmed" },
]

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const currentWeek = "January 15-21, 2024"

export default function CalendarPage() {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0)

  const getEventColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 border-green-500 text-green-700 dark:text-green-300"
      case "pending":
        return "bg-yellow-500/20 border-yellow-500 text-yellow-700 dark:text-yellow-300"
      default:
        return "bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Calendar View</h1>
          <p className="text-muted-foreground">Weekly overview of all reservations</p>
        </div>
        <Button asChild>
          <Link href="/reservation">
            <Plus className="mr-2 h-4 w-4" />
            New Reservation
          </Link>
        </Button>
      </div>

      {/* Week Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => setCurrentWeekIndex((prev) => prev - 1)}>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <CardTitle className="text-lg">{currentWeek}</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setCurrentWeekIndex((prev) => prev + 1)}>
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="grid grid-cols-8 border-b">
                <div className="p-4 font-semibold border-r">Time</div>
                {weekDays.map((day, index) => (
                  <div key={day} className="p-4 font-semibold text-center border-r last:border-r-0">
                    <div>{day}</div>
                    <div className="text-sm text-muted-foreground">{15 + index}</div>
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {timeSlots.map((time, timeIndex) => (
                <div key={time} className="grid grid-cols-8 border-b last:border-b-0 min-h-[80px]">
                  <div className="p-4 font-medium border-r bg-muted/30">{time}</div>
                  {weekDays.map((_, dayIndex) => (
                    <div key={dayIndex} className="p-2 border-r last:border-r-0 relative">
                      {events
                        .filter(
                          (event) =>
                            event.day === dayIndex + 1 &&
                            Number.parseInt(event.time.split(":")[0]) === Number.parseInt(time.split(":")[0]),
                        )
                        .map((event) => (
                          <div
                            key={event.id}
                            className={`absolute inset-2 p-2 rounded border text-xs ${getEventColor(event.status)}`}
                            style={{
                              height: `${event.duration * 60 - 8}px`,
                              zIndex: 10,
                            }}
                          >
                            <div className="font-semibold truncate">{event.title}</div>
                            <div className="truncate">{event.room}</div>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {event.status}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500"></div>
              <span className="text-sm">Confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500/20 border border-yellow-500"></div>
              <span className="text-sm">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500"></div>
              <span className="text-sm">Cancelled</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
