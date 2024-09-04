import { auth } from "@/auth"

import ROUTE from "./constants/route"

// eslint-disable-next-line consistent-return
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname === "/mypage") {
    const newUrl = new URL(ROUTE.HOME, req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  if (!req.auth && req.nextUrl.pathname === "/wishlist") {
    const newUrl = new URL(ROUTE.HOME, req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
