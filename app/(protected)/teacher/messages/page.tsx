'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useLanguage } from '@/contexts/language-context'
import { Search, Plus, Send, MessageSquare, Clock } from 'lucide-react'

export default function MessagesPage() {
  const { t } = useLanguage()
  
  const messages = [
    {
      id: '1',
      senderKey: 'adityaSharma',
      subject: 'Assignment Submission Query',
      content: 'Sir, I have a doubt regarding the math assignment...',
      time: '2 hours ago',
      isRead: false,
      type: 'student'
    },
    {
      id: '2',
      senderKey: 'priyaGupta',
      subject: 'Attendance Issue',
      content: 'Ma\'am, I was marked absent yesterday but I was present...',
      time: '5 hours ago',
      isRead: true,
      type: 'student'
    },
    {
      id: '3',
      senderKey: 'rahulVerma',
      subject: 'Project Help',
      content: 'Can you please guide me with the chemistry project?',
      time: '1 day ago',
      isRead: false,
      type: 'student'
    }
  ]

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'ST'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('messages')}</h1>
          <p className="text-muted-foreground">Communicate with your students</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages..." className="pl-10" />
        </div>
        <Button variant="outline">All</Button>
        <Button variant="outline">Unread</Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {messages.map((message) => (
          <Card key={message.id} className={`hover:shadow-md transition-shadow cursor-pointer ${!message.isRead ? 'border-primary' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarFallback className="bg-secondary">
                    {getInitials(t(message.senderKey))}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{t(message.senderKey)}</h4>
                      {!message.isRead && (
                        <Badge variant="default" className="text-xs">New</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{message.time}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm">{message.subject}</h5>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {message.content}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                    <Button size="sm" variant="outline">
                      Mark as Read
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}