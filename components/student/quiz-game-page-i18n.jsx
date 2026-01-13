"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function QuizGamePageContentI18n() {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const questions = [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: 1
    },
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      correct: 1
    }
  ];

  const handleAnswer = (answerIndex) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{t('quiz.quizCompleted')}</h1>
        </div>

        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Trophy className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">{t('gameCommon.wellDone')}</h2>
            <div className="text-4xl font-bold mb-2">{score}/{questions.length}</div>
            <p className="text-muted-foreground mb-6">{t('quiz.yourScore')}</p>
            <Button onClick={resetQuiz} className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              {t('quiz.playAgain')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('games.playQuizzes')}</h1>
          <p className="text-muted-foreground">{t('quiz.question')} {currentQuestion + 1} of {questions.length}</p>
        </div>
        <Badge variant="secondary">
          {t('quiz.score')}: {score}
        </Badge>
      </div>

      <Progress value={progress} className="w-full" />

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {questions[currentQuestion].question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              variant={
                answered
                  ? index === questions[currentQuestion].correct
                    ? "default"
                    : index === selectedAnswer
                    ? "destructive"
                    : "outline"
                  : "outline"
              }
              className="w-full justify-start text-left h-auto p-4"
              onClick={() => handleAnswer(index)}
              disabled={answered}
            >
              <div className="flex items-center gap-3">
                {answered && (
                  <>
                    {index === questions[currentQuestion].correct && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {index === selectedAnswer && index !== questions[currentQuestion].correct && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </>
                )}
                <span>{option}</span>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {answered && (
        <div className="text-center">
          <Button onClick={nextQuestion} size="lg">
            {currentQuestion < questions.length - 1 ? t('quiz.nextQuestion') : t('common.finish')}
          </Button>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('gameCommon.score')} {t('common.summary')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <p className="text-sm text-muted-foreground">{t('quiz.correct')}</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{currentQuestion + 1 - score}</div>
              <p className="text-sm text-muted-foreground">{t('quiz.incorrect')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}