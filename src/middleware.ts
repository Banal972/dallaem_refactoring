import { NextResponse } from "next/server"

import { auth } from "@/auth"

// eslint-disable-next-line consistent-return
export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/callback", req.url))
  }
  return NextResponse.next()
})

export const config = {
  matcher: ["/mypage", "/wishlist"],
}
