'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { languages } from '@/lib/i18n'
import { useLanguage } from '@/contexts/language-context'
import { Globe } from 'lucide-react'

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <select 
        value={language}
        onChange={(e) => setLanguage(e.target.value as keyof typeof languages)}
        className="bg-transparent border-none text-sm focus:outline-none"
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>{name}</option>
        ))}
      </select>
    </div>
  )
}