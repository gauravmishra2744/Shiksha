import { LoginForm } from '@/components/auth/login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teacher Login - Portal',
  description: 'Sign in to your teacher account',
}

export default function LoginPage() {
  return <LoginForm />
}