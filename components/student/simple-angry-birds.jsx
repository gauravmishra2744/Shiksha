"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SimpleAngryBirds() {
  const canvasRef = useRef(null);
  const [bird, setBird] = useState({ x: 100, y: 300, vx: 0, vy: 0, launched: false });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 100, y: 300 });
  const [dragEnd, setDragEnd] = useState({ x: 100, y: 300 });
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('playing'); // playing, question, completed
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  
  const [targets, setTargets] = useState([
    { x: 600, y: 280, width: 40, height: 40, hit: false },
    { x: 700, y: 250, width: 40, height: 40, hit: false }
  ]);
  
  const questions = [
    {
      question: "What is 5 + 3?",
      options: ["6", "7", "8", "9"],
      correct: 2,
      subject: "Math"
    },
    {
      question: "What gas do plants absorb from air?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correct: 2,
      subject: "Science"
    },
    {
      question: "What is 12 × 4?",
      options: ["44", "46", "48", "50"],
      correct: 2,
      subject: "Math"
    }
  ];

  // Physics loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (bird.launched) {
        setBird(prev => {
          const newX = prev.x + prev.vx;
          const newY = prev.y + prev.vy;
          const newVy = prev.vy + 0.5; // gravity
          
          // Check target hits
          targets.forEach((target, index) => {
            if (!target.hit && 
                newX > target.x - 20 && newX < target.x + target.width + 20 &&
                newY > target.y - 20 && newY < target.y + target.height + 20) {
              setTargets(prev => {
                const newTargets = prev.map((t, i) => i === index ? {...t, hit: true} : t);
                
                // Check if all targets hit
                if (newTargets.every(t => t.hit)) {
                  setTimeout(() => {
                    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
                    setCurrentQuestion(randomQuestion);
                    setGameState('question');
                  }, 1000);
                }
                
                return newTargets;
              });
              console.log('Target hit!');
            }
          });
          
          // Bounds check
          if (newX > 800 || newY > 400 || newX < 0) {
            return { x: 100, y: 300, vx: 0, vy: 0, launched: false };
          }
          
          return { x: newX, y: newY, vx: prev.vx, vy: newVy, launched: true };
        });
      }
    }, 16);
    
    return () => clearInterval(interval);
  }, [bird.launched, targets]);

  // Drawing loop
  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 800, 400);
      
      // Background
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, 800, 400);
      
      // Ground
      ctx.fillStyle = '#90EE90';
      ctx.fillRect(0, 350, 800, 50);
      
      // Slingshot
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(80, 350);
      ctx.lineTo(80, 250);
      ctx.moveTo(120, 350);
      ctx.lineTo(120, 250);
      ctx.stroke();
      
      // Slingshot rubber band when dragging
      if (isDragging && !bird.launched) {
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(80, 260);
        ctx.lineTo(dragEnd.x, dragEnd.y);
        ctx.lineTo(120, 260);
        ctx.stroke();
        
        // Trajectory preview
        const power = Math.min(Math.sqrt(
          Math.pow(100 - dragEnd.x, 2) + Math.pow(300 - dragEnd.y, 2)
        ) / 3, 20);
        const angle = Math.atan2(300 - dragEnd.y, 100 - dragEnd.x);
        
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(dragEnd.x, dragEnd.y);
        
        // Draw trajectory dots
        for (let i = 1; i <= 10; i++) {
          const t = i * 0.1;
          const x = dragEnd.x + (Math.cos(angle) * power * t * 20);
          const y = dragEnd.y + (Math.sin(angle) * power * t * 20) + (0.5 * t * t * 100);
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.setLineDash([]);
      }
      
      // Bird
      const birdX = isDragging && !bird.launched ? dragEnd.x : bird.x;
      const birdY = isDragging && !bird.launched ? dragEnd.y : bird.y;
      
      ctx.fillStyle = '#FF4444';
      ctx.beginPath();
      ctx.arc(birdX, birdY, 15, 0, Math.PI * 2);
      ctx.fill();
      
      // Bird eyes
      ctx.fillStyle = '#FFF';
      ctx.beginPath();
      ctx.arc(birdX - 5, birdY - 3, 3, 0, Math.PI * 2);
      ctx.arc(birdX + 5, birdY - 3, 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(birdX - 5, birdY - 3, 1, 0, Math.PI * 2);
      ctx.arc(birdX + 5, birdY - 3, 1, 0, Math.PI * 2);
      ctx.fill();
      
      // Debug info
      ctx.fillStyle = '#000';
      ctx.font = '16px Arial';
      ctx.fillText(`Position: ${Math.round(bird.x)}, ${Math.round(bird.y)}`, 10, 30);
      ctx.fillText(`Velocity: ${Math.round(bird.vx)}, ${Math.round(bird.vy)}`, 10, 50);
      ctx.fillText(`Launched: ${bird.launched}`, 10, 70);
      
      // Targets
      targets.forEach(target => {
        if (!target.hit) {
          ctx.fillStyle = '#FF6B6B';
          ctx.fillRect(target.x, target.y, target.width, target.height);
          
          // Target crosshair
          ctx.strokeStyle = '#FFF';
          ctx.lineWidth = 2;
          ctx.beginPath();
          const centerX = target.x + target.width/2;
          const centerY = target.y + target.height/2;
          ctx.moveTo(centerX - 10, centerY);
          ctx.lineTo(centerX + 10, centerY);
          ctx.moveTo(centerX, centerY - 10);
          ctx.lineTo(centerX, centerY + 10);
          ctx.stroke();
        } else {
          // Hit target - show explosion effect
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(target.x + target.width/2, target.y + target.height/2, 20, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };
    
    const animationLoop = () => {
      draw();
      requestAnimationFrame(animationLoop);
    };
    
    animationLoop();
  }, [bird, targets]);

  const launch = (vx, vy) => {
    console.log(`Launching bird with velocity: ${vx}, ${vy}`);
    setBird({ x: 100, y: 300, vx, vy, launched: true });
  };
  
  const nextLevel = () => {
    const newLevel = level + 1;
    setLevel(newLevel);
    setScore(prev => prev + 100);
    
    // Generate new targets for next level
    const levelTargets = {
      1: [{ x: 600, y: 280, width: 40, height: 40, hit: false }, { x: 700, y: 250, width: 40, height: 40, hit: false }],
      2: [{ x: 550, y: 300, width: 35, height: 35, hit: false }, { x: 650, y: 200, width: 35, height: 35, hit: false }, { x: 720, y: 270, width: 35, height: 35, hit: false }],
      3: [{ x: 500, y: 320, width: 30, height: 30, hit: false }, { x: 600, y: 180, width: 30, height: 30, hit: false }, { x: 700, y: 250, width: 30, height: 30, hit: false }, { x: 750, y: 300, width: 30, height: 30, hit: false }]
    };
    
    setTargets(levelTargets[newLevel] || levelTargets[1]);
    setBird({ x: 100, y: 300, vx: 0, vy: 0, launched: false });
    setGameState('playing');
  };
  
  const handleAnswer = (answerIndex) => {
    if (answerIndex === currentQuestion.correct) {
      // Correct answer
      setScore(prev => prev + 200);
      nextLevel();
    } else {
      // Wrong answer - restart level
      setTargets(prev => prev.map(t => ({...t, hit: false})));
      setBird({ x: 100, y: 300, vx: 0, vy: 0, launched: false });
      setGameState('playing');
    }
    setCurrentQuestion(null);
  };

  // Question screen
  if (gameState === 'question' && currentQuestion) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">🎉 All Targets Hit!</h1>
          <p className="text-lg text-muted-foreground">Answer this question to advance to Level {level + 1}</p>
        </div>
        
        <Card className="max-w-2xl mx-auto border-2 border-blue-400">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">
                {currentQuestion.subject === 'Math' ? '🔢' : '🌱'}
              </div>
              <h2 className="text-2xl font-bold mb-2">{currentQuestion.subject} Question</h2>
              <p className="text-xl">{currentQuestion.question}</p>
            </div>
            
            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className="text-left justify-start h-auto p-4 text-lg hover:scale-105 transition-transform"
                  onClick={() => handleAnswer(index)}
                >
                  <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold mr-4">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </Button>
              ))}
            </div>
            
            <div className="text-center mt-6 text-sm text-muted-foreground">
              ✨ Choose the correct answer to unlock the next level!
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">🎯 Edu Birds - Level {level}</h1>
        <div className="flex gap-4">
          <span className="text-lg font-semibold">🏆 Score: {score}</span>
          <span className="text-lg font-semibold">🎯 Targets: {targets.filter(t => t.hit).length}/{targets.length}</span>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="border rounded-lg w-full cursor-crosshair"
            style={{ maxWidth: '100%', height: 'auto' }}
            onMouseDown={(e) => {
              if (bird.launched) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) * (800 / rect.width);
              const y = (e.clientY - rect.top) * (400 / rect.height);
              
              // Only start drag if near bird
              if (Math.sqrt(Math.pow(x - 100, 2) + Math.pow(y - 300, 2)) < 50) {
                setIsDragging(true);
                setDragStart({ x: 100, y: 300 });
                setDragEnd({ x, y });
              }
            }}
            onMouseMove={(e) => {
              if (!isDragging || bird.launched) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) * (800 / rect.width);
              const y = (e.clientY - rect.top) * (400 / rect.height);
              
              // Limit drag distance
              const maxDist = 80;
              const dx = x - 100;
              const dy = y - 300;
              const dist = Math.sqrt(dx * dx + dy * dy);
              
              if (dist > maxDist) {
                const ratio = maxDist / dist;
                setDragEnd({ x: 100 + dx * ratio, y: 300 + dy * ratio });
              } else {
                setDragEnd({ x, y });
              }
            }}
            onMouseUp={() => {
              if (!isDragging || bird.launched) return;
              
              // Calculate launch velocity
              const power = Math.min(Math.sqrt(
                Math.pow(100 - dragEnd.x, 2) + Math.pow(300 - dragEnd.y, 2)
              ) / 3, 20);
              const angle = Math.atan2(300 - dragEnd.y, 100 - dragEnd.x);
              
              const vx = Math.cos(angle) * power;
              const vy = Math.sin(angle) * power;
              
              console.log(`Launching: power=${power}, angle=${angle}, vx=${vx}, vy=${vy}`);
              
              setBird({ x: dragEnd.x, y: dragEnd.y, vx, vy, launched: true });
              setIsDragging(false);
              setDragEnd({ x: 100, y: 300 });
            }}
          />
        </CardContent>
      </Card>
      
      <div className="flex gap-2">
        <Button onClick={() => launch(8, -10)} disabled={bird.launched}>
          🚀 Launch Low
        </Button>
        <Button onClick={() => launch(12, -14)} disabled={bird.launched}>
          🚀 Launch Mid  
        </Button>
        <Button onClick={() => launch(16, -18)} disabled={bird.launched}>
          🚀 Launch High
        </Button>
        <Button onClick={() => setBird({ x: 100, y: 300, vx: 0, vy: 0, launched: false })}>
          🔄 Reset
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground space-y-2">
        <p><strong>How to play:</strong></p>
        <p>1. Click and drag the red bird backwards from the slingshot</p>
        <p>2. You'll see a trajectory preview (white dots)</p>
        <p>3. Release to launch the bird towards the red targets</p>
        <p>4. Hit all targets to win!</p>
        <p className="text-green-600 font-semibold">Targets hit: {targets.filter(t => t.hit).length}/{targets.length}</p>
        {targets.every(t => t.hit) && (
          <p className="text-blue-600 font-bold animate-pulse">🎉 All targets hit! Question coming up...</p>
        )}
      </div>
    </div>
  );
}