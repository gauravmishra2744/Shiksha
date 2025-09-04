'use client'

import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'
import { LanguageSelector } from './language-selector'
import { useLanguage } from '@/contexts/language-context'
import { LogOut, User } from 'lucide-react'

export function DashboardHeader() {
  const { data: session } = useSession()
  const { t } = useLanguage()

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">{t('portal')}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSelector />
          <ThemeToggle />
          
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {session?.user?.name ? getInitials(session.user.name) : 'T'}
              </AvatarFallback>
            </Avatar>
            
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{session?.user?.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {t('verified')} {t('teacher')}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {session?.user?.subject}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: '/teacher/login' })}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {t('logout')}
          </Button>
        </div>
      </div>
    </header>
  )
}