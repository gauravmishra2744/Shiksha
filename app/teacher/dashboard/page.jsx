// Teacher dashboard page mirroring student dashboard layout
import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Home, BookOpen, User2, FilePlus, CheckSquare, Megaphone, Gift } from "lucide-react";

export default function TeacherDashboardPage() {
  const teacherName = "Ms. Priya";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
          {/* Hero */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="col-span-2 rounded-base p-6 flex items-center gap-4 shadow-sm border-2 border-border bg-secondary-background">
              {/* vertical accent */}
              <div className="hidden md:block w-1.5 h-16 rounded-full bg-main/80" aria-hidden />
              <Avatar>
                <img src="/avatars/teacher.jpg" alt="teacher avatar" />
              </Avatar>
              <div>
                <h1 className="text-3xl font-heading">Welcome back, {teacherName} 👋</h1>
                <p className="text-sm opacity-90">Here’s what’s happening in your classrooms today.</p>
                <div className="mt-3 flex gap-2">
                  <Button asChild><a href="/teacher/classrooms">All Classrooms</a></Button>
                  <Button variant="neutral" asChild><a href="/teacher/classrooms/create">+ New Classroom</a></Button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <Card className="p-4">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Shortcuts for common tasks</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button asChild>
                    <a href="/teacher/classrooms/create"><FilePlus /> Create</a>
                  </Button>
                  <Button asChild>
                    <a href="/teacher/content/add"><BookOpen /> Content</a>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button asChild>
                    <a href="/teacher/students/attendance"><CheckSquare /> Attendance</a>
                  </Button>
                  <Button asChild>
                    <a href="/teacher/content/notice"><Megaphone /> Notice</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-base p-4 bg-secondary-background text-foreground shadow-sm border-2 border-border flex items-center gap-4">
              <div className="p-3 rounded-full bg-main/10 text-main-foreground"><Home className="size-5" /></div>
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm opacity-90">Total Classrooms</div>
              </div>
            </div>

            <div className="rounded-base p-4 bg-secondary-background text-foreground shadow-sm border-2 border-border flex items-center gap-4">
              <div className="p-3 rounded-full bg-emerald-500/15 text-emerald-500"><User2 className="size-5" /></div>
              <div>
                <div className="text-2xl font-bold">120</div>
                <div className="text-sm opacity-90">Total Students</div>
              </div>
            </div>

            <div className="rounded-base p-4 bg-secondary-background text-foreground shadow-sm border-2 border-border flex items-center gap-4">
              <div className="p-3 rounded-full bg-rose-500/15 text-rose-500"><Gift className="size-5" /></div>
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm opacity-90">Pending Doubts</div>
              </div>
            </div>

            <div className="rounded-base p-4 bg-secondary-background text-foreground shadow-sm border-2 border-border flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-400/15 text-yellow-600"><FilePlus className="size-5" /></div>
              <div>
                <div className="text-2xl font-bold">54</div>
                <div className="text-sm opacity-90">Content Uploaded</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Timeline of recent teacher actions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>Created classroom "Grade 10 - A" • 2 hours ago</li>
                  <li>Uploaded new content "Chapter 5 - Algebra" • Yesterday</li>
                  <li>Marked attendance for "Grade 9 - B" • 1 day ago</li>
                  <li>Gave badges to top performers • 3 days ago</li>
                </ul>
              </CardContent>
            </Card>

            {/* Notices / Announcements */}
            <Card>
              <CardHeader>
                <CardTitle>Notices</CardTitle>
                <CardDescription>Pinned announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="rounded-base border-2 border-border px-3 py-2">Tomorrow’s class will be online.</div>
                  <div className="rounded-base border-2 border-border px-3 py-2">Weekly test scheduled on Friday.</div>
                </div>
              </CardContent>
            </Card>

            {/* Fun Tasks / Missions */}
            <Card>
              <CardHeader>
                <CardTitle>Fun Tasks / Missions</CardTitle>
                <CardDescription>Assign daily challenges to students</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Solve 5 MCQs today</li>
                  <li>Submit an extra note</li>
                </ul>
                <div className="mt-3">
                  <Button asChild>
                    <a href="/teacher/students/missions">Create Mission</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
