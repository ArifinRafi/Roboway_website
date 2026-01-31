# 🚀 Quick Setup Instructions

## Step 1: Install Dependencies

```bash
npm install mongoose
```

## Step 2: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free M0 cluster
4. Create database user (Database Access → Add New User)
5. Whitelist IP (Network Access → Add IP Address → Allow from anywhere for dev)
6. Get connection string (Database → Connect → Connect your application)

## Step 3: Create Environment File

Create `.env.local` in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/roboway?retryWrites=true&w=majority
```

Replace:
- `username` with your database username
- `password` with your database password
- `cluster0.xxxxx` with your cluster URL

## Step 4: Test It!

1. Run `npm run dev`
2. Go to `/3d-printing` page
3. Upload STL file → Calculate Price → Order Now
4. Fill the form and submit

## ✅ That's It!

Your backend is now ready! Check `README_3D_PRINTING_BACKEND.md` for detailed documentation.
