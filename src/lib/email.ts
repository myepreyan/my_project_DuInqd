import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    console.log('📤 Attempting to send email to:', to)
    console.log('📧 From:', process.env.EMAIL_FROM || 'onboarding@resend.dev')
    
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to,
      subject,
      html,
    })
    
    console.log('✅ Email sent successfully!')
    console.log('📨 Response:', data)
    
    return { success: true, data }
  } catch (error: any) {
    console.error('❌ Email sending failed!')
    console.error('Error details:', error)
    console.error('Error message:', error.message)
    
    // More detailed error logging
    if (error.statusCode) {
      console.error('Status Code:', error.statusCode)
    }
    if (error.name) {
      console.error('Error Name:', error.name)
    }
    
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

export async function sendVerificationCode(email: string, code: string, name: string) {
  // Development - log to console as backup
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 Sending verification code to:', email)
    console.log('🔢 Code:', code)
  }
  
  const result = await sendEmail({
    to: email,
    subject: 'Հաստատման կոդ',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Բարի գալուստ, ${name}!</h1>
            <p style="font-size: 16px; color: #555; text-align: center; margin-bottom: 30px;">
              Շնորհակալություն գրանցվելու համար։ Օգտագործեք ներքևի կոդը՝ ձեր email հասցեն հաստատելու համար:
            </p>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; padding: 30px; text-align: center; margin: 30px 0;">
              <p style="color: white; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">
                Ձեր հաստատման կոդը
              </p>
              <div style="background-color: white; border-radius: 8px; padding: 20px; display: inline-block;">
                <span style="font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                  ${code}
                </span>
              </div>
            </div>
            
            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                ⏰ Այս կոդը գործում է միայն <strong>15 րոպե</strong>
              </p>
            </div>
            
            <p style="color: #999; font-size: 13px; text-align: center; margin-top: 30px; line-height: 1.8;">
              Եթե դուք չեք գրանցվել, անտեսեք այս նամակը։<br/>
              Մի փոխանցեք այս կոդը ուրիշներին։
            </p>
          </div>
        </body>
      </html>
    `
  })
  
  // Log result
  if (process.env.NODE_ENV === 'development') {
    if (result.success) {
      console.log('✅ Email sent successfully:', result.data)
    } else {
      console.error('❌ Email failed to send:', result.error)
    }
  }
  
  return result
}

export async function sendLoginOtp(email: string, code: string, name: string) {
  if (process.env.NODE_ENV === "development") {
    console.log("📧 Sending login OTP to:", email)
    console.log("🔢 Code:", code)
  }

  const result = await sendEmail({
    to: email,
    subject: "Մուտքի հաստատման կոդ",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Բարև, ${name}!</h1>
            <p style="font-size: 16px; color: #555; text-align: center; margin-bottom: 30px;">
              Ձեր մուտքի հաստատման կոդը՝
            </p>
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; padding: 30px; text-align: center; margin: 30px 0;">
              <p style="color: white; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">
                Կոդ
              </p>
              <div style="background-color: white; border-radius: 8px; padding: 20px; display: inline-block;">
                <span style="font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                  ${code}
                </span>
              </div>
            </div>
            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                Այս կոդը գործում է միայն <strong>15 րոպե</strong>։ Եթե դուք չեք փորձել մուտք գործել, անտեսեք այս նամակը։
              </p>
            </div>
            <p style="color: #999; font-size: 13px; text-align: center; margin-top: 30px;">
              Մի փոխանցեք այս կոդը ուրիշներին։
            </p>
          </div>
        </body>
      </html>
    `,
  })

  if (process.env.NODE_ENV === "development") {
    if (result.success) {
      console.log("✅ Login OTP email sent:", result.data)
    } else {
      console.error("❌ Login OTP email failed:", result.error)
    }
  }

  return result
}
