# Portfolio Website - Backend

RESTful API backend for the portfolio website, built with Node.js, Express, Prisma, and PostgreSQL. Provides secure authentication and full CRUD operations for blogs and projects.

## 🚀 Live Demo

**Backend API:** [Backend Live](https://portfolioserver-kappa-six.vercel.app)  

## ✨ Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 🔒 **Password Hashing** - bcrypt for secure password storage
- 📝 **Blog Management** - Full CRUD operations for blog posts
- 🚀 **Project Management** - Complete project CRUD functionality
- 🖼️ **File Upload** - Image upload support with Multer & cloudinary
- ✅ **Input Validation** - Request validation and sanitization
- 🗄️ **PostgreSQL Database** - Reliable data persistence with Prisma ORM

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT + bcrypt
- **File Upload:** Multer
- **Deployment:** Vercel

## 🚦 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   https://github.com/Shanto57575/next_level_portfolio_server.git
   cd portfolio-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env 
    PORT=5000
    DATABASE_URL=""
    NODE_ENV=""
    FRONTEND_URL=http://localhost:3000
    ADMIN_EMAIL=
    ADMIN_PASSWORD=
    BCRYPT_SALT_ROUNDS=
    JWT_ACCESS_SECRET=
    JWT_ACCESS_EXPIRES=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_SECRET_KEY=
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev --name init
   
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```



## 🔌 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/login` | Admin login | ❌ 
---

### Blog Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/blog/create-blog` | Create new blog | ✅ |
| GET | `/api/v1/blog/all-blogs` | Get all blogs | ❌ |
| GET | `/api/v1/blog/:id` | Get blog by ID | ❌ |
| PUT | `/api/v1/blog/:id` | Update blog | ✅ |
| DELETE | `/api/v1/blog/:id` | Delete blog | ✅
```
## 🚀 Deployment

## Build for production

npm run build
```

### Deploy to Vercel
```bash
vercel --prod
```

## 👨‍💻 Author

**Your Name**
- GitHub: [Shanto57575](https://github.com/Shanto57575)
- Email: shanto57575@gmail.com
