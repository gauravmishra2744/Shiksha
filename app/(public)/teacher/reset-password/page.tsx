import { ResetPasswordForm } from '@/components/auth/reset-password-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reset Password - Teacher Portal',
  description: 'Set your new password',
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}