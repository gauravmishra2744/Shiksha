# Shiksha - Complete Modern Education Platform 🎓

A comprehensive full-stack education management platform built with Next.js 15, featuring complete backend APIs, MongoDB database, student and teacher dashboards, gamification system, AI-powered assistance, and more.

**Perfect for your resume - A production-ready, fully functional education platform!**

## ✨ Complete Features

### For Students 🧑‍🎓
- ✅ **Interactive Dashboard**: Track progress, XP, streaks, leaderboard, and achievements
- ✅ **Course Management**: Browse, enroll, and learn from comprehensive courses
- ✅ **Classroom System**: Join classes with unique codes and access resources
- ✅ **Doubt Solving Forum**: Ask questions and get help from teachers, peers, and AI
- ✅ **Smart Note Taking**: Create, organize, share, and search notes with tags
- ✅ **Gamification Engine**: Earn XP, level up, collect badges, and compete on leaderboards
- ✅ **Productivity Suite**: Todo lists, Pomodoro timer with XP rewards
- ✅ **AI Study Assistant**: Get instant explanations and help with any topic
- ✅ **Assignment Submission**: Submit work and receive grades with feedback
- ✅ **Profile Management**: Track all achievements and progress

### For Teachers 👨‍🏫
- ✅ **Teacher Dashboard**: Complete overview of students and classrooms
- ✅ **Advanced Analytics**: Track student performance, engagement, and trends
- ✅ **Classroom Management**: Create and manage multiple virtual classrooms
- ✅ **Assignment System**: Create, distribute, and grade assignments
- ✅ **Student Management**: View detailed student profiles and progress
- ✅ **Course Builder**: Build comprehensive courses with lessons
- ✅ **Communication Hub**: Post announcements and resources
- ✅ **AI Content Generator**: Auto-generate lesson plans, quizzes, and study materials
- ✅ **Grading Tools**: Efficient submission review and grading system

### Technical Features 🛠️
- ✅ **Complete REST API**: 40+ fully functional API endpoints
- ✅ **MongoDB Database**: Production-ready database with 9 models
- ✅ **JWT Authentication**: Secure token-based auth system
- ✅ **Role-Based Access**: Student, teacher, and admin roles
- ✅ **Responsive Design**: Mobile-first, works on all devices
- ✅ **Dark Mode**: Complete dark/light theme support
- ✅ **XP & Leveling System**: Automatic progression tracking
- ✅ **Badge System**: 6 achievement types with rewards
- ✅ **Streak Tracking**: Daily login streak rewards
- ✅ **Password Hashing**: bcrypt security
- ✅ **Data Validation**: Mongoose schema validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation Steps

1. **Clone and install dependencies**
```bash
git clone <your-repo-url>
cd Shiksha
npm install
```

2. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/shiksha
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

