import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ProtectedRoute from './ProtectedRoute'

import Home from '../pages/public/Home'
import About from '../pages/public/About'
import Pricing from '../pages/public/Pricing'
import ExploreKols from '../pages/public/ExploreKols'
import ExploreCampaigns from '../pages/public/ExploreCampaigns'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import KolProfileCompletion from '../pages/auth/KolProfileCompletion'
import CompanyProfileSetup from '../pages/auth/CompanyProfileSetup'

import KolLayout from '../components/layout/KolLayout'
import KolDashboard from '../pages/kol/KolDashboard'
import KolProfile from '../pages/kol/KolProfile'
import SocialAccounts from '../pages/kol/SocialAccounts'
import Collaborations from '../pages/kol/Collaborations'
import Messages from '../pages/kol/Messages'
import KolWallet from '../pages/kol/KolWallet'
import KolSettings from '../pages/kol/KolSettings'

import CompanyLayout from '../components/layout/CompanyLayout'
import CompanyDashboard from '../pages/company/CompanyDashboard'
import CompanyProfile from '../pages/company/CompanyProfile'
import CreateCampaign from '../pages/company/CreateCampaign'
import Campaigns from '../pages/company/Campaigns'
import BrowseKols from '../pages/company/BrowseKols'
import CompanyMessages from '../pages/company/CompanyMessages'
import CompanyWallet from '../pages/company/CompanyWallet'
import CompanySettings from '../pages/company/CompanySettings'
import NotFound from '../pages/public/NotFound'

export default function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/explore-kols" element={<ExploreKols />} />
      <Route path="/explore-campaigns" element={<ExploreCampaigns />} />
      <Route
        path="/login"
        element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Register />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Post-registration profile completion — protected but outside layouts */}
      <Route
        path="/kol/complete-profile"
        element={
          <ProtectedRoute role="kol"><KolProfileCompletion /></ProtectedRoute>
        }
      />
      <Route
        path="/company/setup-profile"
        element={
          <ProtectedRoute role="company"><CompanyProfileSetup /></ProtectedRoute>
        }
      />

      {/* KOL protected routes */}
      <Route
        path="/kol"
        element={<ProtectedRoute role="kol"><KolLayout /></ProtectedRoute>}
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<KolDashboard />} />
        <Route path="profile" element={<KolProfile />} />
        <Route path="social-accounts" element={<SocialAccounts />} />
        <Route path="collaborations" element={<Collaborations />} />
        <Route path="messages" element={<Messages />} />
        <Route path="wallet" element={<KolWallet />} />
        <Route path="settings" element={<KolSettings />} />
      </Route>

      {/* Company protected routes */}
      <Route
        path="/company"
        element={<ProtectedRoute role="company"><CompanyLayout /></ProtectedRoute>}
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<CompanyDashboard />} />
        <Route path="profile" element={<CompanyProfile />} />
        <Route path="create-campaign" element={<CreateCampaign />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="kols" element={<BrowseKols />} />
        <Route path="messages" element={<CompanyMessages />} />
        <Route path="wallet" element={<CompanyWallet />} />
        <Route path="settings" element={<CompanySettings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}