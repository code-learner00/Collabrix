# Collabrix — KOL × Brand Collaboration Platform

> A production-ready, two-sided marketplace connecting Key Opinion Leaders (KOLs / Influencers) with Brands for paid collaborations. The platform handles discovery, negotiation, campaign management, escrow payments, and analytics.

## Features

### Authentication

- JWT-based login flow with role detection
- `AuthContext` stores `{ id, name, email, role, isDemo }`
- After login, users are redirected:
  - KOL → `/kol/dashboard`
  - Company → `/company/dashboard`
- **KOL Registration fields:** Email, Password, Full Name, Country, Category/Niche, Primary Platform → redirects to Profile Completion
- **Company Registration fields:** Company Name, Email, Password, Website, Industry, Country → redirects to Company Profile Setup
- Password security gate: current password must be verified before new password field unlocks

### KOL Dashboard

**Overview widgets:** Total Collaborations, Pending Requests, Revenue Earned, Rating, Active Campaigns, Performance Stats

**Charts:** Revenue Over Time, Campaign Success Rate, Engagement Growth

**Profile page sections:** Profile Picture, Bio, Niche, Location, Languages, Audience Demographics, Media Kit Upload, Portfolio Upload, Past Campaign Performance — supports both Edit and Preview modes.

**Social accounts:** Add accounts with OAuth or manual verification; displays Followers, Engagement Rate, Average Likes, Average Views per platform. Each URL renders as a live anchor (`target=_blank`).

**Collaborations page tabs:**
- Incoming Requests
- Active Collaborations
- Completed
- Rejected

Each collaboration card shows Company Name, Campaign Title, Budget, Timeline, Status, and action buttons (Accept / Negotiate / Reject).

### Company Dashboard

**Overview widgets:** Active Campaigns, Total Budget Spent, Total KOLs Hired, Success Rate, ROI Chart

**Browse KOLs filters:** Platform, Country, Followers Range, Engagement Rate, Category, Budget Range, Rating — with debounced search, pagination (6 per page), and three modals (View Profile, Send Proposal, Send Message).

**Message modal:** KOL identity strip, message type dropdown (Collaboration, Sponsorship, Custom), pre-generated default text per type.

**Create Campaign fields:** Campaign Title, Description, Deliverables, Budget Range, Deadline, Target Audience, Required Platform, Country Target, File Attachments — with validation and success confirmation.

**Campaign management:** Per-campaign tracking of Total Budget, Applied KOLs, Approved KOLs, Status, Deliverables. Actions: Send Invite, Approve KOL, Mark Deliverable Complete, Release Payment.

### Wallet & Escrow

**KOL Wallet sections:** Available Balance, Pending Balance, Total Earned, Withdraw, Transaction History (with pagination and date filters), Payment Method Management.

**Company Wallet sections:** Total Funds Added, Current Balance, Funds in Escrow, Add Funds, Transaction History — with escrow indicators, status tags, and confirmation modals.

## Collaboration Lifecycle

The platform reflects the full lifecycle visually across Wallet UI, Campaign Status, and Chat Status Panel:

```
1. Company creates campaign
2. Company invites KOL  
3. Chat negotiation begins        → status: negotiating
4. Final Offer sent
5. Both parties click "Accept"    → status: in-progress
6. Funds move to escrow           → Wallet UI updates
7. KOL submits deliverable
8. Company approves deliverable
9. Funds released to KOL wallet   → status: completed
```

### Password Verification

- **Current:** Compares against hardcoded `MOCK_OLD_PASSWORD = 'demo123'`
- **Production:** `POST /auth/verify-password` with `{ currentPassword }`. Gate logic stays identical.


