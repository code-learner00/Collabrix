import scarlettAvatar from '../assets/avatars/scarlett.png'
import krystalleAvatar from '../assets/avatars/krystalle.png'
import sanjeevAvatar from '../assets/avatars/sanjeev.png'
import prasadAvatar from '../assets/avatars/prasad.png'
import niveaAvatar from '../assets/avatars/nivea.png'

export const demoKolStats = {
  totalCollaborations: 24,
  pendingRequests: 3,
  revenueEarned: 142500,
  rating: 4.1,
  activeCampaigns: 5
}

export const demoCompanyStats = {
  activeCampaigns: 8,
  budgetSpent: 520000,
  totalKolsHired: 34,
  successRate: 87
}

export const demoRevenueChart = [
  { month: 'Jul', revenue: 8000 },
  { month: 'Aug', revenue: 14500 },
  { month: 'Sep', revenue: 11000 },
  { month: 'Oct', revenue: 22000 },
  { month: 'Nov', revenue: 18500 },
  { month: 'Dec', revenue: 31000 },
  { month: 'Jan', revenue: 28000 },
]

export const demoROIChart = [
  { month: 'Jul', spent: 40000, earned: 85000 },
  { month: 'Aug', spent: 55000, earned: 120000 },
  { month: 'Sep', spent: 48000, earned: 98000 },
  { month: 'Oct', spent: 72000, earned: 165000 },
  { month: 'Nov', spent: 60000, earned: 140000 },
  { month: 'Dec', spent: 90000, earned: 210000 },
]

export const demoCampaignChart = [
  { name: 'Completed', value: 18 },
  { name: 'Active', value: 5 },
  { name: 'Draft', value: 3 },
]

export const demoEngagementChart = [
  { month: 'Jul', rate: 3.2 },
  { month: 'Aug', rate: 4.1 },
  { month: 'Sep', rate: 3.8 },
  { month: 'Oct', rate: 5.2 },
  { month: 'Nov', rate: 4.9 },
  { month: 'Dec', rate: 6.1 },
  { month: 'Jan', rate: 5.8 },
]

export const demoKolProfile = {
  id: 'kol-001',
  name: 'Scarlett',
  email: 'demo-kol@demo.com',
  category: 'Lifestyle & Beauty',
  country: 'United States',
  bio: 'NYC-based lifestyle creator sharing beauty routines, campus life, and wellness content.',
  priceFrom: 30000,
  rating: 4.1,
  verified: true,
  avatar: scarlettAvatar,
  socialAccounts: [
    {
      id: 'sa-1',
      platform: 'Instagram',
      handle: '@something.scarlett',
      url: 'https://www.instagram.com/something.scarlett/',
      followers: 95000,
      engagementRate: 0.62,
      avgLikes: 589,
      avgViews: 12000,
      verified: true
    },
    {
      id: 'sa-2',
      platform: 'YouTube',
      handle: '@somethingscarlett',
      url: 'https://www.youtube.com/@somethingscarlett',
      followers: 38000,
      engagementRate: 4.3,
      avgLikes: 1634,
      avgViews: 28000,
      verified: false
    }
  ]
}

export const demoCompanyProfile = {
  id: 'company-001',
  name: 'NIVEA',
  email: 'demo-company@demo.com',
  avatar: niveaAvatar,
  industry: 'Health & Beauty',
  country: 'Germany',
  website: 'https://www.nivea.com',
  description: 'NIVEA is one of the world\'s largest skin and body care brands, owned by Beiersdorf AG. Founded in 1911 and headquartered in Hamburg, Germany, NIVEA offers a comprehensive range of moisturizers, sun protection, deodorants, and lip care products trusted by millions across 200+ countries.',
  verified: true
}

