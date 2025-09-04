"use client";

import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getStudents } from "@/lib/storage";

export default function StudentsBadgesPage() {
  const [msg, setMsg] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  function awardBadge(name) {
    setMsg(`Awarded badge to ${name}`);
    setTimeout(() => setMsg(""), 2000);
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Give Badges</CardTitle>
              <CardDescription>Award badges to students.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {students.map((s) => (
                  <li key={s.id} className="flex justify-between items-center">
                    <span>{s.name}</span>
                    <Button onClick={() => awardBadge(s.name)}>Award</Button>
                  </li>
                ))}
              </ul>
              <div className="mt-2 text-sm">{msg}</div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
