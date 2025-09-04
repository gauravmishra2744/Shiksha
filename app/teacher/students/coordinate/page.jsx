"use client";

import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentsCoordinatePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Make a Student Coordinate</CardTitle>
              <CardDescription>Assign student coordinator roles.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Placeholder to assign coordinator.</p>
              <Button>Assign</Button>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
