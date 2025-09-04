"use client";

import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";


import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addMission, getMissions } from "@/lib/storage";

export default function StudentsMissionsPage() {
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");

  function handleCreate(e) {
    e.preventDefault();
    if (!title.trim()) return setMsg("Enter mission title");
    const m = { id: Date.now().toString(), title: title.trim() };
    addMission(m);
    setTitle("");
    setMsg("Mission created");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Fun Tasks / Daily Missions</CardTitle>
              <CardDescription>Assign challenges to students.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="flex gap-2">
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Mission title" className="input px-3 py-2 border-2 border-border rounded-base flex-1" />
                <Button type="submit">Create Mission</Button>
              </form>
              <div className="mt-3 text-sm">{msg}</div>
              <div className="mt-4">
                <h4 className="font-semibold">Missions</h4>
                <ul className="mt-2">
                  {getMissions().map((m) => (<li key={m.id}>{m.title}</li>))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
