import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function StudentsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>View and manage students across classes.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li><Link href="/teacher/students/manage">Manage students</Link></li>
                <li><Link href="/teacher/students/upload">Upload study content</Link></li>
                <li><Link href="/teacher/students/badges">Give badges</Link></li>
                <li><Link href="/teacher/students/attendance">Attendance / Report Cards</Link></li>
                <li><Link href="/teacher/students/coordinate">Make a student Coordinate</Link></li>
                <li><Link href="/teacher/students/missions">Fun tasks / Daily missions</Link></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
