import { NextResponse } from "next/server";

const protectedRoutes = ["/admindashboard", "/userdashboard", "/courses"];
// https://medium.com/@turingvang/nextjs-middleware-protected-routes-bcb3df06db0c

export function middleware(request) {
    const user = request.cookies.get("user")?.value;
    const { pathname } = request.nextUrl;

    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
    if (isProtected && !user) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admindashboard", "/userdashboard", "/courses"],
};