export const demoKolProfiles = [
  {
    id: '1',
    name: 'Scarlett',
    category: 'Lifestyle & Beauty',
    country: 'United States',
    platform: 'Instagram',
    url: 'https://www.instagram.com/something.scarlett/',
    followers: 95000,
    engagement: 0.62,
    rating: 4.1,
    priceFrom: 30000,
    bio: 'NYC-based lifestyle creator sharing beauty routines, campus life, and wellness content.',
    verified: true,
    avatar: scarlettAvatar
  },
  {
    id: '2',
    name: 'Krystalle',
    category: 'Beauty & Self-Care',
    country: 'United States',
    platform: 'YouTube',
    url: 'https://www.youtube.com/@krystallee',
    followers: 347000,
    engagement: 7.9,
    rating: 4.8,
    priceFrom: 40000,
    bio: 'Long-form self-care, skincare breakdowns, and realistic glow-up routines.',
    verified: true,
    avatar: krystalleAvatar
  },
  {
    id: '3',
    name: 'Sanjeev Sriram',
    category: 'Productivity & Tech',
    country: 'India',
    platform: 'YouTube',
    url: 'https://www.youtube.com/@iSanjeevSriram/videos',
    followers: 123000,
    engagement: 7.5,
    rating: 4.4,
    priceFrom: 20000,
    bio: 'Helping students and young professionals build discipline, consistency, and self-improvement.',
    verified: true,
    avatar: sanjeevAvatar
  },
  {
    id: '4',
    name: 'Prasad Tech in Telugu',
    category: 'Technology',
    country: 'India',
    platform: 'YouTube',
    url: 'https://www.youtube.com/@Prasadtechintelugu',
    followers: 5060000,
    engagement: 8.4,
    rating: 4.9,
    priceFrom: 15000,
    bio: 'In-depth smartphone reviews, comparisons, and regional tech updates.',
    verified: true,
    avatar: prasadAvatar
  }
]

