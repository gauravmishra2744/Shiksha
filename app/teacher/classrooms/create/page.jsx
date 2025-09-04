"use client";

import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { addClassroom, getClassrooms } from "@/lib/storage";

export default function CreateClassroomPage() {
  const [name, setName] = useState("");
  const [created, setCreated] = useState(null);
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    setClassrooms(getClassrooms());
  }, []);

  function handleCreate(e) {
    e.preventDefault();
    if (!name.trim()) return;
    const cls = { id: Date.now().toString(), name: name.trim() };
  addClassroom(cls);
  setCreated(cls);
  setClassrooms((s) => [...s, cls]);
    setName("");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Create a Classroom</CardTitle>
              <CardDescription>Quickly create a new classroom for your students.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="flex gap-2">
                <input value={name} onChange={(e) => setName(e.target.value)} className="input px-3 py-2 border-2 border-border rounded-base flex-1" placeholder="Classroom name (e.g., Grade 10 - A)" />
                <Button type="submit">Create</Button>
              </form>

              {created && (
                <div className="mt-4 text-sm">Created classroom: <strong>{created.name}</strong></div>
              )}

              <div className="mt-4">
                <h4 className="font-semibold">Existing classrooms</h4>
                <ul className="mt-2">
                  {classrooms.map((c) => (
                    <li key={c.id} className="py-1">{c.name}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
