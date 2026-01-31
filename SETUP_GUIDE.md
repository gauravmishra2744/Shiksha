# 🚀 SETUP GUIDE - Shiksha Education Platform

Complete step-by-step guide to get your Shiksha project running.

## ✅ Prerequisites Checklist

Before starting, make sure you have:

- [ ] Node.js 18 or higher installed
- [ ] MongoDB installed (local) OR MongoDB Atlas account (cloud)
- [ ] Git installed
- [ ] A code editor (VS Code recommended)
- [ ] Terminal/Command Prompt access

## 📦 Step 1: Install Node.js

### Windows:
1. Download from [nodejs.org](https://nodejs.org/)
2. Run installer
3. Verify: `node --version` and `npm --version`

### Mac/Linux:
```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

## 🍃 Step 2: Install MongoDB

### Option A: Local MongoDB (Development)

**Windows:**
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install with default settings
3. MongoDB should auto-start as a service

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

Verify MongoDB is running:
```bash
mongosh
# Should connect to MongoDB shell
```

### Option B: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your region
   - Click "Create"

3. **Create Database User**
   - Security → Database Access
   - Add New Database User
   - Choose username and password (save these!)
   - Give "Read and write to any database" permissions

4. **Configure Network Access**
   - Security → Network Access
   - Add IP Address
   - For development: Allow access from anywhere (0.0.0.0/0)
   - For production: Add specific IPs

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## 🔧 Step 3: Project Setup

1. **Navigate to your project directory**
```bash
cd "c:\Users\HP\OneDrive\Documents\Shiksha"
```

2. **Install dependencies** (Already done, but if needed)
```bash
npm install
```

3. **Create environment file**
```bash
# Copy the example file
cp .env.example .env.local
```

4. **Edit .env.local**

Open `.env.local` in your editor and configure:

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/shiksha
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-please
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/shiksha?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-please
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

**Important:** 
- Replace `username` and `password` with your MongoDB Atlas credentials
- Replace `cluster0.xxxxx.mongodb.net` with your actual cluster address
- Generate a strong JWT_SECRET (32+ characters)

## 🌱 Step 4: Seed the Database

This creates sample data for testing:

```bash
npm run seed
```

You should see:
```
🌱 Starting database seeding...
🗑️  Clearing existing data...
👥 Creating users...
✅ Created 5 users
🏫 Creating classrooms...
✅ Created 3 classrooms
📚 Creating courses...
✅ Created 2 courses
🏆 Creating badges...
✅ Created 6 badges
📝 Creating assignments...
✅ Created 2 assignments

✨ Database seeding completed successfully!

📝 Login Credentials:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧑‍🎓 Student Account:
   Email: student@example.com
   Password: password123

👨‍🏫 Teacher Account:
   Email: teacher@example.com
   Password: password123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 🚀 Step 5: Run the Application

```bash
npm run dev
```

You should see:
```
▲ Next.js 15.5.2
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.3s
```

## 🌐 Step 6: Access the Application

1. **Open browser**: Navigate to [http://localhost:3000](http://localhost:3000)

2. **Login as Student**:
   - Email: `student@example.com`
   - Password: `password123`
   - Explore: Dashboard, Courses, Classrooms, Doubts, Notes, etc.

3. **Login as Teacher**:
   - Email: `teacher@example.com`
   - Password: `password123`
   - Explore: Teacher Dashboard, Analytics, Students, Create Assignments

## 🔍 Step 7: Verify Everything Works

### Test Student Features:
- [ ] Login successful
- [ ] Dashboard shows XP, level, streak
- [ ] Can view classrooms
- [ ] Can view courses
- [ ] Can create notes
- [ ] Can ask doubts
- [ ] Pomodoro timer works

### Test Teacher Features:
- [ ] Login successful
- [ ] Dashboard shows classrooms and students
- [ ] Can view analytics
- [ ] Can create classroom
- [ ] Can create assignment
- [ ] Can view students

### Test APIs:
```bash
# Test auth endpoint
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password123"}'

# Should return: {"success":true,"token":"...","user":{...}}
```

## ❌ Troubleshooting

### MongoDB Connection Error

**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**
1. Verify MongoDB is running: `mongosh`
2. Check MONGODB_URI in `.env.local`
3. For Atlas: Verify IP whitelist and credentials

### Port 3000 Already in Use

**Error**: `Port 3000 is already in use`

**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found

**Error**: `Cannot find module 'mongoose'`

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### JWT Secret Error

**Error**: `JWT_SECRET is not defined`

**Solution:**
- Ensure `.env.local` exists
- Check JWT_SECRET is set
- Restart dev server after changing `.env.local`

### Seed Script Fails

**Error**: Various errors during seeding

**Solutions:**
1. Ensure MongoDB is running
2. Check connection string
3. Clear database manually:
```bash
mongosh
use shiksha
db.dropDatabase()
exit
npm run seed
```

## 🎯 Quick Commands Reference

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Seed database
npm run seed

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📱 Testing on Mobile Devices

1. Find your computer's IP address:
```bash
# Windows
ipconfig
# Look for IPv4 Address

# Mac/Linux
ifconfig
# Look for inet address
```

2. Ensure your phone is on the same WiFi network

3. Access from phone: `http://YOUR_IP_ADDRESS:3000`

## 🚢 Next Steps

After getting the app running:

1. **Explore Features**: Try all student and teacher functionalities
2. **Add Content**: Create more courses, assignments, and classrooms
3. **Customize**: Modify components, colors, and styling
4. **Deploy**: Follow deployment guide in DOCUMENTATION.md
5. **Integrate AI**: Add real AI APIs (OpenAI, Google AI)
6. **Add Features**: Implement file uploads, notifications, etc.

## 💡 Pro Tips

1. **Use MongoDB Compass**: GUI tool for viewing/editing database
   - Download from [mongodb.com/products/compass](https://www.mongodb.com/products/compass)
   - Connect using your MONGODB_URI

2. **Use Postman**: Test API endpoints
   - Import API collection
   - Test all endpoints

3. **Use VS Code Extensions**:
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - MongoDB for VS Code
   - Thunder Client (API testing)

4. **Keep Dev Server Running**: Hot reload makes development faster

5. **Check Console**: Look for errors in browser console and terminal

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

## ✉️ Need Help?

If you encounter issues not covered here:
1. Check the error message carefully
2. Google the error
3. Check Stack Overflow
4. Open an issue on GitHub
5. Contact: gauravmishra@example.com

---

**Happy Coding! 🚀**

You now have a complete, working education platform ready for your resume!
