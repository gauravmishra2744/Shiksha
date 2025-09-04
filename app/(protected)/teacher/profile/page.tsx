'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useLanguage } from '@/contexts/language-context'
import { useSession } from 'next-auth/react'
import { Edit, Save, Camera, Mail, Phone, MapPin, Calendar } from 'lucide-react'

export default function ProfilePage() {
  const { t } = useLanguage()
  const { data: session } = useSession()
  
  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'T'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('profile')}</h1>
          <p className="text-muted-foreground">Manage your profile information</p>
        </div>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          {t('edit')} Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {session?.user?.name ? getInitials(session.user.name) : 'T'}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardTitle>{session?.user?.name || 'Teacher Name'}</CardTitle>
            <CardDescription>{session?.user?.subject || 'Subject Teacher'}</CardDescription>
            <Badge variant="secondary" className="w-fit mx-auto">
              {t('verified')} {t('teacher')}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{session?.user?.email || 'teacher@school.edu'}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>+91 98765-43210</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Mumbai, Maharashtra</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined January 2024</span>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Teacher" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Name" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={session?.user?.email || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+91 98765-43210" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject Specialization</Label>
              <Input id="subject" defaultValue={session?.user?.subject || 'Mathematics'} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea 
                id="bio" 
                className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md"
                placeholder="Tell us about yourself..."
                defaultValue="Experienced mathematics teacher with 5+ years of teaching experience."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="Mumbai, Maharashtra, India" />
            </div>
            
            <div className="flex space-x-2">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                {t('save')} Changes
              </Button>
              <Button variant="outline">
                {t('cancel')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teaching Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Teaching Statistics</CardTitle>
          <CardDescription>Your teaching performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-sm text-muted-foreground">Classes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">83</p>
              <p className="text-sm text-muted-foreground">Students</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">15</p>
              <p className="text-sm text-muted-foreground">Assignments</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">87%</p>
              <p className="text-sm text-muted-foreground">Avg Attendance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}