"use client";

import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { addStudent, getStudents, deleteStudent } from "@/lib/storage";

export default function StudentsManagePage() {
  const [name, setName] = useState("");

  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  function handleAdd(e) {
    e.preventDefault();
    if (!name.trim()) return;
  const s = { id: Date.now().toString(), name: name.trim() };
  addStudent(s);
  setStudents((st) => [...st, s]);
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
              <CardTitle>Manage Students</CardTitle>
              <CardDescription>Create, update or remove student records.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="flex gap-2 mb-4">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student name" className="input px-3 py-2 border-2 border-border rounded-base flex-1" />
                <Button type="submit">Add Student</Button>
              </form>
              <div>
                <h4 className="font-semibold">Students</h4>
                <ul className="mt-2 space-y-2">
          {students.map((s) => (
                    <li key={s.id} className="flex justify-between items-center">
                      <span>{s.name}</span>
            <Button onClick={() => { deleteStudent(s.id); setStudents(getStudents()); }} variant="neutral">Delete</Button>
                    </li>
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
