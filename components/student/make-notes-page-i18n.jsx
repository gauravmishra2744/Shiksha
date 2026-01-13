"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Search } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function MakeNotesContentI18n() {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);

  const notes = [
    {
      id: 1,
      title: "Algebra Basics",
      subject: "Mathematics",
      date: "2 days ago",
      preview: "Linear equations and their solutions..."
    },
    {
      id: 2,
      title: "Cell Structure",
      subject: "Biology", 
      date: "1 week ago",
      preview: "Plant and animal cell components..."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('notes.myNotes')}</h1>
          <p className="text-muted-foreground">{t('notebook.makeNotes')}</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          {t('notes.createNote')}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{t('notes.createNote')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder={t('notes.noteTitle')} />
            <Textarea placeholder={t('notes.noteContent')} rows={6} />
            <div className="flex gap-2">
              <Button>{t('notes.saveNote')}</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                {t('common.cancel')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t('common.search')} className="pl-10" />
          </div>
        </div>

        {notes.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <Card key={note.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{note.subject}</Badge>
                    <span className="text-sm text-muted-foreground">{note.date}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{note.preview}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('notes.noNotes')}</h3>
              <p className="text-muted-foreground">{t('notes.startTaking')}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}