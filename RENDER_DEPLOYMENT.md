# Render Deployment Guide

## Prerequisites
1. GitHub account with your code pushed to a repository
2. Render account (free tier available)
3. MongoDB Atlas database (already configured)

## Deployment Steps

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Create Render Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select your restaurant-menu repository

### 3. Configure Service Settings
- **Name**: restaurant-menu (or your preferred name)
- **Environment**: Node
- **Region**: Choose closest to your users
- **Branch**: main
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### 4. Set Environment Variables
In the Render dashboard, add these environment variables:
- `NODE_ENV`: `production`
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `PORT`: (Leave empty - Render will set this automatically)

### 5. Deploy
Click "Create Web Service" and wait for deployment to complete.

## Important Notes
- First deployment may take 5-10 minutes
- Free tier services sleep after 15 minutes of inactivity
- Your app will be available at: `https://your-service-name.onrender.com`
- MongoDB connection string should not contain hardcoded credentials in production

## Troubleshooting
- Check build logs in Render dashboard if deployment fails
- Ensure all dependencies are in package.json files
- Verify MongoDB Atlas allows connections from all IPs (0.0.0.0/0) for Render