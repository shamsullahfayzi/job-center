# Job Center

**A two-sided job board: seekers browse and apply, employers post jobs and review applicants — in one React app.**

![React](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?logo=reactrouter&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

<!-- Add screenshots: job feed, job detail + application form, hiring dashboard -->

---

## Features

**Job seekers**
- Job feed with every open position
- Job detail page with an application form (name, email, phone, cover letter)

**Employers**
- Switch to the employer view from the navbar — one account, two roles
- Hiring dashboard: post new jobs, see your posts, and review every applicant per job

**Accounts**
- Register and log in; the session survives a page refresh
- Protected routes redirect logged-out users to the login page

## How it's built

- **State:** two React contexts — `AuthContext` (session, role) driven by a `useReducer`, and `DataContext` (jobs, applications)
- **Persistence:** a single storage module (`src/lib/storage.js`) is the only code that touches `localStorage`. Every read is defensive: missing keys fall back to defaults and malformed JSON never crashes the app
- **Seed data:** sample jobs on first load so the feed is never empty
- **Routing:** React Router 7 with a `ProtectedRoute` wrapper

```
src/
  context/     AuthContext · DataContext
  lib/         storage.js — the only localStorage access point
  components/  Navbar · JobCard · ApplicationForm · CreateJobForm · ProtectedRoute
  pages/       AuthPage · JobFeed · JobDetail · EmployerDashboard
```

## Run it

```bash
git clone https://github.com/shamsullahfayzi/job-center.git
cd job-center
npm install
npm run dev
```

## Scope

This is a **frontend-only** build: all data lives in your browser's `localStorage`, and accounts exist only on that device. It is a demo, not a secure system — passwords are stored as entered. The storage module is the seam for a real backend: swap it for API calls (e.g. NestJS + PostgreSQL with hashed passwords and JWT sessions) and the components don't change.

## Author

**Shamsullah Fayzi** · [GitHub](https://github.com/shamsullahfayzi)
