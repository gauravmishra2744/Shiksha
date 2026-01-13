"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Plus, Search } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function DoubtsPageContentI18n() {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);

  const doubts = [
    {
      id: 1,
      title: "How to solve quadratic equations?",
      subject: "Mathematics",
      date: "2 days ago",
      replies: 3,
      status: "answered"
    },
    {
      id: 2,
      title: "Explain photosynthesis process",
      subject: "Biology",
      date: "1 week ago",
      replies: 1,
      status: "pending"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('doubts.myDoubts')}</h1>
          <p className="text-muted-foreground">{t('subjects.askYourDoubts')}</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          {t('doubts.askQuestion')}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{t('doubts.askQuestion')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder={t('doubts.questionTitle')} />
            <Textarea placeholder={t('doubts.questionDescription')} />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t('doubts.subject')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">{t('subjects.mathematics')}</SelectItem>
                <SelectItem value="physics">{t('subjects.physics')}</SelectItem>
                <SelectItem value="chemistry">{t('subjects.chemistry')}</SelectItem>
                <SelectItem value="biology">{t('subjects.biology')}</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button>{t('doubts.submitQuestion')}</Button>
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

        {doubts.length > 0 ? (
          <div className="space-y-4">
            {doubts.map((doubt) => (
              <Card key={doubt.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{doubt.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{doubt.subject}</Badge>
                        <span className="text-sm text-muted-foreground">{doubt.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{doubt.replies}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('doubts.noDoubts')}</h3>
              <p className="text-muted-foreground">{t('doubts.startAsking')}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}