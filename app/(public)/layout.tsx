import { ThemeToggle } from '@/components/shared/theme-toggle'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}