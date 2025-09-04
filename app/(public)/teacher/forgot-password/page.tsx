import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forgot Password - Teacher Portal',
  description: 'Reset your teacher account password',
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}