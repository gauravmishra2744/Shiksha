'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/language-context'
import { BarChart3, TrendingUp, Users, FileText, Download, Calendar } from 'lucide-react'

export default function ReportsPage() {
  const { t } = useLanguage()
  
  const reports = [
    {
      id: '1',
      title: 'Class Performance Report',
      description: 'Overall performance analysis of all classes',
      type: 'Performance',
      lastGenerated: '2024-01-15',
      status: 'Ready'
    },
    {
      id: '2',
      title: 'Attendance Summary',
      description: 'Monthly attendance report for all students',
      type: 'Attendance',
      lastGenerated: '2024-01-14',
      status: 'Ready'
    },
    {
      id: '3',
      title: 'Assignment Analytics',
      description: 'Detailed analysis of assignment submissions and grades',
      type: 'Analytics',
      lastGenerated: '2024-01-13',
      status: 'Generating'
    }
  ]

  const stats = [
    {
      title: 'Total Students',
      value: '83',
      icon: Users,
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Average Attendance',
      value: '87%',
      icon: Calendar,
      change: '+2%',
      changeType: 'positive'
    },
    {
      title: 'Assignment Completion',
      value: '92%',
      icon: FileText,
      change: '-1%',
      changeType: 'negative'
    },
    {
      title: 'Class Average',
      value: '78.5%',
      icon: BarChart3,
      change: '+3%',
      changeType: 'positive'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('reports')}</h1>
          <p className="text-muted-foreground">Generate and view detailed analytics reports</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className={`h-4 w-4 mr-1 ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`} />
                <span className={`text-sm ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Generate and download detailed reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{report.title}</h4>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{report.type}</Badge>
                      <span className="text-xs text-muted-foreground">
                        Last generated: {report.lastGenerated}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant={report.status === 'Ready' ? 'default' : 'secondary'}>
                    {report.status}
                  </Badge>
                  {report.status === 'Ready' && (
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  )}
                  <Button size="sm">
                    Generate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}