export const demoCollaborations = [
  {
    id: '1',
    campaignTitle: 'Daily Moisture Routine Push',
    companyName: 'Fuaark',
    companyWebsite: 'https://fuaark.com/',
    companyAvatar: null,
    budget: 15000,
    agreedBudget: null,
    timeline: '2026-05-10',
    status: 'invited',
    platform: 'Instagram',
    deliverables: 'Reel wearing new collection + 2 story shoutouts'
  },
  {
    id: '2',
    campaignTitle: 'Soft Skin Week',
    companyName: 'DrinkPrime',
    companyWebsite: 'https://drinkprime.com/',
    companyAvatar: null,
    budget: 22000,
    agreedBudget: null,
    timeline: '2026-05-20',
    status: 'invited',
    platform: 'Instagram',
    deliverables: '3 feed posts + 4 stories'
  },
  {
    id: '3',
    campaignTitle: 'Campus Skin Reset',
    companyName: 'Studley',
    companyWebsite: 'https://www.studley.ai/',
    companyAvatar: null,
    budget: 18000,
    agreedBudget: null,
    timeline: '2026-06-01',
    status: 'invited',
    platform: 'YouTube',
    deliverables: '1 dedicated video review'
  },
  {
    id: '4',
    campaignTitle: 'UV Shield SPF50 Reveal',
    companyName: 'NIVEA',
    companyWebsite: 'https://www.nivea.com',
    companyAvatar: niveaAvatar,
    budget: 18000,
    agreedBudget: 16500,
    timeline: '2026-04-15',
    status: 'negotiating',
    platform: 'Instagram',
    deliverables: '2 feed posts and 3 story frames highlighting SPF 50 sunscreen benefits'
  },
  {
    id: '5',
    campaignTitle: 'FocusPro',
    companyName: 'RescueTime',
    companyWebsite: 'https://www.rescuetime.com/',
    companyAvatar: null,
    budget: 24000,
    agreedBudget: 24000,
    timeline: '2026-04-30',
    status: 'in-progress',
    platform: 'YouTube',
    deliverables: '1 sponsored 60-second feature demo with pinned comment and tracking link'
  },
  {
    id: '6',
    campaignTitle: 'Brightening Serum Drop',
    companyName: 'Minimalist',
    companyWebsite: 'https://beminimalist.co/',
    companyAvatar: null,
    budget: 20000,
    agreedBudget: 19000,
    timeline: '2026-05-05',
    status: 'negotiating',
    platform: 'Instagram',
    deliverables: '2 reels + 1 carousel post'
  },
  {
    id: '7',
    campaignTitle: 'Campus Life Collection',
    companyName: 'NykaaFashion',
    companyWebsite: 'https://www.nykaafashion.com/',
    companyAvatar: null,
    budget: 25000,
    agreedBudget: 25000,
    timeline: '2026-05-15',
    status: 'in-progress',
    platform: 'Instagram',
    deliverables: '3 OOTD posts + 5 stories'
  },
  {
    id: '8',
    campaignTitle: 'Productivity App Beta',
    companyName: 'FlowDesk Inc',
    companyWebsite: 'https://www.flowdesk.io',
    companyAvatar: null,
    budget: 30000,
    agreedBudget: 30000,
    timeline: '2026-05-25',
    status: 'in-progress',
    platform: 'YouTube',
    deliverables: '1 integration video + community post'
  },
  {
    id: '9',
    campaignTitle: 'Healthy Snack Integration',
    companyName: 'HealthyMaster',
    companyWebsite: 'https://healthymaster.in/',
    companyAvatar: null,
    budget: 12000,
    agreedBudget: 12000,
    timeline: '2026-03-20',
    status: 'completed',
    platform: 'YouTube',
    deliverables: 'Product placement inside a 10-minute recipe video with verbal mention'
  },
  {
    id: '10',
    campaignTitle: 'Fitness App Launch',
    companyName: 'FitLife Pro',
    companyWebsite: 'https://www.fitlifepro.in',
    companyAvatar: null,
    budget: 18000,
    agreedBudget: 18000,
    timeline: '2026-03-10',
    status: 'completed',
    platform: 'Instagram',
    deliverables: '3 posts + 2 stories'
  },
  {
    id: '11',
    campaignTitle: 'Food Delivery Promo',
    companyName: 'Eatsure',
    companyWebsite: 'https://www.eatsure.com/',
    companyAvatar: null,
    budget: 8000,
    agreedBudget: null,
    timeline: '2026-03-01',
    status: 'rejected',
    platform: 'X',
    deliverables: '2 tweets + 1 thread'
  }
]

export const demoKolChatThread1 = [
  { id: 'm1', sender: 'other', text: 'Hi Scarlett. We are NIVEA, a global skin and body care brand launching our new SPF 50 sunscreen range next month. We came across your lifestyle content and feel your audience is a strong fit for this campaign.', time: '09:02 AM' },
  { id: 'm2', sender: 'own', text: 'Hi, thanks for reaching out. I would be happy to hear more. Could you share the campaign brief, expected deliverables, and the timeline you are working with?', time: '09:18 AM' },
  { id: 'm3', sender: 'other', text: 'Of course. We are looking for 2 feed posts and 3 story frames on Instagram, focused on the SPF 50 formula and everyday sunscreen benefits. The campaign window is 3 weeks, with a deadline of April 15.', time: '09:31 AM' },
  { id: 'm4', sender: 'own', text: 'That works with my schedule. For this scope — 2 feed posts and 3 stories with product integration — my standard rate is ₹30,000. I can also include a swipe-up CTA on the stories if that helps conversion.', time: '09:44 AM' },
  { id: 'm5', sender: 'other', text: 'We appreciate the offer. Our budget for this creator slot is ₹18,000. We are open to negotiating if you can reduce the scope slightly — perhaps 1 feed post and 2 stories.', time: '10:00 AM' },
  { id: 'm6', sender: 'own', text: 'I understand. I can meet at ₹16,500 for 2 feed posts and 2 stories, with the swipe-up CTA included. That keeps your primary deliverables intact while staying closer to your budget.', time: '10:14 AM' },
  { id: 'm7', sender: 'other', text: 'That works for us. Let us proceed at ₹16,500 with the revised scope. Can you share your media kit and audience demographics before we confirm?', time: '10:28 AM' },
  { id: 'm8', sender: 'own', text: 'Confirmed. I will send the media kit and an analytics screenshot within the next few hours. Looking forward to working on this.', time: '10:35 AM' },
]

