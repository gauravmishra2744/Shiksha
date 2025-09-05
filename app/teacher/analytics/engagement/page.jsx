"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Users, 
  Clock, 
  MessageSquare, 
  Eye, 
  Activity,
  BarChart3,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Target,
  Zap,
  Star,
  Award
} from "lucide-react";

export default function EngagementMetrics() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch("/api/analytics/engagement");
      const data = await response.json();
      setMetrics(data.metrics || mockMetrics);
    } catch (error) {
      setMetrics(mockMetrics);
    }
    setLoading(false);
  };

  const mockMetrics = {
    overview: {
      totalStudents: 133,
      activeStudents: 118,
      avgSessionTime: "45 min",
      engagementRate: 83,
      weeklyGrowth: 5.2,
      completionRate: 89
    },
    activities: [
      { name: "Video Lectures", views: 245, engagement: 78, completion: 85, trend: "up" },
      { name: "Assignments", submissions: 128, completion: 93, engagement: 87, trend: "up" },
      { name: "Discussion Forums", posts: 142, participation: 67, engagement: 72, trend: "stable" },
      { name: "Quizzes", attempts: 356, avgScore: 82, engagement: 89, trend: "up" },
      { name: "Interactive Labs", sessions: 89, engagement: 76, completion: 81, trend: "down" }
    ],
    trends: [
      { period: "Week 1", engagement: 75, performance: 78, active: 110 },
      { period: "Week 2", engagement: 80, performance: 81, active: 115 },
      { period: "Week 3", engagement: 83, performance: 84, active: 118 },
      { period: "Week 4", engagement: 85, performance: 87, active: 118 }
    ],
    topStudents: [
      { name: "Alice Johnson", engagement: 95, activities: 24, hours: 48, streak: 15 },
      { name: "Bob Smith", engagement: 92, activities: 22, hours: 44, streak: 12 },
      { name: "Carol Davis", engagement: 88, activities: 20, hours: 41, streak: 10 },
      { name: "David Wilson", engagement: 86, activities: 19, hours: 38, streak: 8 },
      { name: "Emma Brown", engagement: 84, activities: 18, hours: 36, streak: 7 }
    ],
    timeDistribution: [
      { hour: "08:00", students: 25, engagement: 72 },
      { hour: "10:00", students: 45, engagement: 85 },
      { hour: "14:00", students: 38, engagement: 78 },
      { hour: "16:00", students: 52, engagement: 88 },
      { hour: "20:00", students: 30, engagement: 75 }
    ],
    deviceUsage: [
      { device: "Desktop", users: 78, engagement: 87 },
      { device: "Mobile", users: 35, engagement: 72 },
      { device: "Tablet", users: 20, engagement: 79 }
    ]
  };

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DynamicBreadcrumb />
          <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
            <div className="animate-pulse space-y-6">
              <div className="h-32 bg-gray-200 rounded-lg"></div>
              <div className="grid grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        
        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-200 dark:border-green-800">
                    <Activity className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">Engagement Analytics</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      Track student engagement and participation across all activities
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50">
                  <div className="text-2xl font-bold text-green-600">{metrics.overview.engagementRate}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Overall Engagement</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +{metrics.overview.weeklyGrowth}%
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50">
                  <div className="text-2xl font-bold text-blue-600">{metrics.overview.activeStudents}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Students</div>
                  <div className="text-xs text-blue-600">of {metrics.overview.totalStudents} total</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50">
                  <div className="text-2xl font-bold text-orange-600">{metrics.overview.avgSessionTime}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Session</div>
                  <div className="text-xs text-orange-600">Per Student</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50">
                  <div className="text-2xl font-bold text-purple-600">{metrics.overview.completionRate}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
                  <div className="text-xs text-purple-600 flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +2.1%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                      Activity Engagement
                    </CardTitle>
                    <CardDescription>Performance across different learning activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {metrics.activities.map((activity, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{activity.name}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {activity.engagement}%
                              </Badge>
                              {activity.trend === 'up' ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                              ) : activity.trend === 'down' ? (
                                <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                              ) : (
                                <div className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                          <Progress value={activity.engagement} className="h-2" />
                          <div className="text-sm text-gray-600">
                            {activity.views && `${activity.views} views`}
                            {activity.submissions && `${activity.submissions} submissions`}
                            {activity.posts && `${activity.posts} posts`}
                            {activity.attempts && `${activity.attempts} attempts`}
                            {activity.sessions && `${activity.sessions} sessions`}
                            {activity.completion && ` • ${activity.completion}% completion`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Top Engaged Students
                    </CardTitle>
                    <CardDescription>Students with highest engagement levels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {metrics.topStudents.map((student, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 ? 'bg-yellow-100 text-yellow-700' :
                              index === 1 ? 'bg-gray-100 text-gray-700' :
                              index === 2 ? 'bg-orange-100 text-orange-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-medium">{student.name}</h3>
                              <p className="text-sm text-gray-600">
                                {student.activities} activities • {student.hours}h • {student.streak} day streak
                              </p>
                            </div>
                          </div>
                          <Badge variant={student.engagement >= 90 ? 'default' : 'secondary'}>
                            {student.engagement}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-purple-500" />
                      Peak Engagement Times
                    </CardTitle>
                    <CardDescription>When students are most active</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {metrics.timeDistribution.map((time, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm">{time.hour}</span>
                            <div className="text-sm text-gray-600">{time.students} students</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={time.engagement} className="w-16 h-2" />
                            <span className="text-sm font-medium">{time.engagement}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-500" />
                      Device Usage
                    </CardTitle>
                    <CardDescription>How students access the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {metrics.deviceUsage.map((device, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{device.device}</span>
                            <div className="text-sm text-gray-600">{device.users} users</div>
                          </div>
                          <Progress value={device.engagement} className="h-2" />
                          <div className="text-sm text-gray-600">{device.engagement}% engagement</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activities" className="space-y-6">
              <div className="grid gap-6">
                {metrics.activities.map((activity, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{activity.name}</span>
                        <Badge variant={activity.trend === 'up' ? 'default' : activity.trend === 'down' ? 'destructive' : 'secondary'}>
                          {activity.engagement}% engagement
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-3 border rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {activity.views || activity.submissions || activity.posts || activity.attempts || activity.sessions}
                          </div>
                          <div className="text-sm text-gray-600">
                            {activity.views && 'Total Views'}
                            {activity.submissions && 'Submissions'}
                            {activity.posts && 'Forum Posts'}
                            {activity.attempts && 'Quiz Attempts'}
                            {activity.sessions && 'Lab Sessions'}
                          </div>
                        </div>
                        <div className="text-center p-3 border rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{activity.engagement}%</div>
                          <div className="text-sm text-gray-600">Engagement Rate</div>
                        </div>
                        <div className="text-center p-3 border rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{activity.completion || activity.avgScore || activity.participation}%</div>
                          <div className="text-sm text-gray-600">
                            {activity.completion && 'Completion'}
                            {activity.avgScore && 'Avg Score'}
                            {activity.participation && 'Participation'}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="grid gap-4">
                {metrics.topStudents.map((student, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="font-bold text-blue-600">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium">{student.name}</h3>
                            <p className="text-sm text-gray-600">
                              {student.activities} activities • {student.hours} hours • {student.streak} day streak
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={student.engagement >= 90 ? 'default' : 'secondary'}>
                            {student.engagement}% engaged
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Trends</CardTitle>
                  <CardDescription>Track engagement changes over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    {metrics.trends.map((trend, index) => (
                      <div key={index} className="text-center p-4 border rounded-lg">
                        <p className="text-sm text-gray-600">{trend.period}</p>
                        <p className="text-xl font-bold text-blue-600">{trend.engagement}%</p>
                        <p className="text-sm text-gray-500">Engagement</p>
                        <p className="text-lg font-semibold text-green-600">{trend.performance}%</p>
                        <p className="text-xs text-gray-500">Performance</p>
                        <p className="text-sm font-medium text-purple-600">{trend.active}</p>
                        <p className="text-xs text-gray-500">Active Users</p>
                        {index > 0 && trend.engagement > metrics.trends[index-1].engagement && (
                          <div className="text-xs text-green-600 mt-1">↗ Improving</div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid gap-4">
                <Card className="border-l-4 border-l-green-500 bg-green-50/30">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-green-500" />
                          <h3 className="font-medium">Peak Engagement Pattern</h3>
                          <Badge variant="outline" className="text-xs">Insight</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Students show 23% higher engagement during 16:00-18:00. Consider scheduling important content during these hours.
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">AI Confidence:</span>
                          <Badge className="bg-green-50 text-green-700 border-green-200">94%</Badge>
                        </div>
                      </div>
                      <Button size="sm">
                        Optimize Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500 bg-blue-50/30">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-blue-500" />
                          <h3 className="font-medium">Mobile Engagement Opportunity</h3>
                          <Badge variant="outline" className="text-xs">Suggestion</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Mobile users have 15% lower engagement. Optimize mobile experience to boost overall participation.
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Impact:</span>
                          <span className="text-xs font-medium">35 students affected</span>
                        </div>
                      </div>
                      <Button size="sm">
                        Improve Mobile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}