// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

const PUBLIC_ROUTES = ["/", "/login"];

function isPublicRoute(route: string) {
  return PUBLIC_ROUTES.includes(route);
}

export default withAuth(
  async function middleware(req: NextRequest) {

    const token = await getToken({ req });

    const isAuth = !!token;
    
    const isPublic = isPublicRoute(req.nextUrl.pathname);

    if (!isAuth && !isPublic) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isAuth && isPublic) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },

  {
    callbacks: {
      // This is a workaround so the middleware function above is always called
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ['/categories/:path*', '/dashboard']
};