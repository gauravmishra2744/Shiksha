"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, RotateCcw, Play, Pause, Coins, Flame, Star, Zap, Shield, Rocket } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function EduBirdsGame() {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Game state
  const [gameState, setGameState] = useState('menu'); // menu, playing, question, completed
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState(1);
  
  // Enhanced game features
  const [coins, setCoins] = useState(100);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);
  const [powerUps, setPowerUps] = useState({ multiShot: 0, bigBird: 0, explosive: 0 });
  const [activePowerUp, setActivePowerUp] = useState(null);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [lastPlayDate, setLastPlayDate] = useState(null);
  const [selectedBird, setSelectedBird] = useState('red');
  const [selectedTheme, setSelectedTheme] = useState('konark');
  const [particles, setParticles] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [power, setPower] = useState(0);
  const [angle, setAngle] = useState(45);
  const [isCharging, setIsCharging] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  
  // Physics objects
  const [bird, setBird] = useState({ x: 100, y: 300, vx: 0, vy: 0, launched: false });
  const [targets, setTargets] = useState([]);
  const [obstacles, setObstacles] = useState([]);

  // Comprehensive STEM question bank
  const questionBank = {
    mathematics: [
      { q: "What is 5 + 3?", opts: ["6", "7", "8", "9"], correct: 2, coins: 10, concept: "Addition" },
      { q: "What is 12 × 4?", opts: ["44", "46", "48", "50"], correct: 2, coins: 15, concept: "Multiplication" },
      { q: "Solve: 2x + 6 = 14", opts: ["x = 2", "x = 4", "x = 6", "x = 8"], correct: 1, coins: 25, concept: "Algebra" },
      { q: "What is the area of a circle with radius 3?", opts: ["6π", "9π", "12π", "18π"], correct: 1, coins: 30, concept: "Geometry" }
    ],
    physics: [
      { q: "What is the unit of force?", opts: ["Joule", "Newton", "Watt", "Pascal"], correct: 1, coins: 20, concept: "Mechanics" },
      { q: "Speed of light in vacuum?", opts: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10¹⁰ m/s", "3×10⁴ m/s"], correct: 0, coins: 25, concept: "Optics" },
      { q: "What causes tides?", opts: ["Sun", "Moon", "Earth's rotation", "Wind"], correct: 1, coins: 20, concept: "Gravitation" }
    ],
    chemistry: [
      { q: "What is H₂O?", opts: ["Hydrogen", "Oxygen", "Water", "Acid"], correct: 2, coins: 15, concept: "Compounds" },
      { q: "Atomic number of Carbon?", opts: ["4", "6", "8", "12"], correct: 1, coins: 20, concept: "Periodic Table" }
    ],
    biology: [
      { q: "What gas do plants absorb?", opts: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2, coins: 15, concept: "Photosynthesis" },
      { q: "Largest organ in human body?", opts: ["Heart", "Brain", "Liver", "Skin"], correct: 3, coins: 20, concept: "Human Body" }
    ]
  };

  // Themes with Odisha culture
  const themes = {
    konark: { name: "Konark Temple", bg: "linear-gradient(135deg, #ff9a56, #ff6b6b)", unlocked: true },
    chilika: { name: "Chilika Lake", bg: "linear-gradient(135deg, #4facfe, #00f2fe)", unlocked: false },
    rathyatra: { name: "Rath Yatra", bg: "linear-gradient(135deg, #ffeaa7, #fab1a0)", unlocked: false },
    tribal: { name: "Tribal Art", bg: "linear-gradient(135deg, #6c5ce7, #a29bfe)", unlocked: false }
  };

  // Bird characters with abilities
  const birdTypes = {
    red: { name: "Jagannath Bird", ability: "Standard", unlocked: true, cost: 0 },
    blue: { name: "Chilika Bird", ability: "Speed Boost", unlocked: false, cost: 500 },
    yellow: { name: "Thunder Bird", ability: "Electric Shock", unlocked: false, cost: 1000 },
    green: { name: "Forest Bird", ability: "Multi-Hit", unlocked: false, cost: 1500 }
  };

  // Badge system
  const badgeDefinitions = {
    mathWizard: { name: "Math Wizard", desc: "Solve 10 math problems", icon: "🧙‍♂️", requirement: 10 },
    physicsExpert: { name: "Physics Expert", desc: "Master 5 physics concepts", icon: "⚡", requirement: 5 },
    streakMaster: { name: "Streak Master", desc: "7-day login streak", icon: "🔥", requirement: 7 },
    coinCollector: { name: "Coin Collector", desc: "Collect 1000 coins", icon: "💰", requirement: 1000 }
  };

  // Load saved progress and check daily streak
  useEffect(() => {
    const savedData = {
      highScore: localStorage.getItem('eduBirds-highScore'),
      unlockedLevels: localStorage.getItem('eduBirds-unlockedLevels'),
      coins: localStorage.getItem('eduBirds-coins'),
      streak: localStorage.getItem('eduBirds-streak'),
      badges: localStorage.getItem('eduBirds-badges'),
      powerUps: localStorage.getItem('eduBirds-powerUps'),
      lastPlayDate: localStorage.getItem('eduBirds-lastPlayDate'),
      selectedBird: localStorage.getItem('eduBirds-selectedBird'),
      selectedTheme: localStorage.getItem('eduBirds-selectedTheme')
    };
    
    if (savedData.highScore) setHighScore(parseInt(savedData.highScore));
    if (savedData.unlockedLevels) setUnlockedLevels(parseInt(savedData.unlockedLevels));
    if (savedData.coins) setCoins(parseInt(savedData.coins));
    if (savedData.badges) setBadges(JSON.parse(savedData.badges));
    if (savedData.powerUps) setPowerUps(JSON.parse(savedData.powerUps));
    if (savedData.selectedBird) setSelectedBird(savedData.selectedBird);
    if (savedData.selectedTheme) setSelectedTheme(savedData.selectedTheme);
    
    // Check daily streak
    const today = new Date().toDateString();
    const lastPlay = savedData.lastPlayDate;
    
    if (lastPlay) {
      const lastDate = new Date(lastPlay);
      const todayDate = new Date(today);
      const diffTime = todayDate - lastDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Consecutive day - increment streak
        const currentStreak = parseInt(savedData.streak || '0') + 1;
        setStreak(currentStreak);
        setCoins(prev => prev + (currentStreak * 10)); // Streak bonus
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      } else if (diffDays > 1) {
        // Streak broken
        setStreak(1);
      } else {
        // Same day
        setStreak(parseInt(savedData.streak || '1'));
      }
    } else {
      setStreak(1);
    }
    
    setLastPlayDate(today);
    generateDailyChallenge();
  }, []);

  // Initialize game objects
  useEffect(() => {
    initializeLevel();
  }, [level]);

  // Save progress
  useEffect(() => {
    localStorage.setItem('eduBirds-highScore', highScore.toString());
    localStorage.setItem('eduBirds-unlockedLevels', unlockedLevels.toString());
    localStorage.setItem('eduBirds-coins', coins.toString());
    localStorage.setItem('eduBirds-streak', streak.toString());
    localStorage.setItem('eduBirds-badges', JSON.stringify(badges));
    localStorage.setItem('eduBirds-powerUps', JSON.stringify(powerUps));
    localStorage.setItem('eduBirds-lastPlayDate', lastPlayDate || '');
    localStorage.setItem('eduBirds-selectedBird', selectedBird);
    localStorage.setItem('eduBirds-selectedTheme', selectedTheme);
  }, [highScore, unlockedLevels, coins, streak, badges, powerUps, lastPlayDate, selectedBird, selectedTheme]);

  // Generate daily challenge
  const generateDailyChallenge = () => {
    const subjects = Object.keys(questionBank);
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    const questions = questionBank[randomSubject];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    setDailyChallenge({
      ...randomQuestion,
      subject: randomSubject,
      bonus: 50,
      completed: false
    });
  };

  // Get random question for level
  const getRandomQuestion = () => {
    const subjects = Object.keys(questionBank);
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    const questions = questionBank[randomSubject];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    return {
      ...randomQuestion,
      subject: randomSubject
    };
  };

  // Check and award badges
  const checkBadges = () => {
    const newBadges = [];
    
    // Math problems solved
    const mathSolved = badges.filter(b => b.includes('math')).length;
    if (mathSolved >= 10 && !badges.includes('mathWizard')) {
      newBadges.push('mathWizard');
    }
    
    // Streak achievement
    if (streak >= 7 && !badges.includes('streakMaster')) {
      newBadges.push('streakMaster');
    }
    
    // Coin collector
    if (coins >= 1000 && !badges.includes('coinCollector')) {
      newBadges.push('coinCollector');
    }
    
    if (newBadges.length > 0) {
      setBadges(prev => [...prev, ...newBadges]);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // Create particle effect
  const createParticles = (x, y, color = '#FFD700') => {
    const newParticles = [];
    for (let i = 0; i < 10; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 50,
        y: y + (Math.random() - 0.5) * 50,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        color,
        life: 1
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  const initializeLevel = () => {
    setBird({ x: 100, y: 300, vx: 0, vy: 0, launched: false });
    
    // Dynamic level generation
    const levelConfigs = {
      1: {
        targets: [{ x: 600, y: 280, width: 40, height: 40, hit: false }],
        obstacles: [{ x: 400, y: 250, width: 20, height: 150 }]
      },
      2: {
        targets: [
          { x: 550, y: 250, width: 40, height: 40, hit: false },
          { x: 650, y: 200, width: 40, height: 40, hit: false }
        ],
        obstacles: [
          { x: 350, y: 200, width: 20, height: 200 },
          { x: 450, y: 150, width: 20, height: 250 }
        ]
      },
      3: {
        targets: [
          { x: 500, y: 280, width: 35, height: 35, hit: false },
          { x: 600, y: 220, width: 35, height: 35, hit: false },
          { x: 700, y: 180, width: 35, height: 35, hit: false }
        ],
        obstacles: [
          { x: 300, y: 180, width: 25, height: 220 },
          { x: 400, y: 120, width: 25, height: 280 },
          { x: 550, y: 150, width: 25, height: 250 }
        ]
      },
      4: {
        targets: [
          { x: 450, y: 300, width: 30, height: 30, hit: false },
          { x: 550, y: 200, width: 30, height: 30, hit: false },
          { x: 650, y: 150, width: 30, height: 30, hit: false },
          { x: 720, y: 250, width: 30, height: 30, hit: false }
        ],
        obstacles: [
          { x: 250, y: 150, width: 30, height: 250 },
          { x: 350, y: 100, width: 30, height: 300 },
          { x: 500, y: 120, width: 30, height: 280 },
          { x: 600, y: 80, width: 30, height: 320 }
        ]
      },
      5: {
        targets: [
          { x: 400, y: 320, width: 25, height: 25, hit: false },
          { x: 500, y: 250, width: 25, height: 25, hit: false },
          { x: 600, y: 180, width: 25, height: 25, hit: false },
          { x: 700, y: 120, width: 25, height: 25, hit: false },
          { x: 750, y: 280, width: 25, height: 25, hit: false }
        ],
        obstacles: [
          { x: 200, y: 100, width: 35, height: 300 },
          { x: 300, y: 80, width: 35, height: 320 },
          { x: 450, y: 60, width: 35, height: 340 },
          { x: 550, y: 90, width: 35, height: 310 },
          { x: 650, y: 70, width: 35, height: 330 }
        ]
      }
    };
    
    const config = levelConfigs[level] || levelConfigs[1];
    setTargets(config.targets);
    setObstacles(config.obstacles);
  };

  // Simple physics update
  useEffect(() => {
    if (gameState === 'playing' && bird.launched) {
      const interval = setInterval(() => {
        setBird(prev => {
          const newX = prev.x + prev.vx;
          const newY = prev.y + prev.vy;
          const newVy = prev.vy + 0.5; // gravity
          
          // Check target collisions
          for (let i = 0; i < targets.length; i++) {
            const target = targets[i];
            if (!target.hit && 
                newX > target.x - 20 && newX < target.x + target.width + 20 &&
                newY > target.y - 20 && newY < target.y + target.height + 20) {
              
              // Hit target!
              setTargets(prevTargets => 
                prevTargets.map((t, idx) => idx === i ? {...t, hit: true} : t)
              );
              setScore(prevScore => prevScore + 100);
              
              // Check if all targets hit
              const updatedTargets = targets.map((t, idx) => idx === i ? {...t, hit: true} : t);
              if (updatedTargets.every(t => t.hit)) {
                setTimeout(() => {
                  setCurrentQuestion(getRandomQuestion());
                  setGameState('question');
                }, 1000);
              }
              
              return { x: 100, y: 300, vx: 0, vy: 0, launched: false };
            }
          }
          
          // Reset if out of bounds
          if (newX > 800 || newY > 400 || newX < 0) {
            return { x: 100, y: 300, vx: 0, vy: 0, launched: false };
          }
          
          return { x: newX, y: newY, vx: prev.vx, vy: newVy, launched: true };
        });
      }, 16); // ~60fps
      
      return () => clearInterval(interval);
    }
  }, [gameState, bird.launched, targets]);

  // Drawing loop
  useEffect(() => {
    if (gameState === 'playing') {
      const drawLoop = () => {
        draw();
        animationRef.current = requestAnimationFrame(drawLoop);
      };
      drawLoop();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState]);

  // Removed - physics now in game loop

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw themed background
    const theme = themes[selectedTheme];
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (selectedTheme === 'konark') {
      gradient.addColorStop(0, '#ff9a56');
      gradient.addColorStop(1, '#ff6b6b');
    } else if (selectedTheme === 'chilika') {
      gradient.addColorStop(0, '#4facfe');
      gradient.addColorStop(1, '#00f2fe');
    } else {
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(1, '#98FB98');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw cultural elements
    if (selectedTheme === 'konark') {
      // Draw sun temple silhouette
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(650, 200, 100, 150);
      ctx.fillRect(670, 180, 60, 20);
    }

    // Draw ground with texture
    ctx.fillStyle = selectedTheme === 'chilika' ? '#4A90E2' : '#90EE90';
    ctx.fillRect(0, 350, canvas.width, 50);
    
    // Add ground pattern
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 350);
      ctx.lineTo(i + 10, 360);
      ctx.stroke();
    }

    // Draw enhanced slingshot
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(80, 350);
    ctx.lineTo(80, 250);
    ctx.moveTo(120, 350);
    ctx.lineTo(120, 250);
    ctx.stroke();
    
    // Slingshot band
    if (!bird.launched) {
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(80, 260);
      ctx.lineTo(bird.x, bird.y);
      ctx.lineTo(120, 260);
      ctx.stroke();
    }

    // Draw bird with character
    const birdSize = activePowerUp === 'bigBird' ? 25 : 15;
    const birdColor = {
      red: '#FF4444',
      blue: '#4444FF',
      yellow: '#FFFF44',
      green: '#44FF44'
    }[selectedBird];
    
    // Bird shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.arc(bird.x + 2, bird.y + 2, birdSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Main bird
    ctx.fillStyle = birdColor;
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, birdSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Debug info
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.fillText(`Bird: ${Math.round(bird.x)}, ${Math.round(bird.y)}`, 10, 30);
    ctx.fillText(`Velocity: ${Math.round(bird.vx)}, ${Math.round(bird.vy)}`, 10, 50);
    ctx.fillText(`Launched: ${bird.launched}`, 10, 70);
    
    // Bird eyes
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(bird.x - 5, bird.y - 3, 3, 0, Math.PI * 2);
    ctx.arc(bird.x + 5, bird.y - 3, 3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(bird.x - 5, bird.y - 3, 1, 0, Math.PI * 2);
    ctx.arc(bird.x + 5, bird.y - 3, 1, 0, Math.PI * 2);
    ctx.fill();

    // Power-up effects
    if (activePowerUp === 'explosive') {
      ctx.strokeStyle = '#FF6600';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(bird.x, bird.y, birdSize + 10, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw trajectory line when charging
    if (isCharging && !bird.launched) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.moveTo(bird.x, bird.y);
      const endX = bird.x + Math.cos(angle * Math.PI / 180) * power * 2;
      const endY = bird.y - Math.sin(angle * Math.PI / 180) * power * 2;
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw obstacles with 3D effect
    obstacles.forEach(obstacle => {
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(obstacle.x + 3, obstacle.y + 3, obstacle.width, obstacle.height);
      
      // Main obstacle
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      
      // Highlight
      ctx.fillStyle = '#A0522D';
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, 5);
    });

    // Draw targets with animation
    targets.forEach((target, index) => {
      if (!target.hit) {
        // Pulsing effect
        const pulse = Math.sin(Date.now() * 0.005 + index) * 0.1 + 1;
        const size = target.width * pulse;
        const offset = (size - target.width) / 2;
        
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(target.x + 3, target.y + 3, target.width, target.height);
        
        // Target
        ctx.fillStyle = '#FF6B6B';
        ctx.fillRect(target.x - offset, target.y - offset, size, size);
        
        // Target rings
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        const centerX = target.x + target.width/2;
        const centerY = target.y + target.height/2;
        
        for (let i = 1; i <= 3; i++) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, i * 8, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    });

    // Draw particles
    particles.forEach(particle => {
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.life;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // Update particles
    setParticles(prev => prev.map(p => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      life: p.life - 0.02
    })).filter(p => p.life > 0));
  };

  const handleMouseDown = (e) => {
    if (bird.launched || gameState !== 'playing') return;
    setIsCharging(true);
  };

  const handleMouseMove = (e) => {
    if (!isCharging || bird.launched) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    const dx = mouseX - bird.x;
    const dy = bird.y - mouseY; // Inverted for proper trajectory
    
    const newAngle = Math.atan2(dy, dx) * 180 / Math.PI;
    const newPower = Math.min(Math.sqrt(dx * dx + dy * dy) / 4, 50);
    
    setAngle(Math.max(0, Math.min(90, newAngle))); // Limit angle 0-90 degrees
    setPower(newPower);
  };

  const handleMouseUp = () => {
    if (!isCharging || bird.launched || power < 5) return;
    
    setIsCharging(false);
    const launchAngle = angle * Math.PI / 180;
    const launchPower = power / 2;
    
    setBird({
      x: 100,
      y: 300,
      vx: Math.cos(launchAngle) * launchPower,
      vy: -Math.sin(launchAngle) * launchPower,
      launched: true
    });
  };

  const handleAnswer = (answerIndex) => {
    if (answerIndex === currentQuestion.correct) {
      const bonusPoints = 200 * level;
      const coinReward = currentQuestion.coins || 10;
      
      setScore(prev => {
        const newScore = prev + bonusPoints;
        if (newScore > highScore) {
          setHighScore(newScore);
        }
        return newScore;
      });
      
      setCoins(prev => prev + coinReward);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
      
      // Track concept mastery for badges
      setBadges(prev => {
        const conceptBadge = `${currentQuestion.subject}-${currentQuestion.concept}`;
        return prev.includes(conceptBadge) ? prev : [...prev, conceptBadge];
      });
      
      if (level < 20) { // Increased to 20 levels
        setLevel(prev => {
          const newLevel = prev + 1;
          if (newLevel > unlockedLevels) {
            setUnlockedLevels(newLevel);
            // Unlock new themes/birds at certain levels
            if (newLevel === 5) themes.chilika.unlocked = true;
            if (newLevel === 10) themes.rathyatra.unlocked = true;
            if (newLevel === 15) themes.tribal.unlocked = true;
          }
          return newLevel;
        });
        setGameState('playing');
      } else {
        setGameState('completed');
      }
      
      checkBadges();
    } else {
      // Wrong answer - show hint and retry
      setLives(prev => prev - 1);
      if (lives <= 1) {
        if (score > highScore) {
          setHighScore(score);
        }
        setGameState('menu');
        resetGame();
      } else {
        // Show hint system
        setGameState('playing');
      }
    }
    setShowQuestion(false);
    setCurrentQuestion(null);
    setActivePowerUp(null); // Reset power-up after question
  };

  const usePowerUp = (type) => {
    if (powerUps[type] > 0) {
      setPowerUps(prev => ({...prev, [type]: prev[type] - 1}));
      setActivePowerUp(type);
      
      if (type === 'bigBird') {
        setBird(prev => ({...prev, size: 25})); // Bigger bird
      }
    }
  };

  const buyPowerUp = (type, cost) => {
    if (coins >= cost) {
      setCoins(prev => prev - cost);
      setPowerUps(prev => ({...prev, [type]: prev[type] + 1}));
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setLives(3);
    setPower(0);
    setAngle(45);
    setBird({ x: 100, y: 300, vx: 0, vy: 0, launched: false });
    initializeLevel();
  };

  const startGame = () => {
    resetGame();
    setGameState('playing');
  };

  if (gameState === 'menu') {
    return (
      <div className="space-y-6">
        {/* Celebration overlay */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="p-8 text-center animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2">Streak Bonus!</h2>
              <p className="text-lg">+{streak * 10} coins for {streak} day streak!</p>
            </Card>
          </div>
        )}

        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            🎯 Edu Birds: Odisha Adventure
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Master STEM concepts through addictive gameplay!
          </p>
          
          {/* Daily streak display */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Flame className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">{streak} Day Streak</span>
            <Badge variant="secondary">{coins} 💰</Badge>
          </div>
        </div>

        {/* Daily Challenge */}
        {dailyChallenge && (
          <Card className="border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-500" />
                Daily Challenge - {dailyChallenge.subject}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{dailyChallenge.q}</p>
              <div className="flex justify-between items-center">
                <Badge variant="secondary">+{dailyChallenge.bonus} bonus coins</Badge>
                <Button size="sm" onClick={() => {
                  setCurrentQuestion(dailyChallenge);
                  setGameState('question');
                }}>Solve Now</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>High Score:</span>
                <Badge variant="secondary">{highScore}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Levels:</span>
                <Badge variant="secondary">{unlockedLevels}/20</Badge>
              </div>
              <div className="flex justify-between">
                <span>Badges:</span>
                <Badge variant="secondary">{badges.length}</Badge>
              </div>
              <Progress value={(unlockedLevels / 20) * 100} className="w-full" />
            </CardContent>
          </Card>

          {/* Power-ups Shop */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-blue-500" />
                Power-ups Shop
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Rocket className="h-4 w-4" />
                  <span className="text-sm">Multi-Shot ({powerUps.multiShot})</span>
                </div>
                <Button size="sm" onClick={() => buyPowerUp('multiShot', 50)} disabled={coins < 50}>
                  50💰
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Big Bird ({powerUps.bigBird})</span>
                </div>
                <Button size="sm" onClick={() => buyPowerUp('bigBird', 75)} disabled={coins < 75}>
                  75💰
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span className="text-sm">Explosive ({powerUps.explosive})</span>
                </div>
                <Button size="sm" onClick={() => buyPowerUp('explosive', 100)} disabled={coins < 100}>
                  100💰
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Customization */}
          <Card>
            <CardHeader>
              <CardTitle>Customize</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Bird Character:</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(birdTypes).map(([key, bird]) => (
                    <Button
                      key={key}
                      variant={selectedBird === key ? "default" : "outline"}
                      size="sm"
                      disabled={!bird.unlocked}
                      onClick={() => setSelectedBird(key)}
                      className="text-xs"
                    >
                      {bird.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Theme:</label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(themes).map(([key, theme]) => (
                    <Button
                      key={key}
                      variant={selectedTheme === key ? "default" : "outline"}
                      size="sm"
                      disabled={!theme.unlocked}
                      onClick={() => setSelectedTheme(key)}
                      className="text-xs"
                    >
                      {theme.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Level Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2 mb-4">
              {Array.from({length: 20}, (_, i) => i + 1).map((levelNum) => (
                <Button
                  key={levelNum}
                  variant={levelNum <= unlockedLevels ? "default" : "outline"}
                  disabled={levelNum > unlockedLevels}
                  onClick={() => {
                    setLevel(levelNum);
                    startGame();
                  }}
                  className="aspect-square p-0 text-xs"
                >
                  {levelNum}
                </Button>
              ))}
            </div>
            
            {/* Badges Display */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Recent Badges:</h3>
              <div className="flex flex-wrap gap-2">
                {badges.slice(-5).map((badge, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
                {badges.length === 0 && (
                  <span className="text-sm text-muted-foreground">Complete challenges to earn badges!</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Game Button */}
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready for Adventure?</h2>
            <p className="text-muted-foreground mb-6">
              Launch birds, solve STEM problems, and explore Odisha's culture!
            </p>
            <Button onClick={startGame} size="lg" className="w-full mb-4">
              <Play className="mr-2 h-5 w-5" />
              Start Level {level}
            </Button>
            
            {/* Quick stats */}
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <span>🎯 {unlockedLevels}/20 Levels</span>
              <span>💰 {coins} Coins</span>
              <span>🔥 {streak} Streak</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'question' && currentQuestion) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleAnswer(-1); // Time up
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }, []);
    
    const getHint = () => {
      if (coins >= 10) {
        setCoins(prev => prev - 10);
        setShowHint(true);
      }
    };
    
    const hints = {
      "What is 5 + 3?": "Think about counting: 5 fingers plus 3 more fingers",
      "What is 12 × 4?": "Try breaking it down: 12 × 4 = 12 × 2 × 2 = 24 × 2",
      "What gas do plants absorb?": "Plants need this gas to make their food through photosynthesis",
      "What is the largest planet?": "This planet is known for its Great Red Spot storm"
    };
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Level {level} - {currentQuestion.subject}</h1>
          <div className="flex gap-4">
            <Badge variant="secondary">Score: {score}</Badge>
            <Badge variant="secondary">Lives: {lives}</Badge>
            <Badge variant="secondary">Coins: {coins}</Badge>
            <Badge variant={timeLeft > 10 ? "secondary" : "destructive"}>
              ⏰ {timeLeft}s
            </Badge>
          </div>
        </div>

        <Card className="border-2 border-blue-400">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <span className="text-2xl">
                  {currentQuestion.subject === 'mathematics' ? '🔢' : 
                   currentQuestion.subject === 'physics' ? '⚡' :
                   currentQuestion.subject === 'chemistry' ? '🧪' : '🌱'}
                </span>
                {currentQuestion.concept || currentQuestion.subject}
              </CardTitle>
              <Badge variant="outline">+{currentQuestion.coins || 10} coins</Badge>
            </div>
            <Progress value={(timeLeft / 30) * 100} className="w-full" />
          </CardHeader>
          <CardContent className="space-y-6">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {currentQuestion.q || currentQuestion.question}
            </h3>
            
            {showHint && (
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">💡</span>
                    <span className="font-semibold">Hint:</span>
                  </div>
                  <p className="text-sm">{hints[currentQuestion.q || currentQuestion.question] || "Think step by step and use what you've learned!"}</p>
                </CardContent>
              </Card>
            )}
            
            <div className="grid gap-3">
              {(currentQuestion.opts || currentQuestion.options).map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="justify-start text-left h-auto p-4 transition-all hover:scale-105"
                  onClick={() => {
                    setSelectedAnswer(index);
                    setTimeout(() => handleAnswer(index), 500);
                  }}
                  disabled={selectedAnswer !== null}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </div>
                </Button>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={getHint}
                disabled={showHint || coins < 10}
              >
                💡 Hint (10 coins)
              </Button>
              
              <div className="text-sm text-muted-foreground">
                Answer correctly to earn coins and advance!
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Motivational messages */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-4 text-center">
            <p className="text-sm font-medium">
              🎯 You're doing great! Each correct answer makes you stronger in {currentQuestion.subject}!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'completed') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🎉 Congratulations!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            You completed all levels!
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Trophy className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Final Score</h2>
            <div className="text-4xl font-bold mb-6">{score}</div>
            <Button onClick={() => setGameState('menu')} className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Play Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edu Birds - Level {level}</h1>
        <div className="flex gap-4">
          <Badge variant="secondary">Score: {score}</Badge>
          <Badge variant="secondary">Lives: {lives}</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-4">
              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className="border rounded-lg cursor-crosshair w-full"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Power-ups Panel */}
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-500" />
                Power-ups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                size="sm" 
                variant={activePowerUp === 'multiShot' ? "default" : "outline"}
                onClick={() => usePowerUp('multiShot')}
                disabled={powerUps.multiShot === 0}
                className="w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <Rocket className="h-4 w-4" />
                  Multi-Shot
                </span>
                <Badge variant="secondary">{powerUps.multiShot}</Badge>
              </Button>
              
              <Button 
                size="sm" 
                variant={activePowerUp === 'bigBird' ? "default" : "outline"}
                onClick={() => usePowerUp('bigBird')}
                disabled={powerUps.bigBird === 0}
                className="w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Big Bird
                </span>
                <Badge variant="secondary">{powerUps.bigBird}</Badge>
              </Button>
              
              <Button 
                size="sm" 
                variant={activePowerUp === 'explosive' ? "default" : "outline"}
                onClick={() => usePowerUp('explosive')}
                disabled={powerUps.explosive === 0}
                className="w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Explosive
                </span>
                <Badge variant="secondary">{powerUps.explosive}</Badge>
              </Button>
              
              {activePowerUp && (
                <div className="text-xs text-center text-green-600 font-medium">
                  ✨ {activePowerUp} active!
                </div>
              )}
            </CardContent>
          </Card>

          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Launch Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  💪 Power: {Math.round(power)}
                </label>
                <Progress value={(power / 50) * 100} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  🎯 Angle: {Math.round(angle)}°
                </label>
                <Progress value={(angle / 90) * 100} className="mt-1" />
              </div>
              <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
                📝 Click and drag to aim, release to launch!
              </div>
              
              {/* Quick Launch Buttons */}
              <div className="grid grid-cols-3 gap-1 mt-2">
                <Button size="sm" variant="outline" onClick={() => {
                  console.log('Launching bird with low power');
                  setBird({ x: 100, y: 300, vx: 6, vy: -8, launched: true });
                }} disabled={bird.launched}>
                  🚀 Low
                </Button>
                <Button size="sm" variant="outline" onClick={() => {
                  console.log('Launching bird with medium power');
                  setBird({ x: 100, y: 300, vx: 10, vy: -12, launched: true });
                }} disabled={bird.launched}>
                  🚀 Mid
                </Button>
                <Button size="sm" variant="outline" onClick={() => {
                  console.log('Launching bird with high power');
                  setBird({ x: 100, y: 300, vx: 14, vy: -16, launched: true });
                }} disabled={bird.launched}>
                  🚀 High
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Level Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Level {level} Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Targets:</span>
                <span>{targets.filter(t => !t.hit).length}/{targets.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Theme:</span>
                <span>{themes[selectedTheme].name}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Hit all targets to unlock STEM challenge!
              </div>
              <Progress 
                value={((targets.length - targets.filter(t => !t.hit).length) / targets.length) * 100} 
                className="mt-2" 
              />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-center">
                  <div className="font-bold text-lg">{coins}</div>
                  <div className="text-muted-foreground">💰 Coins</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{streak}</div>
                  <div className="text-muted-foreground">🔥 Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={() => setGameState('menu')} 
            variant="outline" 
            className="w-full"
          >
            <Pause className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
        </div>
      </div>
    </div>
  );
}