export const demoKolChatThread2 = [
  { id: 'm1', sender: 'other', text: 'Hi Scarlett. Fuaark Gear here. We are dropping a new activewear collection next month and we think your aesthetic fits the campaign well. Would you be open to a collaboration?', time: '02:05 PM' },
  { id: 'm2', sender: 'own', text: 'Hello. Thanks for reaching out. I would need to see the products before committing, but I am open to discussing. What are the expected deliverables?', time: '02:22 PM' },
  { id: 'm3', sender: 'other', text: 'We are proposing 1 reel wearing the new collection — styled naturally, not overly promotional — plus 2 story shoutouts tagging our handle. We can send the pieces to you ahead of the shoot.', time: '02:38 PM' },
  { id: 'm4', sender: 'own', text: 'That is doable. What is the timeline? I have existing commitments through mid-April so I would need clarity before confirming.', time: '02:50 PM' },
  { id: 'm5', sender: 'other', text: 'We are targeting a May 10 deadline. The pieces would ship to you by April 20, which gives you roughly 3 weeks for the shoot and edit. Does that timeline work?', time: '03:04 PM' },
  { id: 'm6', sender: 'own', text: 'May 10 works. For 1 reel and 2 story shoutouts my rate is ₹18,000. Given the gifted product is included, I have kept this below my standard rate.', time: '03:17 PM' },
  { id: 'm7', sender: 'other', text: 'We had budgeted ₹15,000 for this slot. The product gifting is valued at approximately ₹3,500. Would you consider ₹15,000 given that?', time: '03:30 PM' },
  { id: 'm8', sender: 'own', text: 'I can agree to ₹15,000 with the gifted product included, provided the brief confirms full creative control on styling. Please send the campaign agreement and I will review.', time: '03:44 PM' },
  { id: 'm9', sender: 'other', text: 'Agreed on creative control. We will send the agreement document by end of day. Thank you, Scarlett.', time: '03:52 PM' },
]

export const demoMessagesKol = [
  {
    id: 'conv-1',
    name: 'NIVEA',
    avatar: niveaAvatar,
    lastMessage: 'I will send the media kit and an analytics screenshot within the next few hours.',
    time: '10:35 AM',
    unread: 2,
    campaignTitle: 'UV Shield SPF50 Reveal',
    budget: 18000,
    agreedBudget: 16500,
    status: 'negotiating',
    deliverables: '2 feed posts and 2 story frames with swipe-up CTA',
    threadKey: 'kol-thread-1'
  },
  {
    id: 'conv-2',
    name: 'Fuaark',
    avatar: null,
    lastMessage: 'We will send the agreement document by end of day.',
    time: '03:52 PM',
    unread: 1,
    campaignTitle: 'Daily Moisture Routine Push',
    budget: 15000,
    agreedBudget: 15000,
    status: 'invited',
    deliverables: '1 reel + 2 story shoutouts (gifted product included)',
    threadKey: 'kol-thread-2'
  }
]

