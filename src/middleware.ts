import { NextAuthRequest } from "next-auth/lib"

import { auth } from "@/auth"

import ROUTE from "./constants/route"

const isAuth = (req: NextAuthRequest, url: string) => {
  return !req.auth && req.nextUrl.pathname === url
}

// eslint-disable-next-line consistent-return
export default auth((req) => {
  if (isAuth(req, "/mypage") || isAuth(req, "/wishlist")) {
    const newUrl = new URL(ROUTE.HOME, req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
