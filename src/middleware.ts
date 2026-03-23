import { withAuth } from "next-auth/middleware"

export default withAuth({
  // Սա ավտոմատ կստուգի թոքենը
  pages: {
    signIn: "/login",
  },
})

export const config = {
  // Պաշտպանեք միայն պրոֆիլը և ադմինը
  matcher: ["/profile/:path*", "/admin/:path*"]
}