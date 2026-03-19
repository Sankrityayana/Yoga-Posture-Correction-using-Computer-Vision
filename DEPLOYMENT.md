# Deployment Guide: Vercel + Render

This guide walks you through deploying the Yoga Posture Correction application on Vercel (frontend) and Render (backend).

## Prerequisites

- GitHub account with your repo pushed
- Vercel account (free tier available)
- Render account (free tier available)
- MongoDB Atlas account (optional, for cloud database)

---

## Option 1: Vercel (Frontend) + Render (Backend) - RECOMMENDED

### Backend Deployment on Render

#### Step 1: Prepare Your Repository
Ensure these files are in your repo (already created):
- `Procfile` - Specifies how to run your app
- `backend/requirements.txt` - Python dependencies
- `backend/.env.example` - Environment variables template

#### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Connect your GitHub repo

#### Step 3: Deploy Backend
1. Click "New +" → "Web Service"
2. Select your GitHub repository
3. Configure:
   - **Name**: `yoga-posture-backend` (or your choice)
   - **Environment**: Python
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `gunicorn backend.main:app --worker-class=uvicorn.workers.UvicornWorker --timeout=120 --bind 0.0.0.0:$PORT`
   - **Plan**: Free (recommended for testing)

#### Step 4: Add Environment Variables (Render Dashboard)
Go to your service → Environment:
```
CORS_ORIGINS=https://your-frontend-url.vercel.app
MONGO_URL=your_mongodb_connection_string (if using MongoDB)
DB_NAME=yoga_posture_db
```

#### Step 5: Deploy
Click "Deploy" - Render will automatically build and deploy your app

Your backend URL: `https://yoga-posture-backend.onrender.com`
- Test health: `https://yoga-posture-backend.onrender.com/health`
- API docs: `https://yoga-posture-backend.onrender.com/docs`

---

### Frontend Deployment on Vercel

#### Step 1: Prepare Your Repository
Ensure these files exist (already created):
- `frontend/vercel.json` - Vercel configuration
- `frontend/.env.production` - Production environment variables
- `frontend/.env.example` - Environment variables template

#### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Connect your GitHub account

#### Step 3: Deploy Frontend
1. Click "Add New Project"
2. Select your repository
3. Configure:
   - **Framework Preset**: Other (configured in vercel.json)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### Step 4: Add Environment Variables (Vercel Dashboard)
Go to Settings → Environment Variables:
```
VITE_API_URL=https://yoga-posture-backend.onrender.com
```

#### Step 5: Deploy
Click "Deploy" - Vercel builds and deploys automatically

Your frontend URL: `https://yoga-posture-frontend.vercel.app`

---

### Update CORS After Deployment

Once you have your Vercel frontend URL:

1. **Go to Render Dashboard** (Backend)
2. Select your backend service
3. Go to **Environment** → Edit `CORS_ORIGINS`
4. Update to: `https://your-frontend-url.vercel.app`
5. Click "Save Changes" - Render redeploys automatically

---

## Option 2: Deploy Everything on Render (Full-Stack)

If you prefer keeping both on one platform, use the included `render.yaml`:

1. Go to [render.com](https://render.com)
2. Click "New +" → "Blueprint"
3. Connect your repository
4. Render automatically deploys both services using `render.yaml`

**Advantages**: Single dashboard, easier configuration
**Disadvantages**: Frontend is not on Vercel's edge network

---

## Option 3: Deploy Everything on Vercel

You can also deploy the backend as Vercel serverless functions:

1. Convert `backend/main.py` to Vercel-compatible handler
2. Create `api/` directory with FastAPI wrapped functions
3. Deploy to Vercel

(More complex - Not recommended for this project)

---

## Post-Deployment Checklist

### Test Backend
```bash
# Health check
curl https://yoga-posture-backend.onrender.com/health

# API Documentation
Visit: https://yoga-posture-backend.onrender.com/docs
```

### Test Frontend
1. Visit `https://yoga-posture-frontend.vercel.app`
2. Open browser console (F12) - no CORS errors?
3. Try the pose detection feature
4. Verify API calls go to backend

### Common Issues

**CORS Errors**
- Check `CORS_ORIGINS` env var on Render backend
- Ensure it includes your Vercel frontend URL
- Restart Render backend service

**API Timeouts (502/503)**
- Render free tier may be slow
- Wait 30-60 seconds for backend to wake up
- Upgrade to paid tier for faster performance

**Environment Variables Not Loading**
- Render: Go to Service → Environment
- Vercel: Go to Project → Settings → Environment Variables
- Ensure variables are set for Production environment

---

## Database Setup (MongoDB)

### Option A: MongoDB Atlas (Cloud) - Recommended
1. Go to [mongodb.com/cloud](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/yoga_db`
4. Add to Render environment variables as `MONGO_URL`

### Option B: Local MongoDB
For testing only - not recommended for production

---

## Environment Variables Reference

### Frontend (`.env.production`)
```
VITE_API_URL=https://yoga-posture-backend.onrender.com
```

### Backend (Render Dashboard)
```
CORS_ORIGINS=https://yoga-posture-frontend.vercel.app
MONGO_URL=mongodb+srv://...
DB_NAME=yoga_posture_db
ENVIRONMENT=production
```

---

## Monitoring & Logs

### Render
- Service Dashboard → "Logs" tab
- View real-time logs and errors
- Check resource usage

### Vercel
- Project Dashboard → "Deployments"
- Click deployment → "Logs"
- See build and runtime logs

---

## Cost Estimates

| Service | Free Tier | Paid |
|---------|-----------|------|
| **Vercel** | 100GB bandwidth/month | $20+/month |
| **Render** | 750 hours/month web | $12+/month |
| **MongoDB** | 512MB storage | $15+/month |

**Total for free tier**: $0/month (with limits)

---

## Troubleshooting

### App won't build
- Check `Procfile` is in project root
- Verify `backend/requirements.txt` has all dependencies
- Check Python version (3.9+)

### Backend slow on Render free tier
- Cold starts (~30s first request) - normal
- Upgrade to paid for better performance
- Or use Render's "Auto-Scaling" for production

### Frontend can't reach backend
- Check both services are deployed and running
- Verify CORS_ORIGINS matches your Vercel URL exactly
- Check firewall/network settings

### Need help?
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- FastAPI: https://fastapi.tiangolo.com

---

## Next Steps

1. ✅ Push all files to GitHub
2. ✅ Create Render & Vercel accounts
3. ✅ Deploy backend on Render
4. ✅ Deploy frontend on Vercel
5. ✅ Test the full application
6. ✅ Share your deployed app!

Happy deploying! 🚀
