# 3D Printing Order Backend - Setup Guide

This guide explains how to set up and use the production-ready backend for handling 3D print orders.

## 📁 Project Structure

```
roboway-website/
├── app/
│   └── api/
│       └── 3d-printing/
│           └── order/
│               └── route.ts          # Order API endpoint
├── components/
│   └── OrderModal.tsx                # Order form modal component
├── lib/
│   ├── mongodb.ts                    # MongoDB connection utility
│   └── fileStorage.ts                # File storage handling
├── models/
│   └── Order.ts                      # MongoDB order schema/model
└── uploads/                          # Local file storage (created automatically)
    └── orders/
        └── {orderId}/
            └── {timestamp}-{random}.stl
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install mongoose
```

### 2. Set Up MongoDB Atlas (Free Tier)

1. **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for free
2. **Create Cluster**: 
   - Click "Build a Database"
   - Choose "M0 FREE" tier
   - Select a cloud provider and region
   - Click "Create"
3. **Create Database User**:
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Username: `roboway-admin` (or your choice)
   - Password: Generate a secure password (save it!)
   - Database User Privileges: "Atlas admin"
   - Click "Add User"
4. **Whitelist IP Address**:
   - Go to "Network Access" → "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your server's IP address
   - Click "Confirm"
5. **Get Connection String**:
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `roboway` (or your database name)

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://roboway-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/roboway?retryWrites=true&w=majority
```

**Optional**: Add Resend API key for email confirmations:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### 4. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/3d-printing` page
3. Upload an STL file, configure settings, and click "Calculate Price"
4. Click "Order Now" to open the order modal
5. Fill in the form and submit

## 📊 Database Schema

### Order Document Structure

```typescript
{
  orderId: "ORD-1234567890-ABC123",        // Unique order identifier
  customerInfo: {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+880 1234 567890",
    address: "123 Main St, City, Country"
  },
  fileInfo: {
    fileName: "model.stl",
    filePath: "/uploads/orders/ORD-123/...",
    fileSize: 1024000,                      // bytes
    mimeType: "model/stl"
  },
  printConfig: {
    material: "PLA+",
    infillDensity: 20,                      // 0-100%
    volume: 15.5,                           // cm³
    weight: 19.2,                           // grams
    pricePerGram: 15,                       // BDT
    totalPrice: 288.0                       // BDT
  },
  status: "pending",                        // pending | confirmed | in_progress | completed | cancelled
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoint

### POST `/api/3d-printing/order`

**Content-Type**: `multipart/form-data`

**Request Body**:
- `file` (File): STL or OBJ file
- `fullName` (string): Customer full name
- `address` (string): Customer address
- `phone` (string): Customer phone number
- `email` (string): Customer email address
- `material` (string): Selected material type
- `infillDensity` (string): Infill percentage (0-100)
- `quotation` (string): JSON string of quotation data

**Response** (Success):
```json
{
  "success": true,
  "orderId": "ORD-1234567890-ABC123",
  "message": "Order created successfully"
}
```

**Response** (Error):
```json
{
  "error": "Error message here"
}
```

## 📁 File Storage

### Current Implementation: Local Filesystem

Files are stored in `/uploads/orders/{orderId}/` directory.

**Pros**:
- Simple setup
- No additional services needed
- Works for development

**Cons**:
- Not suitable for serverless platforms (Vercel, some Render configs)
- Files are lost if server restarts (on ephemeral file systems)
- Not scalable for production

### Alternative: Cloud Storage

For production, consider using:

1. **Supabase Storage** (Recommended for free tier)
   - Free tier: 1GB storage
   - Easy integration
   - See commented code in `lib/fileStorage.ts`

2. **Cloudinary**
   - Free tier: 25GB storage
   - Good for media files

3. **AWS S3**
   - Pay-as-you-go
   - Industry standard

To switch to cloud storage, update the `saveFile` function in `lib/fileStorage.ts`.

## 🔒 Validation

The backend validates:

- **File**:
  - File type: Only `.stl` and `.obj` files
  - File size: Maximum 50MB (configurable in `lib/fileStorage.ts`)
  - MIME type validation

- **Customer Info**:
  - Email format validation
  - Phone number format validation
  - Required fields check

- **Print Config**:
  - Infill density: 0-100%
  - Quotation data structure validation

## 🚨 Error Handling

The API returns appropriate HTTP status codes:

- `400`: Bad Request (validation errors, missing fields)
- `500`: Internal Server Error (database errors, file storage errors)

All errors are logged to the console for debugging.

## 📧 Email Notifications (Optional)

To enable order confirmation emails:

1. Sign up for [Resend](https://resend.com) (free tier available)
2. Get your API key
3. Add `RESEND_API_KEY` to `.env.local`
4. Uncomment the email code in `app/api/3d-printing/order/route.ts`

## 🌐 Deployment

### Render.com (Recommended)

1. **Create Account**: [Render.com](https://render.com)
2. **Create Web Service**:
   - Connect your GitHub repository
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables: Add `MONGODB_URI`
3. **File Storage**: Use Supabase Storage or Cloudinary (local filesystem won't work on Render)

### Railway

1. **Create Account**: [Railway.app](https://railway.app)
2. **Deploy from GitHub**
3. **Add Environment Variables**: `MONGODB_URI`
4. **File Storage**: Local filesystem works, but cloud storage is recommended

### Vercel

1. **Deploy to Vercel**: Connect GitHub repo
2. **Add Environment Variables**: `MONGODB_URI`
3. **File Storage**: Must use cloud storage (Supabase, Cloudinary, or S3)

## 🔍 Troubleshooting

### MongoDB Connection Issues

- **Error**: "MONGODB_URI environment variable not defined"
  - **Solution**: Make sure `.env.local` exists and contains `MONGODB_URI`

- **Error**: "Authentication failed"
  - **Solution**: Check your database username and password in the connection string

- **Error**: "IP not whitelisted"
  - **Solution**: Add your IP address in MongoDB Atlas Network Access

### File Upload Issues

- **Error**: "File size exceeds maximum"
  - **Solution**: Increase `MAX_FILE_SIZE` in `lib/fileStorage.ts` or compress the STL file

- **Error**: "Invalid file type"
  - **Solution**: Ensure file has `.stl` or `.obj` extension

### Database Errors

- **Error**: "Order ID conflict"
  - **Solution**: This is very rare. The system will retry automatically.

## 📝 Next Steps

1. **Payment Integration**: Add Stripe or PayPal for payment processing
2. **Order Management Dashboard**: Create admin panel to view/manage orders
3. **Email Templates**: Customize order confirmation emails
4. **File Processing**: Add STL parsing for accurate volume calculation
5. **Order Status Updates**: Implement webhooks for status changes

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

## 🆘 Support

If you encounter any issues, check:
1. Environment variables are set correctly
2. MongoDB Atlas cluster is running
3. Network access is configured
4. File permissions for uploads directory

---

**Happy Coding! 🚀**
