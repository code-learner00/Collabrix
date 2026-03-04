import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { MessagesProvider } from './context/MessagesContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <MessagesProvider>
            <AppRoutes />
          </MessagesProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}