3. **Start MongoDB**
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (recommended for production)
# Just update MONGODB_URI with your Atlas connection string
```

4. **Seed database with sample data**
```bash
npm run seed
```

This creates:
- 1 Teacher account
- 4 Student accounts
- 3 Classrooms
- 2 Courses with lessons
- 6 Achievement badges
- 2 Sample assignments

5. **Start development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Test Accounts

After running `npm run seed`:

**🧑‍🎓 Student Account:**
- Email: `student@example.com`
- Password: `password123`

**👨‍🏫 Teacher Account:**
- Email: `teacher@example.com`
- Password: `password123`

## 📊 Database Architecture

### Complete Data Models:

1. **User Model** - Authentication & Gamification
   - Fields: name, email, password (hashed), role, avatar, grade, stream, bio
   - Gamification: xp, level, coins, streak, lastLoginDate, badges
   - Teacher: subjects, qualification, experience
   - Methods: comparePassword(), addXP()

2. **Classroom Model** - Virtual Classrooms
   - Fields: name, description, subject, teacher, students[], schedule, status
   - Features: classCode (unique), announcements[], resources[]
   - Auto-generates unique join codes

3. **Course Model** - Educational Content
   - Fields: title, description, subject, grade, thumbnail, instructor
   - Lessons: title, description, content, videoUrl, duration, order
   - Features: enrolledStudents[], rating, reviews[], difficulty, tags[]

4. **Assignment Model** - Homework & Tests
   - Fields: title, description, classroom, dueDate, totalPoints, attachments[]
   - Submissions: student, content, files[], submittedAt, grade, feedback, status
   - Automatic late detection

5. **Doubt Model** - Q&A Forum
   - Fields: title, description, subject, student, classroom, images[]
   - Responses: user, content, isTeacher, helpful count
   - Features: status, priority, views, upvotes

6. **Note Model** - Student Notes
   - Fields: title, content, subject, tags[], student, classroom
   - Features: color, isPinned, isShared, sharedWith[]
   - Full-text search enabled

7. **Badge Model** - Achievements
   - Fields: name, description, icon, type, requirements
   - Rewards: xpReward, coinReward, rarity
   - Types: achievement, milestone, special

8. **Todo Model** - Task Management
   - Fields: title, description, user, completed, priority, dueDate
   - Categories: study, assignment, exam, other
   - Can link to classrooms/assignments/courses

9. **PomodoroSession Model** - Study Tracking
   - Fields: user, subject, duration, completed, startedAt, completedAt
   - Automatic XP rewards based on study time

## 🔌 Complete API Documentation

### Authentication APIs
```
POST /api/auth/register - Register new user
POST /api/auth/login - Login and get JWT token
```

### Student APIs
```
GET  /api/student/dashboard - Dashboard data with stats
GET  /api/student/courses - List all available courses
POST /api/student/courses - Enroll in a course
GET  /api/student/courses/[id] - Get course details
GET  /api/student/doubts - Get all doubts/questions
POST /api/student/doubts - Create a new doubt
GET  /api/student/doubts/[id] - Get doubt details
POST /api/student/doubts/[id] - Add response to doubt
GET  /api/student/notes - Get all student notes
POST /api/student/notes - Create a new note
GET  /api/student/notes/[id] - Get note by ID
PUT  /api/student/notes/[id] - Update note
DELETE /api/student/notes/[id] - Delete note
GET  /api/student/badges - Get earned and available badges
GET  /api/student/todos - Get all todos
POST /api/student/todos - Create todo
PUT  /api/student/todos/[id] - Update todo
DELETE /api/student/todos/[id] - Delete todo
GET  /api/student/pomodoro - Get study sessions
POST /api/student/pomodoro - Log study session
GET  /api/student/profile - Get user profile
PUT  /api/student/profile - Update profile
```

### Teacher APIs
```
GET  /api/teacher/dashboard - Teacher dashboard with stats
GET  /api/teacher/analytics - Student performance analytics
GET  /api/teacher/students - Get all students in classes
GET  /api/teacher/courses - Get teacher's courses
POST /api/teacher/courses - Create new course
```

### Classroom APIs
```
GET    /api/classrooms - List user's classrooms
POST   /api/classrooms - Create new classroom (teacher)
GET    /api/classrooms/[id] - Get classroom details
PUT    /api/classrooms/[id] - Update classroom (teacher)
DELETE /api/classrooms/[id] - Delete classroom (teacher)
POST   /api/classrooms/join - Join classroom with code (student)
```

### Assignment APIs
```
GET  /api/assignments - List assignments
POST /api/assignments - Create assignment (teacher)
GET  /api/assignments/[id] - Get assignment details
POST /api/assignments/[id] - Submit assignment (student)
PUT  /api/assignments/[id] - Update assignment (teacher)
POST /api/assignments/[id]/grade - Grade submission (teacher)
```

### AI APIs
```
POST /api/ai/generate - Generate content (lessons, quizzes, summaries)
POST /api/ai/help - Get AI assistance for doubts
```

### API Authentication
All protected endpoints require JWT token:
```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN'
}
```

## 🎮 Gamification System

### XP (Experience Points)
- Login daily: +10 XP
- Submit assignment on time: +20 XP
- Complete course: +100 XP
- Help others (answer doubts): +10-15 XP
- Study session (Pomodoro): +1 XP per 5 minutes
- Ask quality question: +5 XP

### Levels
- Level up every 500 XP
- Level 1-3: Beginner
- Level 4-6: Intermediate
- Level 7-10: Advanced
- Level 11+: Expert

### Coins
- Earned alongside XP
- Used for future features (store, themes, etc.)

### Badges
- 6 unique achievement badges
- Rarities: Common, Rare, Epic, Legendary
- Each badge gives XP and coin rewards

### Streaks
- Daily login tracking
- Bonus XP for maintaining streaks
- Resets if you miss a day

## 📱 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcryptjs
- **Validation**: Mongoose schemas

### Development
- **Linting**: ESLint
- **Package Manager**: npm/yarn
- **Dev Mode**: Turbopack enabled

## 🚢 Deployment Guide

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secure_secret_key
   ```
