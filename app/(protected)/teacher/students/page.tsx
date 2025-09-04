'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useLanguage } from '@/contexts/language-context'
import { Search, Plus, Mail, Phone, MoreVertical } from 'lucide-react'

export default function StudentsPage() {
  const { t } = useLanguage()
  
  const students = [
    {
      id: '1',
      nameKey: 'dharikaSharma',
      email: 'dharika.sharma@school.edu',
      rollNumber: 'ST001',
      grade: '10',
      section: 'A',
      phone: '+91 98765-43210',
      status: 'active',
      attendance: 95
    },
    {
      id: '2',
      nameKey: 'gauravKumar',
      email: 'gaurav.kumar@school.edu',
      rollNumber: 'ST002',
      grade: '10',
      section: 'A',
      phone: '+91 98765-43211',
      status: 'active',
      attendance: 88
    },
    {
      id: '3',
      nameKey: 'anupamSingh',
      email: 'anupam.singh@school.edu',
      rollNumber: 'ST003',
      grade: '11',
      section: 'B',
      phone: '+91 98765-43212',
      status: 'inactive',
      attendance: 76
    }
  ]

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'ST'
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600'
    if (attendance >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('students')}</h1>
          <p className="text-muted-foreground">{t('manageStudentsDesc')}</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search students..." className="pl-10" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(t(student.nameKey))}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{t(student.nameKey)}</CardTitle>
                    <CardDescription>{student.rollNumber}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={student.status === 'active' ? "default" : "secondary"}>
                  {t(student.status)}
                </Badge>
                <Badge variant="outline">{t('grade')} {student.grade} - {t('section')} {student.section}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Attendance:</span>
                <span className={`font-medium ${getAttendanceColor(student.attendance)}`}>
                  {student.attendance}%
                </span>
              </div>
              <Button size="sm" className="w-full">
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}