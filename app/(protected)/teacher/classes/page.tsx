'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Users, BookOpen, Calendar, MoreVertical } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import Link from 'next/link'

export default function ClassesPage() {
  const { t } = useLanguage()
  
  const classes = [
    {
      id: '1',
      nameKey: 'mathematics',
      grade: '10',
      section: 'A',
      students: 28,
      schedule: 'सोम, बुध, शुक्र - 9:00 AM',
      isActive: true
    },
    {
      id: '2',
      nameKey: 'physics',
      grade: '11',
      section: 'B',
      students: 25,
      schedule: 'मंगल, गुरु - 10:30 AM',
      isActive: true
    },
    {
      id: '3',
      nameKey: 'chemistry',
      grade: '12',
      section: 'A',
      students: 30,
      schedule: 'सोम, बुध, शुक्र - 2:00 PM',
      isActive: false
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('myClasses')}</h1>
          <p className="text-muted-foreground">{t('manageClasses')}</p>
        </div>
        <Button asChild>
          <Link href="/teacher/classes/create">
            <Plus className="mr-2 h-4 w-4" />
            {t('createClass')}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{t(classItem.nameKey)} {t('grade')} {classItem.grade}</CardTitle>
                  <CardDescription>
                    {t('grade')} {classItem.grade} - {t('section')} {classItem.section}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={classItem.isActive ? "default" : "secondary"}>
                  {classItem.isActive ? t('active') : t('inactive')}
                </Badge>
                <Badge variant="outline">{t(classItem.nameKey)}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{classItem.students} {t('students')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{classItem.schedule}</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1" asChild>
                  <Link href={`/teacher/classes/${classItem.id}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    {t('view')} Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}