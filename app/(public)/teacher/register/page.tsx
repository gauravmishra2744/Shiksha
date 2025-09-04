import { RegisterForm } from '@/components/auth/register-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teacher Registration - Portal',
  description: 'Create your teacher account',
}

export default function RegisterPage() {
  return <RegisterForm />
}