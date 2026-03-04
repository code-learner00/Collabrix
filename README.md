# Collabrix — KOL × Brand Collaboration Platform

> A production-ready, two-sided marketplace connecting Key Opinion Leaders (KOLs / Influencers) with Brands for paid collaborations. The platform handles discovery, negotiation, campaign management, escrow payments, and analytics.

Collabrix enables brands to create and manage influencer campaigns while allowing KOLs to discover opportunities, negotiate terms, collaborate, and track earnings —all within a structured, role-based system.

## Demo Accounts

| Role    | Email                 | Password |
|---------|-----------------------|----------|
| KOL     | demo-kol@demo.com     | demo123  |
| Company | demo-company@demo.com | demo123  |

All data is mock. No backend connection is required to run the demo.

---

## Folder Structure

```
kol-platform/
├── src/
│   │
│   ├── api/                          # Axios instances, interceptors & all API calls
│   ├── assets/                       # Static files — images, avatars, logo
│   ├── components/
│   │   ├── admin/                    # Placeholder components reserved for admin phase
│   │   ├── common/                   # Shared reusable components used across all roles
│   │   ├── company/                  # Company-specific UI components
│   │   ├── kol/                      # KOL-specific UI components
│   │   └── layout/                   # App shell — sidebars, topbar, notification dropdown
│   ├── context/                      # Global state providers — Auth, Messages, Notifications
│   ├── hooks/                        # Custom reusable hooks — debounce, socket, toast
│   ├── pages/
│   │   ├── auth/                     # Login, Register, ForgotPassword, profile onboarding
│   │   ├── company/                  # All company-role pages — dashboard, campaigns, wallet
│   │   ├── kol/                      # All KOL-role pages — dashboard, collaborations, wallet
│   │   └── public/                   # Public pages — Home, About, Pricing, Explore, 404
│   ├── routes/                       # Route definitions and ProtectedRoute role guard
│   ├── styles/                       # Global CSS, design tokens, and responsive breakpoints
│   ├── utils/                        # Formatters, constants, and mock demo data
│   ├── App.jsx                       # Root component — wraps providers and router
│   └── main.jsx                      # React DOM entry point
│
├── .env.example                     
├── index.html                       
├── vite.config.js                    
└── package.json                      # Dependencies, scripts, and project metadata

---
## Core Features

### Authentication
- JWT-based login with role decoding and automatic redirect
- KOL → `/kol/dashboard`, Company → `/company/dashboard` on login
- KOL registration: Email, Password, Full Name, Country, Category, Platform
  → redirects to `KolProfileCompletion`
- Company registration: Company Name, Email, Password, Website, Industry,
  Country → redirects to `CompanyProfileSetup`
- Dedicated post-registration onboarding pages for both roles

### Invite System

**Company → KOL (Outbound Invite)**
Company browses KOLs on `/company/browse-kols`, sends an invite from a KOL
card or campaign management page. The KOL receives a notification and the
collaboration appears in Incoming Requests with status `invited`.

**KOL → Campaign (Inbound Application)**
KOL discovers open campaigns on `/explore-campaigns` and submits an
application. It appears in the Company's campaign page under Applied KOLs.

**KOL Response Actions:** Accept → `in-progress` | Negotiate → opens chat |
Reject → `rejected`

**Company Actions:** Approve KOL | Send Invite | Mark Deliverable Complete |
Release Payment

### Profile Management

- **KOL:** Bio, Niche, Location, Languages, Audience Demographics, Media Kit
  upload, Portfolio upload, Past Campaign Performance — Edit and Preview mode
- **Company:** Logo, Description, Website, Industry, Verification Badge, Past
  Campaigns — Edit and View mode
- Full validation on all fields

### Campaign Management

- Create Campaign: Title, Description, Deliverables, Budget Range, Deadline,
  Target Audience, Platform, Country Target, File Attachments — validated form
- Per-campaign tracking: Budget, Applied KOLs, Approved KOLs, Status,
  Deliverables

### Wallet & Escrow

- **KOL:** Available Balance, Pending Balance, Total Earned, Withdraw,
  Transaction History (paginated, date-filtered), Payment Methods
- **Company:** Total Funds, Current Balance, Funds in Escrow, Add Funds,
  Transaction History with escrow indicators and confirmation modals

### Analytics

- **KOL Dashboard:** Revenue Over Time (line), Campaign Success Rate (pie),
  Engagement Growth (bar)
- **Company Dashboard:** ROI Chart, Success Rate widget, Budget Spent tracking
- All charts via Recharts — responsive and interactive

---

## Reusable Component Architecture

| Component           | Reused In                               |
|---------------------|-----------------------------------------|
| `Modal`             | Proposals, confirmations, messaging     |
| `Toast`             | Every form submission and action        |
| `Pagination`        | KOLs, transactions, campaigns           |
| `EmptyState`        | All list views when data is absent      |
| `ErrorState`        | All async data fetching failures        |
| `ErrorBoundary`     | Wraps all page-level components         |
| `CardSkeleton`      | KOL cards, campaign cards loading       |
| `TableSkeleton`     | Transaction history loading             |
| `LoadingSpinner`    | Buttons and inline loaders              |
| `StatusTag`         | Collaboration and campaign cards        |

## Collaboration Lifecycle

Every stage updates Campaign Status, Wallet UI, and Chat Status Panel.

```
1.  Company creates campaign
2.  Company sends invite  OR  KOL applies
3.  KOL accepts invite              →  company notified
4.  Chat negotiation begins         →  status: negotiating
5.  KOL sends Final Offer
6.  Both parties accept             →  status: in-progress
7.  Funds move to escrow            →  Company wallet updates
8.  KOL submits deliverable
9.  Company approves deliverable
10. Funds released to KOL wallet    →  status: completed
```

---

## Criteria

| Criterion             | Implementation                                                          |
|-----------------------|-------------------------------------------------------------------------|
| Clean Architecture    | Feature-based folders, centralized API layer, no cross-role coupling    |
| UI/UX Quality         | CSS token design system, 3 skeleton types, 4-state handling everywhere  |
| State Management      | 3 focused contexts + local state; no over-engineering with Redux        |
| Role-based Routing    | ProtectedRoute validates JWT + role; wrong role redirects to dashboard  |
| Code Reusability      | 13 shared common/ components, zero duplication across KOL/Company pages |
| Mobile Responsiveness | responsive.css, mobile-first chat, collapsible sidebar, 3 breakpoints   |
| Error Handling        | Axios interceptor + ErrorBoundary + 4-state pattern on every component  |
| Scalability Readiness | API layer, EventBus swap-ready, CSS tokens, env-driven config           |