export const demoCompanyChatThread1 = [
  { id: 'm1', sender: 'own', text: 'Hi Scarlett. We are NIVEA, a global skincare brand, and we are launching our SPF 50 sunscreen range next month. We believe your lifestyle content aligns well with our target audience. We would like to discuss a collaboration.', time: '09:02 AM' },
  { id: 'm2', sender: 'other', text: 'Hi, thanks for reaching out. I would be happy to hear more. Could you share the campaign brief, expected deliverables, and the timeline you are working with?', time: '09:18 AM' },
  { id: 'm3', sender: 'own', text: 'We need 2 feed posts and 3 story frames on Instagram highlighting SPF 50 benefits. Campaign window is 3 weeks, deadline April 15. Budget is ₹18,000.', time: '09:31 AM' },
  { id: 'm4', sender: 'other', text: 'For 2 feed posts and 3 stories my rate is ₹30,000. I can include a swipe-up CTA on the stories as well.', time: '09:44 AM' },
  { id: 'm5', sender: 'own', text: 'Our budget for this slot is ₹18,000. We can negotiate if you adjust the scope to 1 feed post and 2 stories.', time: '10:00 AM' },
  { id: 'm6', sender: 'other', text: 'I can do ₹16,500 for 2 feed posts and 2 stories with the swipe-up CTA. That keeps your key deliverables and stays close to budget.', time: '10:14 AM' },
  { id: 'm7', sender: 'own', text: 'Agreed. ₹16,500 for the revised scope. Please share your media kit and audience demographics so we can finalise.', time: '10:28 AM' },
  { id: 'm8', sender: 'other', text: 'Confirmed. I will send the media kit and analytics within a few hours.', time: '10:35 AM' },
]

export const demoCompanyChatThread2 = [
  { id: 'm1', sender: 'own', text: 'Hi Sanjeev. We have been following your productivity content closely. We are launching FocusPro, a focus-enhancing supplement, and believe your audience of students and young professionals would respond well.', time: '11:00 AM' },
  { id: 'm2', sender: 'other', text: 'Appreciate it. Could you outline the expected deliverables and your budget range before we go further?', time: '11:15 AM' },
  { id: 'm3', sender: 'own', text: 'We are proposing 1 dedicated YouTube video integrating FocusPro into your routine, plus a community post. Budget range is ₹40,000 to ₹45,000 depending on integration depth.', time: '11:30 AM' },
  { id: 'm4', sender: 'other', text: 'For a dedicated video my rate is ₹50,000. That includes the community post and a custom landing page CTA I will set up for tracking.', time: '11:48 AM' },
  { id: 'm5', sender: 'own', text: 'We can stretch to ₹48,000 if you can also include a short Instagram reel teaser — 30 to 45 seconds — to run alongside the YouTube launch.', time: '12:02 PM' },
  { id: 'm6', sender: 'other', text: 'I can include the reel at ₹50,000 total. Below that the scope would need to be reduced. The reel adds meaningful cross-platform reach for your campaign.', time: '12:18 PM' },
  { id: 'm7', sender: 'own', text: 'Understood. Let us confirm at ₹50,000 for the full scope — dedicated video, community post, landing page CTA, and Instagram reel. Please share your content calendar availability.', time: '12:34 PM' },
  { id: 'm8', sender: 'other', text: 'Confirmed. I have availability from April 20. I will send a proposed shoot and publish schedule by tomorrow.', time: '12:45 PM' },
]

export const demoMessagesCompany = [
  {
    id: 'conv-1',
    name: 'Scarlett',
    avatar: scarlettAvatar,
    lastMessage: 'Confirmed. I will send the media kit and analytics within a few hours.',
    time: '10:35 AM',
    unread: 0,
    campaignTitle: 'UV Shield SPF50 Reveal',
    budget: 18000,
    agreedBudget: 16500,
    status: 'negotiating',
    deliverables: '2 feed posts and 2 story frames with swipe-up CTA',
    threadKey: 'company-thread-1'
  },
  {
    id: 'conv-2',
    name: 'Sanjeev Sriram',
    avatar: sanjeevAvatar,
    lastMessage: 'I will send a proposed shoot and publish schedule by tomorrow.',
    time: '12:45 PM',
    unread: 1,
    campaignTitle: 'FocusPro Launch',
    budget: 24000,
    agreedBudget: 50000,
    status: 'in-progress',
    deliverables: 'Dedicated YouTube video + community post + landing page CTA + Instagram reel teaser',
    threadKey: 'company-thread-2'
  }
]

