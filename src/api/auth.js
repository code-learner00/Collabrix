import api from './axios'
import { DEMO_KOL_EMAIL, DEMO_COMPANY_EMAIL, DEMO_PASSWORD } from '../utils/constants'

// TODO: replace mock with real API calls when backend is ready
export async function loginAPI(email, password) {
  await new Promise(r => setTimeout(r, 600))
  if (email === DEMO_KOL_EMAIL && password === DEMO_PASSWORD) {
    return {
      token: btoa(JSON.stringify({ role: 'kol', email, name: 'Demo KOL', id: 'demo-kol-1', isDemo: true })),
      user: { role: 'kol', email, name: 'Demo KOL', id: 'demo-kol-1', isDemo: true }
    }
  }
  if (email === DEMO_COMPANY_EMAIL && password === DEMO_PASSWORD) {
    return {
      token: btoa(JSON.stringify({ role: 'company', email, name: 'Demo Company', id: 'demo-co-1', isDemo: true })),
      user: { role: 'company', email, name: 'Demo Company', id: 'demo-co-1', isDemo: true }
    }
  }
  throw new Error('Invalid email or password.')
}

export async function registerAPI(data) {
  await new Promise(r => setTimeout(r, 700))
  return {
    token: btoa(JSON.stringify({ role: data.role, email: data.email, name: data.name || data.companyName, id: `new-${Date.now()}`, isDemo: false })),
    user: { role: data.role, email: data.email, name: data.name || data.companyName, id: `new-${Date.now()}`, isDemo: false }
  }
}

export async function forgotPasswordAPI(email) {
  await new Promise(r => setTimeout(r, 500))
  if (email === DEMO_KOL_EMAIL || email === DEMO_COMPANY_EMAIL) {
    return { message: 'Password reset link sent to your email.' }
  }
  throw new Error('This email is not registered.')
}

export function decodeToken(token) {
  try {
    return JSON.parse(atob(token))
  } catch {
    return null
  }
}