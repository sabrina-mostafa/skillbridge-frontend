# SkillBridge Frontend

SkillBridge is a modern full-stack online tutoring platform that connects students with experienced tutors for personalized learning. This repository contains the frontend application built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **TanStack Query**, delivering a fast, responsive, and intuitive user experience.

---

# ✨ Features

## 🔐 Authentication

- Email & Password Authentication
- Google OAuth Login
- Email Verification
- Forgot Password
- Password Reset
- Protected Routes
- Persistent User Sessions

---

## 👨‍🎓 Student Features

- Browse Tutors
- Search & Filter Tutors
- View Tutor Profiles
- Book Learning Sessions
- View Upcoming Sessions
- Booking History
- Leave Reviews & Ratings
- Real-time Messaging
- Manage Profile

---

## 👨‍🏫 Tutor Features

- Complete Tutor Profile
- Manage Availability
- View Bookings
- Accept or Decline Sessions
- View Student Reviews
- Manage Profile
- Real-time Messaging

---

## 👑 Admin Features

- Dashboard Overview
- User Management
- Tutor Management
- Booking Management
- Category Management
- Reports & Analytics

---

## 💬 Real-time Communication

- One-to-one Messaging
- Live Conversation Updates
- Instant Message Delivery

---

## 🎨 Modern UI

- Responsive Design
- Light & Dark Theme Support
- Beautiful Animations
- Mobile-Friendly Layout
- Accessible Components
- Professional Dashboard

---

# 🚀 Tech Stack

### Framework

- Next.js (App Router)
- React
- TypeScript

### Styling

- Tailwind CSS
- Shadcn/UI
- Radix UI
- Framer Motion

### State Management

- TanStack Query
- Zustand

### Forms & Validation

- TanStack Form
- Zod

### Authentication

- Better Auth

### Utilities

- date-fns
- Lucide React
- React Icons
- Sonner
- React Day Picker

---

# 📁 Project Structure

```
src
├── app
│   ├── (commonLayout)
│     ├── (protected)
          ├── auth
          ├── user
          ├── onboarding
          ├── forgot-password
          ├── reset-password
│     ├── about
│     ├── category
│     ├── course
│     ├── faq
│     ├── privacy-policy
│     ├── terms
│     ├── tutors
│     ├── layout.tsx
│     ├── page.tsx
│   ├── dashboard
│   └── api
├── components
│   ├── common
│   ├── core
│   ├── auth
│   ├── about
│   ├── skeletons
│   ├── faq
│   ├── layout
│   ├── landing
│   ├── ui
│   └── sections
├── constants
├── helpers
├── hooks
├── lib
├── providers
├── schemas
├── services
├── store
├── types
├── utils
├── env.ts
└── proxy.ts
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/skillbridge-frontend.git

cd skillbridge-frontend
```

---

## Install Dependencies

```bash
pnpm install
```

---

## Configure Environment Variables

Create a `.env.local` file.

Example:

```env
BACKEND_URL=
FRONTEND_URL=

AUTH_URL= 
API_URL=

NEXT_PUBLIC_BACKEND_URL=
NEXT_PUBLIC_FRONTEND_URL=

NEXT_PUBLIC_API_URL=

# Cloudinary credentials
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=

```

---

## Start Development Server

```bash
pnpm dev
```

Application will run on:

```
http://localhost:3000
```

---

## Production Build

Build the project:

```bash
pnpm build
```

Run production server:

```bash
pnpm start
```

---

# 📄 Pages

## Public Pages

- Home
- About
- Pricing
- Contact
- Tutors
- Tutor Details
- Login
- Register
- Verify Email
- Forgot Password
- Reset Password

---

## Student Dashboard

- Dashboard
- Profile
- Bookings
- Sessions
- Reviews
- Messages
- Settings

---

## Tutor Dashboard

- Dashboard
- Profile
- Availability
- Bookings
- Reviews
- Messages
- Settings

---

## Admin Dashboard

- Dashboard
- Users
- Tutors
- Categories
- Bookings
- Reports
- Settings

---

# 🔐 Authentication Flow

```
Register
      │
      ▼
Email Verification
      │
      ▼
Login
      │
      ▼
Select Role (First Time)
      │
      ▼
Complete Profile
      │
      ▼
Dashboard
```

---

# 📅 Booking Flow

```
Browse Tutors
      │
      ▼
View Tutor Profile
      │
      ▼
Choose Subject
      │
      ▼
Select Available Time
      │
      ▼
Book Session
      │
      ▼
Booking Confirmation
      │
      ▼
Attend Session
      │
      ▼
Leave Review
```

---

# 🎨 UI Highlights

- Responsive Navigation
- Hero Sections
- Featured Tutors
- Interactive Cards
- Booking Calendar
- Professional Dashboards
- Skeleton Loading States
- Empty States
- Toast Notifications
- Animated Components
- Modal Forms

---

# 🔄 API Integration

The frontend communicates with the SkillBridge backend REST API for:

- Authentication
- Tutor Profiles
- Student Profiles
- Categories
- Bookings
- Reviews
- Messaging
- Admin Operations

---

# 📦 Scripts

| Command | Description |
|----------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build production application |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

---

# 📱 Responsive Design

Optimized for:

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

# ⚡ Performance Features

- Server Components
- Client Components
- Dynamic Imports
- Image Optimization
- Route-based Code Splitting
- Lazy Loading
- Optimized API Fetching
- Request Caching
- Debounced Search

---

# 🛡 Security

- Protected Routes
- Session-based Authentication
- Secure HTTP-only Cookies
- Input Validation
- Route Authorization
- Role-based Access Control

---

# 🌍 Deployment

The frontend is optimized for deployment on:

- Vercel
- Netlify
- AWS Amplify
- Cloudflare Pages

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "feat: add new feature"
```

4. Push your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👩‍💻 Author

**Sabrina Mostafa**

- GitHub: [sabrina-mostafa](https://github.com/sabrina-mostafa)
- LinkedIn: [Sabrina Mostafa](https://www.linkedin.com/in/sabrina-mostafa-389114207/)

---

⭐ If you found this project helpful, consider giving it a star on GitHub!
