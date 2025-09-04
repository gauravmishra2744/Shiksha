// Simple in-memory rate limiter for login attempts
const attempts = new Map<string, { count: number; resetTime: number }>()

const WINDOW_SIZE = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 5

export function checkRateLimit(identifier: string): { success: boolean; remaining: number } {
  const now = Date.now()
  const record = attempts.get(identifier)

  if (!record || now > record.resetTime) {
    attempts.set(identifier, { count: 1, resetTime: now + WINDOW_SIZE })
    return { success: true, remaining: MAX_ATTEMPTS - 1 }
  }

  if (record.count >= MAX_ATTEMPTS) {
    return { success: false, remaining: 0 }
  }

  record.count++
  return { success: true, remaining: MAX_ATTEMPTS - record.count }
}

export function resetRateLimit(identifier: string): void {
  attempts.delete(identifier)
}