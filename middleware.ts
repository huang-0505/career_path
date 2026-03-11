import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Redirects /auth/signin to the canonical NEXTAUTH_URL when accessed from a different
 * deployment URL. This ensures OAuth cookies (state, pkce) are set on the same domain
 * that receives the callback, fixing InvalidCheck errors on Vercel.
 */
export function middleware(request: NextRequest) {
  const authUrl = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL
  if (!authUrl) return NextResponse.next()

  const canonicalHost = new URL(authUrl).host
  const requestHost = request.headers.get("host") ?? ""

  // Only redirect auth-related paths when on a different host
  const path = request.nextUrl.pathname
  const isAuthPath = path.startsWith("/auth/signin") || path === "/auth/signin"

  if (isAuthPath && requestHost !== canonicalHost) {
    const canonicalUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, authUrl)
    return NextResponse.redirect(canonicalUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/auth/signin",
}
