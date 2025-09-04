import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { BarChart3, TrendingUp, TrendingDown, Award, FileText } from 'lucide-react'

export default function GradesPage() {
  const assignments = [
    {
      id: '1',
      title: 'Quadratic Equations Test',
      class: 'Grade 10 - A',
      totalMarks: 100,
      submissions: 28,
      graded: 25,
      avgScore: 78.5,
      status: 'Completed'
    },
    {
      id: '2',
      title: 'Physics Lab Report',
      class: 'Grade 11 - B',
      totalMarks: 50,
      submissions: 25,
      graded: 18,
      avgScore: 42.3,
      status: 'In Progress'
    }
  ]

  const topPerformers = [
    { name: 'आर्यन गुप्ता', score: 95, improvement: '+5%' },
    { name: 'अर्पिता शाह', score: 92, improvement: '+3%' },
    { name: 'अंजिका पाण्डेय', score: 89, improvement: '+8%' }
  ]

  const recentGrades = [
    {
      student: 'कंचन वर्मा',
      assignment: 'गणित प्रश्नपत्र 5',
      score: 48,
      total: 50,
      percentage: 96,
      feedback: 'उत्कृष्ट काम!'
    },
    {
      student: 'प्रकाश राज',
      assignment: 'भौतिकी प्रयोग 3',
      score: 42,
      total: 50,
      percentage: 84,
      feedback: 'अच्छी समझ, छोटी त्रुटियां'
    },
    {
      student: 'श्रुति सिंह',
      assignment: 'रसायन परीक्षा',
      score: 38,
      total: 50,
      percentage: 76,
      feedback: 'जैविक रसायन में सुधार की जरूरत'
    }
  ]

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 80) return 'text-blue-600'
    if (percentage >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Grades & Assessment</h1>
          <p className="text-muted-foreground">Track student performance and manage grading</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Average Score</p>
                <p className="text-2xl font-bold">82.4%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Improvement</p>
                <p className="text-2xl font-bold">+5.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Top Performers</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Pending Grades</p>
                <p className="text-2xl font-bold">7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assignment Grading Status */}
        <Card>
          <CardHeader>
            <CardTitle>Assignment Grading Status</CardTitle>
            <CardDescription>Track your grading progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignments.map((assignment) => {
              const gradingProgress = Math.round((assignment.graded / assignment.submissions) * 100)
              
              return (
                <div key={assignment.id} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground">{assignment.class}</p>
                    </div>
                    <Badge variant={assignment.status === 'Completed' ? 'default' : 'secondary'}>
                      {assignment.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Graded</p>
                      <p className="font-medium">{assignment.graded}/{assignment.submissions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Score</p>
                      <p className="font-medium">{assignment.avgScore}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{gradingProgress}%</span>
                    </div>
                    <Progress value={gradingProgress} className="h-2" />
                  </div>
                  
                  <Button size="sm" className="w-full">
                    Continue Grading
                  </Button>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Students with highest scores this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformers.map((student, index) => (
              <div key={student.name} className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <Avatar>
                    <AvatarFallback className="bg-secondary">
                      {getInitials(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Score: {student.score}%
                    </p>
                  </div>
                </div>
                <div className="ml-auto">
                  <Badge variant="outline" className="text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {student.improvement}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Grades */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Grades</CardTitle>
          <CardDescription>Latest graded assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentGrades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(grade.student)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{grade.student}</p>
                    <p className="text-sm text-muted-foreground">{grade.assignment}</p>
                  </div>
                </div>
                
                <div className="text-right space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">{grade.score}/{grade.total}</span>
                    <Badge variant="outline" className={getGradeColor(grade.percentage)}>
                      {grade.percentage}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground max-w-xs truncate">
                    {grade.feedback}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}