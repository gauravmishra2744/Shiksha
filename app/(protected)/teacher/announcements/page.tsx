'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/language-context'
import { Plus, Bell, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react'

export default function AnnouncementsPage() {
  const { t } = useLanguage()
  
  const announcements = [
    {
      id: '1',
      title: 'Mid-term Examination Schedule',
      content: 'The mid-term examinations will be conducted from March 15-25, 2024. Please prepare accordingly.',
      priority: 'high',
      isPublished: true,
      createdAt: '2024-01-15',
      expiresAt: '2024-03-25'
    },
    {
      id: '2',
      title: 'Holiday Notice',
      content: 'School will remain closed on January 26th for Republic Day celebration.',
      priority: 'normal',
      isPublished: true,
      createdAt: '2024-01-14',
      expiresAt: '2024-01-27'
    },
    {
      id: '3',
      title: 'Parent-Teacher Meeting',
      content: 'Parent-teacher meeting is scheduled for February 10th, 2024. All parents are requested to attend.',
      priority: 'urgent',
      isPublished: false,
      createdAt: '2024-01-13',
      expiresAt: '2024-02-10'
    }
  ]

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'high':
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case 'normal':
        return <Bell className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive'
      case 'high': return 'secondary'
      case 'normal': return 'default'
      default: return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('announcements')}</h1>
          <p className="text-muted-foreground">Create and manage announcements for your students</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Announcement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">{t('published')}</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">{t('draft')}</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">Urgent</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {getPriorityIcon(announcement.priority)}
                  <div>
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <CardDescription>
                      Created: {new Date(announcement.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getPriorityColor(announcement.priority) as any}>
                    {announcement.priority.toUpperCase()}
                  </Badge>
                  <Badge variant={announcement.isPublished ? "default" : "secondary"}>
                    {announcement.isPublished ? t('published') : t('draft')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{announcement.content}</p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Expires: {new Date(announcement.expiresAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  {t('edit')}
                </Button>
                {!announcement.isPublished && (
                  <Button size="sm">
                    Publish
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  {t('view')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}