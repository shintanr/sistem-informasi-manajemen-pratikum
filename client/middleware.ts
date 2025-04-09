import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  id_user: string;
  email: string;
  role: "admin" | "praktikan" | "asisten";
  exp: number;
};

const protectedRoutes = {
  admin: ["/admin/dashboard"],
  praktikan: [
    "/praktikan/dashboard",
    "/praktikan/jadwal",
    "/praktikan/submission",
    "/praktikan/penilaian",
    "/praktikan/presensi",
  ],
  asisten: [
    "/asisten/dashboard",
    "/asisten/submission",
    "/asisten/penilaian",
    "/asisten/presensi",
  ]
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (!token) {
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/praktikan") ||
      pathname.startsWith("/asisten")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const role = decoded.role;

    const allowedRoutes = protectedRoutes[role];
    const isAllowed = allowedRoutes?.some((route) => pathname.startsWith(route));

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Token error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/praktikan/:path*", "/asisten/:path*"]
};
