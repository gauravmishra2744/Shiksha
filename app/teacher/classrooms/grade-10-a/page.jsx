"use client";

import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClassroomDetailPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Grade 10 - A</CardTitle>
              <CardDescription>Teacher view for this class.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-3">Students: 30</p>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild><a href="/teacher/students">View all students</a></Button>
                <Button asChild><a href="/teacher/students/upload">Upload study content</a></Button>
                <Button asChild><a href="/teacher/students/manage">Manage students (CRUD)</a></Button>
                <Button asChild><a href="/teacher/students/badges">Give Badges</a></Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
