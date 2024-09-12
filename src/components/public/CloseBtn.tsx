"use client"

import { useRouter } from "next/navigation"

import XSVG from "@public/icon/staticIcon/X.svg"

const CloseBtn = () => {
  const route = useRouter()

  const handleClick = () => {
    route.back()
  }
  return (
    <button type="button" onClick={handleClick} className="block" aria-label="Close">
      <XSVG className="h-6 w-6 text-[#111827]" />
    </button>
  )
}

export default CloseBtn
