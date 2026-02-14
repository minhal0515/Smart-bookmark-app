# 🔖 Smart Bookmark Manager — Realtime Multi-User Web App

A production-ready bookmark management app that supports authentication, realtime updates, and secure per-user data isolation.

Built to demonstrate full-stack engineering skills including SSR auth, database security, realtime systems, and deployment debugging.

---

## 🚀 Live Demo

**Production URL:**
https://smart-bookmark-app-omega-one.vercel.app

---

## 🧰 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Database:** Supabase Postgres
* **Auth:** Supabase OAuth (Google)
* **Realtime:** Supabase Realtime subscriptions
* **Styling:** Tailwind CSS
* **Hosting:** Vercel

---

## ✨ Features

* Google OAuth login
* Per-user bookmark storage
* Secure Row Level Security (RLS)
* Realtime sync across tabs/devices
* SSR session handling
* Protected routes
* Production deployment

---

## 🔐 Security Architecture

This app uses **defense-in-depth access control**:

| Layer      | Protection               |
| ---------- | ------------------------ |
| Database   | Row Level Security       |
| Server     | Authenticated SSR client |
| Query      | user_id filters          |
| Middleware | Token refresh            |

Even if one layer fails, data isolation remains enforced.

---

## 🧠 Real Engineering Problems Solved

This project intentionally documents real debugging challenges encountered during development.

---

### 1. Realtime events firing inconsistently

**Problem:** INSERT events sometimes didn’t trigger.

**Cause:** Postgres publication configuration + RLS interaction.

**Fix:** Verified publication settings and adjusted policies so realtime service role could read rows without exposing them to users.

---

### 2. Cross-user data leak

**Problem:** Users could see other users’ bookmarks.

**Cause:** Queries relied only on RLS filtering.

**Fix:** Added explicit query filters:

```
.eq("user_id", user.id)
```

This ensures user isolation even if auth context fails.

---

### 3. OAuth login loop in production

**Problem:** Login redirected back to login page.

**Cause:** Callback route used read-only server client that couldn’t set cookies.

**Fix:** Created dedicated auth callback client with cookie write permissions.

---

### 4. Random session logout errors

**Problem:** Refresh token errors during SSR.

**Cause:** Missing middleware session refresh layer.

**Fix:** Implemented middleware to refresh Supabase session before every request.

---

### 5. Production crash after deployment

**Problem:** Vercel showed server error but worked locally.

**Cause:** Missing environment variables in Vercel.

**Fix:** Added Supabase URL + anon key to production environment.

---

## 📁 Project Structure

```
app/
  dashboard/
  auth/callback/
components/
lib/
supabase/
middleware.ts
```

---

## 🧪 Running Locally

```
git clone <repo>
cd project
npm install
npm run dev
```

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## 🎯 What This Project Demonstrates

This project was built to showcase ability to:

* Debug production deployment issues
* Implement secure SSR authentication
* Architect multi-user systems
* Handle realtime data consistency
* Diagnose database policy bugs
* Integrate third-party OAuth
* Ship a complete app end-to-end

---

## 📌 Key Takeaway

This is not a tutorial project.
It is a **production-grade system** built while solving real infrastructure and security problems.

---

## 👤 Author

Minhal Naqvi

---

## ⭐ If you're a recruiter

This project represents hands-on experience with real full-stack engineering challenges rather than guided tutorials.
