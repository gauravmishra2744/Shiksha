"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, RotateCcw, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function FlashcardsPageContentI18n() {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [flipped, setFlipped] = useState({});

  const flashcards = [
    {
      id: 1,
      front: "What is photosynthesis?",
      back: "The process by which plants make food using sunlight, water, and carbon dioxide",
      subject: "Biology"
    },
    {
      id: 2,
      front: "Solve: 2x + 5 = 15",
      back: "x = 5",
      subject: "Mathematics"
    }
  ];

  const toggleFlip = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('notes.myFlashcards')}</h1>
          <p className="text-muted-foreground">{t('notebook.flashcards')}</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          {t('notes.createFlashcard')}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{t('notes.createFlashcard')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">{t('notes.front')}</label>
              <Textarea placeholder="Enter question or term..." />
            </div>
            <div>
              <label className="text-sm font-medium">{t('notes.back')}</label>
              <Textarea placeholder="Enter answer or definition..." />
            </div>
            <div className="flex gap-2">
              <Button>{t('common.save')}</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                {t('common.cancel')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {flashcards.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {flashcards.map((card) => (
            <Card key={card.id} className="cursor-pointer" onClick={() => toggleFlip(card.id)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{card.subject}</Badge>
                  <Button variant="ghost" size="sm">
                    {flipped[card.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="min-h-[100px] flex items-center justify-center text-center">
                  <p className="text-sm">
                    {flipped[card.id] ? card.back : card.front}
                  </p>
                </div>
                <div className="text-center mt-4">
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    toggleFlip(card.id);
                  }}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Flip
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No flashcards yet</h3>
            <p className="text-muted-foreground">Create flashcards to help memorize important concepts</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}