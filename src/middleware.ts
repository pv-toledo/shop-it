import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Se não tem token e está tentando acessar área protegida
    if (!token && pathname.startsWith('/dashboard')) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', req.url)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Para rotas do dashboard, exige autenticação
        if (pathname.startsWith('/dashboard')) {
          return !!token
        }
        
        // Para outras rotas, permite acesso
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    // Protege todas as rotas do dashboard
    '/dashboard/:path*',
    // Adicione outras rotas protegidas aqui se necessário
    // '/admin/:path*',
    // '/profile/:path*'
  ]
}