4. Deploy!

### MongoDB Atlas Setup

1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Create database user
4. Whitelist IP (0.0.0.0/0 for development)
5. Get connection string
6. Replace `<password>` with your password
7. Add to `.env.local` or Vercel environment variables

### Environment Variables for Production
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shiksha
JWT_SECRET=your-production-secret-key-at-least-32-characters
NEXT_PUBLIC_API_URL=https://yourapp.vercel.app/api
NODE_ENV=production
```

## 📁 Project Structure

```
Shiksha/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication
│   │   ├── student/         # Student endpoints
│   │   ├── teacher/         # Teacher endpoints
│   │   ├── classrooms/      # Classroom management
│   │   ├── assignments/     # Assignment system
│   │   └── ai/              # AI features
│   ├── student/             # Student pages
│   ├── teacher/             # Teacher pages
│   └── login/               # Login page
├── components/               # React components
│   ├── student/             # Student components
│   ├── teacher/             # Teacher components
│   ├── homepage/            # Landing page
│   └── ui/                  # Reusable UI components
├── lib/                      # Utilities
│   ├── models/              # Mongoose models
│   ├── db.js                # Database connection
│   ├── auth.js              # Auth utilities
│   └── utils.js             # Helper functions
├── scripts/                  # Utility scripts
│   └── seed.js              # Database seeder
├── public/                   # Static assets
├── .env.example             # Environment template
└── package.json             # Dependencies
```

## ⚡ Performance & Optimization

- **Turbopack**: Fast build and hot reload
- **MongoDB Indexing**: Optimized queries
- **JWT Caching**: Reduced auth overhead
- **Lazy Loading**: Code splitting for routes
- **Image Optimization**: Next.js Image component
- **API Response Caching**: Reduced database calls

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ Input validation and sanitization
- ✅ MongoDB injection prevention
- ✅ CORS configuration
- ✅ Secure headers
- ✅ Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT License - feel free to use this project for your portfolio/resume!

## 👨‍💻 Author

**Gaurav Mishra**
- GitHub: [@gauravmishra2744](https://github.com/gauravmishra2744)
- Project: Shiksha Education Platform

## 🎯 Perfect for Resume

This project demonstrates:
- ✅ Full-stack development skills
- ✅ RESTful API design
- ✅ Database design and modeling
- ✅ Authentication & authorization
- ✅ Modern React/Next.js patterns
- ✅ State management
- ✅ Responsive UI/UX design
- ✅ Git version control
- ✅ Documentation skills

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: gauravmishra@example.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- shadcn/ui for beautiful components
- MongoDB for the database platform
- Vercel for hosting

---

**⭐ If you find this project helpful, please star the repository!**

Made with ❤️ for education and learning
