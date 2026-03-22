/** Prefix for VerificationToken.identifier — avoids collision with registration tokens. */
export const LOGIN_OTP_PREFIX = "login:" as const

export const LOGIN_OTP_TTL_MS = 15 * 60 * 1000
