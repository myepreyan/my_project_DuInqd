import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to,
      subject,
      html,
    })
    
    return { success: true, data }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}

export async function sendVerificationEmail(email: string, token: string, name: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`
  
  return sendEmail({
    to: email,
    subject: 'Հաստատեք ձեր email հասցեն',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #000;">Բարի գալուստ, ${name}!</h1>
            <p>Շնորհակալություն գրանցվելու համար։ Խնդրում ենք հաստատել ձեր email հասցեն՝ սեղմելով ներքևի կոպոկը:</p>
            <div style="margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Հաստատել Email-ը
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">Այս հղումը գործում է 24 ժամ:</p>
            <p style="color: #666; font-size: 14px;">Եթե դուք չեք գրանցվել, անտեսեք այս նամակը։</p>
          </div>
        </body>
      </html>
    `
  })
}
