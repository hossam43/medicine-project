# 🏥 MediShop — Online Pharmacy & Fitness Store

> Egypt's most trusted online pharmacy and fitness store. Browse certified medical products, manage prescriptions, and get doorstep delivery in 30 minutes across Cairo & Giza.

![MediShop](https://img.shields.io/badge/MediShop-v1.0-0057B7?style=for-the-badge&logo=heart&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-TEST%20MODE-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Payment Integration](#payment-integration)
- [API Reference](#api-reference)
- [Pages](#pages)
- [Deployment](#deployment)
- [Security Notes](#security-notes)

---

## 🌟 Overview

MediShop is a full-stack e-commerce web application built for the Egyptian medical and fitness market. It features a complete shopping experience — from product browsing and cart management to secure Stripe-powered checkout and a full user account dashboard with order history, wishlist, and loyalty points.

---

## ✨ Features

### 🛒 Shopping
- Product catalog with categories, search, and filters
- Flash deals with countdown timers
- Shopping cart with real-time quantity updates
- Wishlist / favorites system

### 💳 Checkout & Payments
- **Stripe** credit/debit card payments (TEST mode)
- **Fawry** — pay at any Fawry outlet
- **Vodafone Cash** — mobile wallet transfer
- **Cash on Delivery** — with +$2 service fee
- Promo code system (`HEALTH10`, `MEDISHOP`, `WELCOME20`)
- Server-side total calculation (never trusts client)
- Multi-step checkout with form validation

### 👤 User Accounts
- Register / Login with JWT authentication
- Password strength meter
- Forgot password flow
- Full dashboard with:
  - **My Profile** — edit name, phone, change password
  - **My Orders** — full order history with status tracking
  - **Wishlist** — saved products
  - **Loyalty Points** — Bronze / Silver / Gold tiers
  - **Saved Addresses**
  - Notification preferences

### 🚀 Delivery
- 30-minute delivery in Cairo & Giza
- 2–4 hours in Alexandria
- Next-day for Sharm El Sheikh & Hurghada
- Delivery estimate shown at checkout based on city

### 🎨 UI/UX
- Fully responsive (mobile, tablet, desktop)
- Dark/light theme support via CSS variables
- Toast notifications
- Smooth animations and transitions
- FontAwesome icons + Google Fonts (Syne + DM Sans)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Backend | Node.js + Express |
| Payments | Stripe (Test Mode) |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Database | In-memory (no DB required for dev) |
| Fonts | Google Fonts — Syne, DM Sans |
| Icons | Font Awesome 6 |
| Dev Server | nodemon |

---

## 📁 Project Structure

```
medicine-project/
├── frontend/
│   ├── index.html          # Home — product catalog
│   ├── checkout.html       # Multi-step checkout + Stripe
│   ├── account.html        # Login / Register / Dashboard
│   ├── articles.html       # Health articles
│   ├── ms-shared.css       # Global design system (CSS variables, components)
│   └── ms-data.js          # Shared helpers (cart, wishlist, localStorage)
│
├── backend/
│   ├── server.js           # Express API server
│   ├── .env                # ⚠️ NOT committed — see below
│   ├── package.json
│   └── node_modules/
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ 
- npm
- A [Stripe account](https://stripe.com) (free)

### 1. Clone the repo

```bash
git clone https://github.com/hossam43/medicine-project.git
cd medicine-project
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Create your `.env` file

```bash
cp .env.example .env
```

Then fill in your keys (see [Environment Variables](#environment-variables)).

### 4. Start the backend

```bash
npm run dev
# Server runs on http://localhost:3001
```

### 5. Open the frontend

Open `frontend/index.html` with **Live Server** (VS Code extension) or any static server:

```bash
# Using Python
python3 -m http.server 5500 --directory frontend

# Using npx
npx serve frontend
```

Then visit `http://127.0.0.1:5500`

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` folder. **Never commit this file.**

```env
# ── Stripe (get from dashboard.stripe.com/test/apikeys) ──
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# ── JWT (any long random string) ──
JWT_SECRET=your_super_secret_jwt_key_change_this

# ── Server ──
PORT=3001
```

> ⚠️ The `.env` file is listed in `.gitignore` and must never be pushed to GitHub.

---

## 💳 Payment Integration

MediShop uses **Stripe in TEST mode** — no real money is charged.

### Test Card Numbers

| Card | Number | Expiry | CVC |
|------|--------|--------|-----|
| ✅ Success | `4242 4242 4242 4242` | Any future | Any |
| ❌ Declined | `4000 0000 0000 0002` | Any future | Any |
| 🔐 3D Secure | `4000 0025 0000 3155` | Any future | Any |

### Payment Flow

```
Frontend (checkout.html)
    │
    ├── POST /api/payment/create-intent  →  Backend creates Stripe PaymentIntent
    │                                        (calculates total server-side)
    ├── stripe.confirmCardPayment()      →  Stripe processes card
    │
    └── POST /api/orders/confirm         →  Backend verifies with Stripe,
                                            saves order, awards loyalty points
```

### Going Live
1. Replace `sk_test_` and `pk_test_` keys with live keys from Stripe dashboard
2. Set up a webhook endpoint at `/api/webhook`
3. Update `STRIPE_WEBHOOK_SECRET` with the live webhook secret
4. Change `const API` in `checkout.html` and `account.html` to your production URL

---

## 📡 API Reference

Base URL: `http://localhost:3001/api`

### Auth

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/register` | Create new account | No |
| `POST` | `/auth/login` | Login, returns JWT | No |
| `GET` | `/auth/profile` | Get user + orders | Bearer token |
| `PUT` | `/auth/profile` | Update name/phone/password | Bearer token |

### Payments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/payment/create-intent` | Create Stripe PaymentIntent | No |
| `POST` | `/orders/confirm` | Confirm order after payment | Optional |
| `POST` | `/coupon/validate` | Validate promo code | No |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/orders` | List all orders (debug) |
| `GET` | `/orders/:id` | Get single order |

### Health

```bash
GET /api/health
# Returns server status, Stripe mode, user/order counts
```

---

## 📄 Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Product catalog, flash deals, search |
| Checkout | `checkout.html` | Cart summary, address, payment |
| Account | `account.html` | Auth + full user dashboard |
| Articles | `articles.html` | Health & wellness blog |

---

## 🌐 Deployment

### Backend (Railway / Render / Heroku)

1. Push your code (without `.env`)
2. Set environment variables in the platform dashboard
3. Set start command to `node server.js`

### Frontend (Vercel / Netlify / GitHub Pages)

1. Update `const API` in `checkout.html` and `account.html` to your live backend URL:
```javascript
const API = 'https://your-backend.up.railway.app/api';
```
2. Deploy the frontend folder

### ⚠️ Important: Switch to a Real Database

The current backend uses **in-memory storage** — all users and orders are lost when the server restarts. Before going live, replace the `USERS` and `ORDERS` arrays with a real database:

- **MongoDB** (recommended) — via Mongoose
- **PostgreSQL** — via Prisma or pg
- **SQLite** — via better-sqlite3 (simple, file-based)

---

## 🔒 Security Notes

- ✅ Passwords hashed with **bcrypt** (10 salt rounds)
- ✅ Auth via **JWT** tokens (7-day expiry)
- ✅ Order totals calculated **server-side** (never trust client)
- ✅ Stripe payment verified server-side before order confirmation
- ✅ CORS configured for frontend origins
- ⚠️ `.env` must never be committed to version control
- ⚠️ Rotate your Stripe keys if they were ever exposed in a commit
- ⚠️ In-memory DB resets on server restart — add a real DB before production

---

## 👤 Author

**Hossam** — [@hossam43](https://github.com/hossam43)

---

## 📝 License

MIT License — free to use and modify.

---

> Built with ❤️ for the Egyptian healthcare market 🇪🇬