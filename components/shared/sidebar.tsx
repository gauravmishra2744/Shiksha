'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/language-context'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  GraduationCap,
  Calendar,
  MessageSquare,
  FileText,
  BarChart3,
  Settings,
  Upload,
  Bell
} from 'lucide-react'

const navigation = [
  { key: 'dashboard', href: '/teacher/dashboard', icon: LayoutDashboard },
  { key: 'classes', href: '/teacher/classes', icon: BookOpen },
  { key: 'students', href: '/teacher/students', icon: Users },
  { key: 'assignments', href: '/teacher/assignments', icon: ClipboardList },
  { key: 'grades', href: '/teacher/grades', icon: GraduationCap },
  { key: 'attendance', href: '/teacher/attendance', icon: Calendar },
  { key: 'resources', href: '/teacher/resources', icon: Upload },
  { key: 'messages', href: '/teacher/messages', icon: MessageSquare },
  { key: 'reports', href: '/teacher/reports', icon: BarChart3 },
  { key: 'announcements', href: '/teacher/announcements', icon: Bell },
  { key: 'profile', href: '/teacher/profile', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center px-6 border-b">
        <h2 className="text-lg font-semibold">{t('portal')}</h2>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {t(item.key)}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}