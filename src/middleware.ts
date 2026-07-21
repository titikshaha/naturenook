import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiter for Edge Runtime
// Note: In a serverless environment like Vercel, this map is isolated per-instance.
// For robust global rate limiting, consider using Upstash Redis (@upstash/ratelimit) later.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT = 10; // max requests
const WINDOW_MS = 60 * 1000; // 1 minute

export function middleware(request: NextRequest) {
  // Only apply rate limiting to auth routes to prevent brute force
  if (request.nextUrl.pathname.startsWith("/api/auth/register") || 
      request.nextUrl.pathname.startsWith("/api/auth/callback/credentials")) {
      
    // Get IP address from headers (Vercel standard)
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    
    if (ip !== "unknown") {
      const now = Date.now();
      const record = rateLimitMap.get(ip);
      
      if (!record || now - record.lastReset > WINDOW_MS) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
      } else {
        if (record.count >= RATE_LIMIT) {
          return new NextResponse(
            JSON.stringify({ error: "Too many requests. Please try again later." }),
            { status: 429, headers: { "Content-Type": "application/json" } }
          );
        }
        record.count++;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/auth/register",
    "/api/auth/callback/credentials",
  ],
};
