"use client"

import { signOut } from "next-auth/react"

const LogoutBtn = () => {
  return (
    <button
      type="button"
      onClick={() => {
        signOut({ callbackUrl: "/" })
      }}
      className="rounded-full bg-gray-100 px-3 py-1 text-gray-400"
    >
      로그아웃
    </button>
  )
}

export default LogoutBtn
