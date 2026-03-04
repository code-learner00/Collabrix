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
│   ├── api/                          
│   │   ├── axios.js                  
│   │   ├── auth.js
│   │   ├── campaigns.js
│   │   ├── collaborations.js
│   │   ├── kols.js
│   │   ├── notifications.js
│   │   └── wallet.js
│   │
│   ├── assets/
│   │   ├── logo.svg
│   │   └── avatars/
│   │       ├── scarlett.png          
│   │       ├── krystalle.png         
│   │       ├── sanjeev.png           
│   │       ├── prasad.png            
│   │       ├── aqualogica.png       
│   │       └── nivea.png            
│   │
│   ├── components/
│   │   ├── admin/
│   │   │   └── AdminPlaceholder.jsx  
│   │   │
│   │   ├── common/                   
│   │   │   ├── Avatar.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── CardSkeleton.jsx
│   │   │   ├── DashboardSkeleton.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── StatusTag.jsx
│   │   │   ├── TableSkeleton.jsx
│   │   │   └── Toast.jsx
│   │   │
│   │   ├── company/                  # Company-specific components
│   │   │   ├── CampaignCard.jsx
│   │   │   ├── CampaignFilters.jsx
│   │   │   ├── KolCard.jsx
│   │   │   └── ROIChart.jsx
│   │   │
│   │   ├── kol/                      # KOL-specific components
│   │   │   ├── CollaborationCard.jsx
│   │   │   ├── RevenueChart.jsx
│   │   │   ├── SocialAccountCard.jsx
│   │   │   └── WalletCard.jsx
│   │   │
│   │   └── layout/                   
│   │       ├── CompanyLayout.jsx
│   │       ├── CompanySidebar.jsx
│   │       ├── KolLayout.jsx
│   │       ├── KolSidebar.jsx
│   │       ├── NotificationDropdown.jsx
│   │       └── Topbar.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx          
│   │   ├── MessagesContext.jsx       # Chat thread and message state
│   │   └── NotificationContext.jsx  
│   │
│   ├── hooks/
│   │   ├── useDebounce.js            # Debounced search input
│   │   ├── useSocket.js              
│   │   └── useToast.js               # Toast trigger hook
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── CompanyProfileSetup.jsx   # Post-registration company onboarding
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── KolProfileCompletion.jsx  # Post-registration KOL onboarding
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── company/
│   │   │   ├── BrowseKols.jsx
│   │   │   ├── Campaigns.jsx
│   │   │   ├── CompanyDashboard.jsx
│   │   │   ├── CompanyMessages.jsx
│   │   │   ├── CompanyProfile.jsx
│   │   │   ├── CompanySettings.jsx
│   │   │   ├── CompanyWallet.jsx
│   │   │   └── CreateCampaign.jsx
│   │   │
│   │   ├── kol/
│   │   │   ├── Collaborations.jsx
│   │   │   ├── KolDashboard.jsx
│   │   │   ├── KolProfile.jsx
│   │   │   ├── KolSettings.jsx
│   │   │   ├── KolWallet.jsx
│   │   │   ├── Messages.jsx
│   │   │   └── SocialAccounts.jsx
│   │   │
│   │   └── public/
│   │       ├── About.jsx
│   │       ├── ExploreCampaigns.jsx
│   │       ├── ExploreKols.jsx
│   │       ├── Home.jsx
│   │       ├── NotFound.jsx          # 404 catch-all
│   │       └── Pricing.jsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx             # All route definitions
│   │   └── ProtectedRoute.jsx        # Role guard + redirect logic
│   │
│   ├── styles/
│   │   ├── variables.css             
│   │   ├── global.css                
│   │   ├── auth.css
│   │   ├── components.css           
│   │   ├── dashboard.css
│   │   ├── layout.css
│   │   └── responsive.css            
│   │
│   ├── utils/
│   │   ├── constants.js              
│   │   ├── demoData.js               
│   │   └── formatters.js             
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── index.html
├── vite.config.js
└── package.json

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

