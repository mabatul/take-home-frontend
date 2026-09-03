# Loan Application Frontend

A Next.js frontend for submitting loan applications. Users fill out a form with
personal, company, and financial details, and are routed to an approval or
denial page based on the decision returned by the backend.

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) v4
- [react-hook-form](https://react-hook-form.com) + [Zod](https://zod.dev) for
  form state and validation

## Features

- Loan application form with client-side validation (first/last name, address,
  state, company name, requested amount, and SSN).
- **Searchable US state combobox**: type a state name or code and matching
  options appear for selection (all 50 states, shown as `CA - California`).
- Automatic routing to `/approved` or `/denied` result pages based on the
  backend response, including support for returning customers.
- Responsive, accessible layout.

## Getting Started

### Prerequisites

- Node.js 20+ (and npm)
- A running backend that exposes `POST /api/Loan` (default
  `http://localhost:5175`). Override it with the `NEXT_PUBLIC_API_URL`
  environment variable if your API lives elsewhere.

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the development server (Turbopack) |
| `npm run build`   | Create an optimized production build     |
| `npm run start`   | Start the production server              |
| `npm run lint`    | Lint the codebase with ESLint            |

## Project Structure

```
app/
  page.tsx              # Home page, renders the application form
  layout.tsx            # Root layout
  approved/page.tsx     # Approval result page
  denied/page.tsx       # Denial result page
components/
  ApplicationForm.tsx   # Main form (react-hook-form + Zod)
  StateSelect.tsx       # Searchable US state combobox
  Field.tsx             # Generic labeled input wrapper
lib/
  states.ts             # US state list (code + name)
  api.ts                # API client (POST /api/Loan)
  types.ts              # Shared TypeScript types
```

## Backend & Mock Service

This repository is the frontend of a larger take-home project:

- **Backend** (`.NET`, C#): exposes `POST /api/Loan`, evaluates the application
  through a rule engine (e.g. denied states, SSN blacklist), and persists
  customers and applications. See the `backend/` directory of the project.
- **Mock external service** (Node/Express): simulates an external provider with
  `/api/customers` and `/api/applications` endpoints. See the `mock-service/`
  directory.
