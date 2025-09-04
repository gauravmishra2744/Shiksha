"use client";

import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { addContent, getContent, getClassrooms } from "@/lib/storage";

export default function StudentsUploadPage() {
  const [title, setTitle] = useState("");
  const [classroom, setClassroom] = useState("");

  const [classrooms, setClassrooms] = useState([]);
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    setClassrooms(getClassrooms());
    setContentList(getContent());
  }, []);

  function handleUpload(e) {
    e.preventDefault();
    if (!title || !classroom) return;
  const item = { id: Date.now().toString(), title, classroom };
  addContent(item);
  setContentList((s) => [...s, item]);
  setTitle("");
  setClassroom("");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Study Content</CardTitle>
              <CardDescription>Upload content for students in this class.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="grid gap-2">
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Content title" className="input px-3 py-2 border-2 border-border rounded-base" />
                <select value={classroom} onChange={(e) => setClassroom(e.target.value)} className="input px-3 py-2 border-2 border-border rounded-base">
                  <option value="">Select classroom</option>
                  {classrooms.map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}
                </select>
                <Button type="submit">Upload</Button>
              </form>

              <div className="mt-4">
                <h4 className="font-semibold">Uploaded content</h4>
                <ul className="mt-2">
                  {contentList.map((c) => (<li key={c.id}>{c.title} — {c.classroom}</li>))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
