'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from './Sidebar'
import { FloatingNotifications } from './FloatingNotifications'
import { createClient } from '@/lib/supabase/client'

interface AppLayoutProps {
  children: React.ReactNode
  userEmail?: string
  title?: string
  subtitle?: string
}

export function AppLayout({ children, userEmail, title, subtitle }: AppLayoutProps) {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
      }
    }
    fetchUser()
  }, [])

  // Check for stale jobs every 15 minutes
  useEffect(() => {
    const checkStaleJobs = async () => {
      try {
        await fetch('/api/cron/check-stale-jobs')
      } catch (error) {
        console.error('Error checking stale jobs:', error)
      }
    }

    // Run immediately on mount
    checkStaleJobs()

    // Then run every 15 minutes
    const interval = setInterval(checkStaleJobs, 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userEmail={userEmail} />

      {/* Top header bar */}
      <header className="fixed top-0 right-0 left-0 md:left-80 h-24 bg-white border-b border-gray-200 z-40">
        <div className="h-full px-8 flex items-center justify-between">
          {title && (
            <div className="py-2">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{title}</h1>
              {subtitle && <p className="text-sm text-gray-600 mt-1.5">{subtitle}</p>}
            </div>
          )}
          <div className={`relative ${!title ? 'ml-auto' : ''}`}>
            {userId && <FloatingNotifications userId={userId} />}
          </div>
        </div>
      </header>

      <main className="md:pl-81 min-h-screen pt-10">
        <div className="pl-16 pr-5 pt-5 pb-5">{children}</div>
      </main>
    </div>
  )
}