export const demoCampaigns = [
  {
    id: '1',
    title: 'UV Shield SPF50 Reveal',
    status: 'negotiating',
    budget: 18000,
    deadline: '2026-04-15',
    platform: 'Instagram',
    appliedKols: 6,
    approvedKols: 1,
    companyAvatar: niveaAvatar,
    description: 'Promote the new SPF 50 sunscreen with 2 feed posts and 3 story frames spotlighting its lightweight, non-greasy formula and daily UV protection.'
  },
  {
    id: '2',
    title: 'Winter Skin Barrier Series',
    status: 'in-progress',
    budget: 32000,
    deadline: '2026-04-28',
    platform: 'YouTube',
    appliedKols: 5,
    approvedKols: 2,
    companyAvatar: niveaAvatar,
    description: 'A 3-part YouTube series featuring NIVEA body lotion and repair cream, each video focused on restoring the skin barrier during harsh winter months.'
  },
  {
    id: '3',
    title: 'Men\'s Grooming Kickstart',
    status: 'in-progress',
    budget: 22000,
    deadline: '2026-05-05',
    platform: 'Instagram',
    appliedKols: 9,
    approvedKols: 3,
    companyAvatar: niveaAvatar,
    description: 'Showcase NIVEA Men face wash and moisturiser through lifestyle reels targeting young male audiences aged 18–30.'
  },
  {
    id: '4',
    title: 'Lip Care Everyday Edit',
    status: 'invited',
    budget: 12000,
    deadline: '2026-05-18',
    platform: 'Instagram',
    appliedKols: 4,
    approvedKols: 0,
    companyAvatar: niveaAvatar,
    description: 'Integrate NIVEA lip butter into a daily routine reel — naturally styled, focusing on hydration and everyday carry appeal.'
  },
  {
    id: '5',
    title: 'Deodorant 48H Challenge',
    status: 'completed',
    budget: 15000,
    deadline: '2026-03-22',
    platform: 'YouTube',
    appliedKols: 7,
    approvedKols: 2,
    companyAvatar: niveaAvatar,
    description: 'Creators documented their real 48-hour experience using NIVEA deodorant across gym, work, and social settings.'
  },
  {
    id: '6',
    title: 'Radiant Skin Morning Routine',
    status: 'completed',
    budget: 20000,
    deadline: '2026-03-10',
    platform: 'Instagram',
    appliedKols: 8,
    approvedKols: 3,
    companyAvatar: niveaAvatar,
    description: 'Morning skincare routine integration featuring NIVEA micellar water and day cream — 2 reels and 4 story frames per creator.'
  },
]

export const demoWalletKol = {
  available: 87500,
  pending: 24000,
  totalEarned: 142500,
  transactions: [
    { id: 'txn-4f8a', desc: 'Payment received – UV Shield SPF50 Reveal (NIVEA)', amount: 16500, type: 'credit', date: '2026-03-18', status: 'completed' },
    { id: 'txn-2c1d', desc: 'Withdrawal to HDFC bank account ****3847', amount: 30000, type: 'debit', date: '2026-03-14', status: 'completed' },
    { id: 'txn-9b3e', desc: 'Payment received – Productivity App Beta', amount: 24000, type: 'credit', date: '2026-03-09', status: 'pending' },
    { id: 'txn-7a6c', desc: 'Payment received – Healthy Snack Integration', amount: 12000, type: 'credit', date: '2026-03-04', status: 'completed' },
    { id: 'txn-1e5f', desc: 'Payment received – Fitness App Launch', amount: 18000, type: 'credit', date: '2026-02-27', status: 'completed' },
  ]
}

