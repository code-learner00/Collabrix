# Collabrix — KOL × Brand Collaboration Platform

> A production-ready, two-sided marketplace connecting Key Opinion Leaders (KOLs / Influencers) with Brands for paid collaborations. The platform handles discovery, negotiation, campaign management, escrow payments, and analytics.

Collabrix enables brands to create and manage influencer campaigns while allowing KOLs to discover opportunities, negotiate terms, collaborate, and track earnings —all within a structured, role-based system.

## Demo Accounts

| Role    | Email                 | Password |
|---------|-----------------------|----------|
| KOL     | demo-kol@demo.com     | demo123  |
| Company | demo-company@demo.com | demo123  |

All data is mock. No backend connection is required to run the demo.

## Folder Structure

```
kol-platform/
├── src/
│   │
│   ├── api/                          # all the API calls are here (using Axios)
│   ├── assets/                       # images, avatars, and logo files
│   ├── components/
│   │   ├── admin/                    # admin stuff, will be used later
│   │   ├── common/                   # components that are used everywhere
│   │   ├── company/                  # components only for company users
│   │   ├── kol/                      # components only for KOL users
│   │   └── layout/                   # sidebar, topbar, notification dropdown stuff
│   ├── context/                      # global state for auth, messages, notifications
│   ├── hooks/                        # some custom hooks I made — debounce, socket, toast
│   ├── pages/
│   │   ├── auth/                     # login, register, forgot password, profile setup pages
│   │   ├── company/                  # all pages for company users like dashboard, campaigns, wallet
│   │   ├── kol/                      # all pages for KOL users like dashboard, collaborations, wallet
│   │   └── public/                   # pages anyone can see — Home, About, Pricing, Explore, 404
│   ├── routes/                       # routes are defined here, also has role protection
│   ├── styles/                       # global CSS and some design variables I set up
│   ├── utils/                        # helper functions, constants, and some fake data for testing
│   ├── App.jsx                       # main component that puts everything together
│   └── main.jsx                      # starting point of the app
│
├── .env.example                     
├── index.html                       
├── vite.config.js                    
└── package.json                      # all dependencies and scripts are here
```
---

## Core Features

### Authentication
- Login works with JWT, it checks the role and takes you to the right page
- KOL users go to `/kol/dashboard`, Company users go to `/company/dashboard` after login
- KOL signup needs: Email, Password, Full Name, Country, Category, Platform
  → then it takes you to `KolProfileCompletion` page
- Company signup needs: Company Name, Email, Password, Website, Industry,
  Country → then it takes you to `CompanyProfileSetup` page
- Both roles have their own profile setup pages after signing up

### Invite System

**Company → KOL (Company sends invite to KOL)**
Company can look through KOLs on `/company/browse-kols` and send them an invite from the KOL card or from the campaigns page. The KOL gets a notification and can see it in their Incoming Requests with status showing `invited`.

**KOL → Campaign (KOL applies to a campaign)**
KOL can find open campaigns on `/explore-campaigns` and apply. The company will then see them under Applied KOLs on their campaign page.

**What KOL can do:** Accept → becomes `in-progress` | Negotiate → opens chat | Reject → becomes `rejected`

**What Company can do:** Approve KOL | Send Invite | Mark Deliverable as Done | Release Payment

### Profile Management

- **KOL:** Can edit Bio, Niche, Location, Languages, Audience info, upload Media Kit, upload Portfolio, and show Past Campaign stats — has Edit and Preview mode
- **Company:** Can update Logo, Description, Website, Industry, and shows Verification Badge and Past Campaigns — has Edit and View mode
- All fields have proper validation

### Campaign Management

- Creating a campaign needs: Title, Description, Deliverables, Budget Range, Deadline, Target Audience, Platform, Target Country, and you can attach files — everything is validated
- Each campaign shows: Budget, KOLs who applied, KOLs who got approved, Status, and Deliverables

### Wallet & Escrow

- **KOL:** Can see Available Balance, Pending Balance, Total Earned, withdraw money, and view Transaction History (with pages and date filter), also manage Payment Methods
- **Company:** Can see Total Funds, Current Balance, Funds locked in Escrow, Add Funds, and Transaction History with escrow info and confirmation popups

### Analytics

- **KOL Dashboard:** Revenue Over Time chart (line), Campaign Success Rate (pie chart), Engagement Growth (bar chart)
- **Company Dashboard:** ROI Chart, Success Rate, and Budget Spent info
- All charts use Recharts library — they resize and work on all screens

---

## Reusable Components Architecture

| Component           | Reused In                        |
|---------------------|------------------------------------------|
| `Modal`             | Proposals, confirmations, messaging      |
| `Toast`             | Every form and action feedback           |
| `Pagination`        | KOL list, transactions, campaigns        |
| `EmptyState`        | All list pages when there's nothing      |
| `ErrorState`        | When API calls fail                      |
| `ErrorBoundary`     | Wrapped around all page components       |
| `CardSkeleton`      | Loading state for KOL and campaign cards |
| `TableSkeleton`     | Loading state for transaction table      |
| `LoadingSpinner`    | Inside buttons and small loaders         |
| `StatusTag`         | Collaboration and campaign cards         |

---

## Criteria

| Criterion             | Implementation                                                           |
|-----------------------|-------------------------------------------------------------------------|
| Clean Architecture    | Kept features in separate folders, all API calls go through one place   |
| UI/UX Quality         | Used CSS variables for design, made 3 types of skeleton loaders         |
| State Management      | Used 3 contexts + local state                                           |
| Role-based Routing    | ProtectedRoute checks JWT and role, wrong role gets sent to dashboard   |
| Code Reusability      | Made 9 shared components, didn't repeat code for KOL and Company pages  |
| Mobile Responsiveness | Made a responsive.css file, chat works on mobile, sidebar collapses     |
| Error Handling        | Added Axios interceptor and ErrorBoundary for catching errors           |
| Scalability Readiness | API layer is separate, CSS tokens used                                  |
