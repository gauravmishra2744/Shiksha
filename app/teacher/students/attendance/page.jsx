"use client";

import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getClassrooms, addAttendance, getAttendance } from "@/lib/storage";

export default function StudentsAttendancePage() {
  const [classroom, setClassroom] = useState("");
  const [msg, setMsg] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setClassrooms(getClassrooms());
    setRecords(getAttendance());
  }, []);

  function mark() {
    if (!classroom) return setMsg("Select classroom");
    const rec = { id: Date.now().toString(), classroom, date: new Date().toISOString() };
    addAttendance(rec);
    setRecords((r) => [...r, rec]);
    setMsg("Attendance recorded");
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
              <CardTitle>Attendance / Report Cards</CardTitle>
              <CardDescription>Mark attendance and view report cards.</CardDescription>
            </CardHeader>
            <CardContent>
              <select value={classroom} onChange={(e) => setClassroom(e.target.value)} className="input px-3 py-2 border-2 border-border rounded-base mb-2">
                <option value="">Select classroom</option>
                {classrooms.map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}
              </select>
              <div className="flex gap-2">
                <Button onClick={mark}>Mark Attendance</Button>
                <div className="text-sm self-center">{msg}</div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold">Recent attendance records</h4>
                <ul className="mt-2">
                  {records.slice(-5).reverse().map((r) => (<li key={r.id}>{r.classroom} — {new Date(r.date).toLocaleString()}</li>))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