export const demoWalletCompany = {
  totalAdded: 650000,
  currentBalance: 180000,
  escrow: 85000,
  transactions: [
    { id: 'txn-3d9b', desc: 'Campaign payment – UV Shield SPF50 Reveal (Scarlett)', amount: 16500, type: 'debit', date: '2026-03-18', status: 'completed' },
    { id: 'txn-8f2a', desc: 'Funds held in escrow – Lip Care Everyday Edit', amount: 12000, type: 'debit', date: '2026-03-11', status: 'in-escrow' },
    { id: 'txn-5c7e', desc: 'Campaign payment – Men\'s Grooming Kickstart (3 KOLs)', amount: 22000, type: 'debit', date: '2026-03-08', status: 'completed' },
    { id: 'txn-6a1d', desc: 'Account top-up via NEFT', amount: 200000, type: 'credit', date: '2026-03-01', status: 'completed' },
    { id: 'txn-2b4f', desc: 'Campaign payment – Deodorant 48H Challenge (2 KOLs)', amount: 15000, type: 'debit', date: '2026-02-26', status: 'completed' },
  ]
}

export const demoNotificationsKol = [
  { id: '1', title: 'You received a new collaboration invite from TechVi Labs.', time: '18m ago', read: false, route: '/kol/collaborations' },
  { id: '2', title: 'NIVEA responded to your proposal.', time: '1h ago', read: false, route: '/kol/messages' },
  { id: '3', title: 'Payment of ₹16,500 has been credited to your wallet.', time: '3h ago', read: false, route: '/kol/wallet' },
  { id: '4', title: "Escrow funded for 'Lip Care Everyday Edit'. Funds are held securely.", time: '5h ago', read: false, route: '/kol/wallet' },
  { id: '5', title: 'Your draft was approved by GreenEats Co. Payment will be released shortly.', time: '9h ago', read: true, route: '/kol/collaborations' },
  { id: '6', title: 'FocusPro Launch deadline is approaching in 3 days.', time: '1d ago', read: true, route: '/kol/collaborations' },
  { id: '7', title: 'Fuaark updated the deliverable requirements for Daily Moisture Routine Push.', time: '1d ago', read: true, route: '/kol/collaborations' },
  { id: '8', title: "GreenEats Co closed the 'Healthy Snack Integration' campaign.", time: '2d ago', read: true, route: '/kol/collaborations' },
]

export const demoNotificationsCompany = [
  { id: '1', title: 'Scarlett accepted your offer for UV Shield SPF50 Reveal.', time: '22m ago', read: false, route: '/company/campaigns' },
  { id: '2', title: 'Sanjeev Sriram submitted draft content for Winter Skin Barrier Series. Review required.', time: '1h ago', read: false, route: '/company/campaigns' },
  { id: '3', title: 'Krystalle sent a counter-offer of ₹45,000 for Men\'s Grooming Kickstart.', time: '2h ago', read: false, route: '/company/messages' },
  { id: '4', title: 'Escrow successfully created for Lip Care Everyday Edit. ₹12,000 held.', time: '4h ago', read: false, route: '/company/wallet' },
  { id: '5', title: 'Payment of ₹15,000 released to Prasad Tech in Telugu.', time: '6h ago', read: true, route: '/company/wallet' },
  { id: '6', title: 'Deodorant 48H Challenge marked as completed.', time: '10h ago', read: true, route: '/company/campaigns' },
  { id: '7', title: 'Sanjeev Sriram is requesting a timeline extension for Winter Skin Barrier Series.', time: '1d ago', read: true, route: '/company/messages' },
  { id: '8', title: '3 new KOLs applied to your UV Shield SPF50 Reveal campaign.', time: '2d ago', read: true, route: '/company/campaigns' },
]

export const homepageStats = {
  activeKols: 47,
  companies: 64,
  paidOut: 650000,
  campaignsRun: 37
}