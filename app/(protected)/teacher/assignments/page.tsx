import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Calendar, Users, FileText, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function AssignmentsPage() {
  const assignments = [
    {
      id: '1',
      title: 'Quadratic Equations Worksheet',
      subject: 'Mathematics',
      class: 'Grade 10 - A',
      dueDate: '2024-01-15',
      totalMarks: 50,
      submissions: 25,
      totalStudents: 28,
      status: 'Active',
      isPublished: true
    },
    {
      id: '2',
      title: 'Physics Lab Report',
      subject: 'Physics',
      class: 'Grade 11 - B',
      dueDate: '2024-01-20',
      totalMarks: 100,
      submissions: 18,
      totalStudents: 25,
      status: 'Active',
      isPublished: true
    },
    {
      id: '3',
      title: 'Chemical Bonding Quiz',
      subject: 'Chemistry',
      class: 'Grade 12 - A',
      dueDate: '2024-01-25',
      totalMarks: 75,
      submissions: 0,
      totalStudents: 30,
      status: 'Draft',
      isPublished: false
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default'
      case 'Draft': return 'secondary'
      case 'Completed': return 'outline'
      default: return 'secondary'
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">Create and manage assignments for your classes</p>
        </div>
        <Button asChild>
          <Link href="/teacher/assignments/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Assignment
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {assignments.map((assignment) => {
          const daysUntilDue = getDaysUntilDue(assignment.dueDate)
          const submissionRate = Math.round((assignment.submissions / assignment.totalStudents) * 100)
          
          return (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{assignment.title}</CardTitle>
                    <CardDescription>{assignment.class}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(assignment.status)}>
                    {assignment.status}
                  </Badge>
                  <Badge variant="outline">{assignment.subject}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Due Date</p>
                      <p className="text-muted-foreground">
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Total Marks</p>
                      <p className="text-muted-foreground">{assignment.totalMarks}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Submissions</span>
                    <span className="font-medium">
                      {assignment.submissions}/{assignment.totalStudents} ({submissionRate}%)
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${submissionRate}%` }}
                    />
                  </div>
                </div>

                {daysUntilDue > 0 && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {daysUntilDue} days remaining
                    </span>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/teacher/assignments/${assignment.id}`}>
                      View Details
                    </Link>
                  </Button>
                  {assignment.submissions > 0 && (
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/teacher/assignments/${assignment.id}/grade`}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Grade
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}