"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function ViewNotesContentI18n() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const notes = [
    {
      id: 1,
      title: "Algebra Basics",
      subject: "Mathematics",
      date: "2024-01-15",
      content: "Linear equations are mathematical statements that show the relationship between variables. They can be written in the form ax + b = c, where a, b, and c are constants and x is the variable we need to solve for.",
      tags: ["algebra", "equations", "math"]
    },
    {
      id: 2,
      title: "Cell Structure",
      subject: "Biology",
      date: "2024-01-14",
      content: "Plant and animal cells have several components in common, including the cell membrane, nucleus, and cytoplasm. However, plant cells also have unique structures like cell walls and chloroplasts.",
      tags: ["biology", "cells", "structure"]
    },
    {
      id: 3,
      title: "Newton's Laws",
      subject: "Physics",
      date: "2024-01-13",
      content: "Newton's three laws of motion describe the relationship between forces acting on a body and its motion. The first law states that objects at rest stay at rest unless acted upon by an external force.",
      tags: ["physics", "motion", "newton"]
    }
  ];

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('notes.viewAll')} {t('notes.myNotes')}</h1>
          <p className="text-muted-foreground">{t('notebook.viewNotes')}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('common.search')}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          {t('common.filter')}
        </Button>
      </div>

      {filteredNotes.length > 0 ? (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{note.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{note.subject}</Badge>
                      <span className="text-sm text-muted-foreground">{note.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {note.content}
                </p>
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {searchTerm ? "No notes found" : t('notes.noNotes')}
            </h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? "Try adjusting your search terms" 
                : t('notes.startTaking')
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}