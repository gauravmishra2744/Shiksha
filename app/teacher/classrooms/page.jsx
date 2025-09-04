"use client";

import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ClassroomsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>All Classrooms</CardTitle>
              <CardDescription>List of classrooms you manage.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li><Link href="/teacher/classrooms/grade-10-a">Grade 10 - A</Link></li>
                <li><Link href="/teacher/classrooms/grade-9-b">Grade 9 - B</Link></li>
                <li><Link href="/teacher/classrooms/grade-8-c">Grade 8 - C</Link></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
