import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { DashboardHeader } from '@/components/shared/dashboard-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  BookOpen, 
  Users, 
  FileText, 
  BarChart3, 
  Calendar, 
  MessageSquare,
  Plus,
  Upload,
  ClipboardList,
  TrendingUp
} from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teacher Dashboard - Portal',
  description: 'Your teaching dashboard and tools',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const quickActions = [
    {
      title: 'Create Class',
      description: 'Set up a new class',
      icon: Plus,
      href: '/teacher/classes',
      color: 'bg-blue-500'
    },
    {
      title: 'Upload Resources',
      description: 'Add learning materials',
      icon: Upload,
      href: '/teacher/resources',
      color: 'bg-green-500'
    },
    {
      title: 'Create Assignment',
      description: 'Create and assign tasks',
      icon: ClipboardList,
      href: '/teacher/assignments',
      color: 'bg-purple-500'
    },
    {
      title: 'View Reports',
      description: 'Check student analytics',
      icon: TrendingUp,
      href: '/teacher/reports',
      color: 'bg-orange-500'
    }
  ]

  const recentActivities = [
    { action: 'Created quiz "Math Chapter 5"', time: '2 hours ago' },
    { action: 'Uploaded lesson plan for Biology', time: '1 day ago' },
    { action: 'Graded 25 assignments', time: '2 days ago' },
    { action: 'Sent announcement to Class 10A', time: '3 days ago' },
  ]

  return (
    <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back, {session?.user?.name?.split(' ')[0]}!
            </h2>
            <p className="text-muted-foreground">
              Here's what's happening in your classroom today.
            </p>
          </div>
          
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {session?.user?.name ? getInitials(session.user.name) : 'T'}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{session?.user?.name}</h3>
                  <Badge variant="secondary">सत्यापित</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {session?.user?.subject} Teacher
                </p>
                <p className="text-xs text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions Grid */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${action.color} text-white`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{action.description}</CardDescription>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                8 pending review
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85.2%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Your latest teaching activities and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
    </div>
  )
}