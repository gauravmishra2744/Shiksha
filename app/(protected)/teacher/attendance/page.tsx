import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Calendar, Users, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'

export default function AttendancePage() {
  const todayDate = new Date().toLocaleDateString()
  
  const classes = [
    {
      id: '1',
      name: 'Mathematics Grade 10',
      section: 'A',
      time: '9:00 AM',
      students: 28,
      present: 25,
      absent: 2,
      late: 1
    },
    {
      id: '2',
      name: 'Physics Grade 11',
      section: 'B',
      time: '10:30 AM',
      students: 25,
      present: 23,
      absent: 1,
      late: 1
    }
  ]

  const students = [
    {
      id: '1',
      name: 'आदित्य शर्मा',
      rollNumber: 'ST001',
      status: 'present',
      time: '8:55 AM'
    },
    {
      id: '2',
      name: 'प्रिया गुप्ता',
      rollNumber: 'ST002',
      status: 'late',
      time: '9:15 AM'
    },
    {
      id: '3',
      name: 'राहुल वर्मा',
      rollNumber: 'ST003',
      status: 'absent',
      time: null
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'late':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      present: 'default',
      absent: 'destructive',
      late: 'secondary'
    } as const
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attendance</h1>
          <p className="text-muted-foreground">Track and manage student attendance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{todayDate}</span>
        </div>
      </div>

      {/* Class Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((classItem) => {
          const attendanceRate = Math.round((classItem.present / classItem.students) * 100)
          
          return (
            <Card key={classItem.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{classItem.name}</span>
                  <Badge variant="outline">{classItem.time}</Badge>
                </CardTitle>
                <CardDescription>Section {classItem.section}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">{classItem.present}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Present</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-1">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span className="text-2xl font-bold text-red-600">{classItem.absent}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Absent</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-1">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="text-2xl font-bold text-yellow-600">{classItem.late}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Late</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Attendance Rate</span>
                    <span className="font-medium">{attendanceRate}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${attendanceRate}%` }}
                    />
                  </div>
                </div>

                <Button className="w-full">
                  Take Attendance
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance - Mathematics Grade 10</CardTitle>
          <CardDescription>Mark attendance for your students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {student.time && (
                    <span className="text-sm text-muted-foreground">{student.time}</span>
                  )}
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(student.status)}
                    {getStatusBadge(student.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline">Save Draft</Button>
            <Button>Submit Attendance</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}