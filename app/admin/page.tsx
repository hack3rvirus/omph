'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Users, 
  Calendar, 
  MessageSquare, 
  Settings, 
  FileText,
  BarChart3,
  Bell,
  Cross,
  LogOut,
  Eye,
  EyeOff,
  Loader
} from 'lucide-react'
import { signInUser, signOutUser, getUserRole, onAuthStateChange, UserRole } from '@/lib/auth'
import { User } from 'firebase/auth'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loginLoading, setLoginLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setUser(user)
      if (user) {
        const role = await getUserRole(user.uid)
        setUserRole(role)
      } else {
        setUserRole(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    
    try {
      await signInUser(loginForm.email, loginForm.password)
      toast.success('Successfully logged in!')
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOutUser()
      setLoginForm({ email: '', password: '' })
      toast.success('Successfully logged out!')
    } catch (error: any) {
      toast.error(error.message || 'Logout failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 text-church-primary mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !userRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-lg shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <Cross className="w-12 h-12 text-church-primary mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-bold text-church-text">Admin Login</h1>
            <p className="text-gray-600 mt-2">Our Mother of Perpetual Help Chaplaincy</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
                placeholder="Enter your email"
                required
                disabled={loginLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  disabled={loginLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={loginLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-church-primary hover:bg-opacity-90 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              {loginLoading ? (
                <Loader className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Shield className="w-4 h-4 mr-2" />
              )}
              {loginLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Contact the Chaplain for access credentials</strong><br />
              Email: chaplain@aaua.edu.ng<br />
              Phone: +234-XXX-XXX-XXXX
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, roles: ['super_admin', 'admin', 'editor', 'moderator'] },
    { id: 'content', label: 'Content Management', icon: FileText, roles: ['super_admin', 'admin'] },
    { id: 'events', label: 'Events & News', icon: Calendar, roles: ['super_admin', 'admin', 'editor'] },
    { id: 'associations', label: 'Associations', icon: Users, roles: ['super_admin', 'admin', 'editor'] },
    { id: 'advertisements', label: 'Advertisements', icon: MessageSquare, roles: ['super_admin', 'admin', 'moderator'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['super_admin'] },
  ].filter(item => item.roles.includes(userRole.role))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Cross className="w-8 h-8 text-church-primary mr-3" />
              <div>
                <h1 className="font-serif text-xl font-bold text-church-text">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Welcome, {userRole.name} ({userRole.role.replace('_', ' ').toUpperCase()})
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-church-primary transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-church-primary text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="font-serif text-2xl font-bold text-church-text">Dashboard Overview</h2>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold text-lg mb-4">Welcome to the Admin Dashboard</h3>
                  <p className="text-gray-600 mb-4">
                    This is your central hub for managing the Our Mother of Perpetual Help Chaplaincy website. 
                    Use the navigation menu to access different sections based on your role permissions.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-church-primary bg-opacity-10 p-4 rounded-lg">
                      <h4 className="font-semibold text-church-text mb-2">Your Role</h4>
                      <p className="text-sm text-gray-600">
                        {userRole.role.replace('_', ' ').toUpperCase()} - 
                        {userRole.association && ` ${userRole.association}`}
                      </p>
                    </div>
                    
                    <div className="bg-church-secondary bg-opacity-10 p-4 rounded-lg">
                      <h4 className="font-semibold text-church-text mb-2">Last Login</h4>
                      <p className="text-sm text-gray-600">
                        {userRole.lastLogin.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab !== 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm p-8 text-center"
              >
                <h3 className="font-serif text-xl font-bold text-church-text mb-4">
                  {menuItems.find(item => item.id === activeTab)?.label}
                </h3>
                <p className="text-gray-600 mb-6">
                  This section is currently under development. Full functionality will be available soon.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Contact the development team for specific feature requests or urgent needs.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}