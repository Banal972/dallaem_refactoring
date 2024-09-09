"use client"

import { useEffect } from "react"

import useNav from "@/hooks/useNav"
import { useToast } from "@/provider/ToastProvider"

const CallbackPage = () => {
  const { openToast } = useToast()
  const { goPath } = useNav()

  useEffect(() => {
    openToast("로그인 이후에 이용이 가능힙니다.", "error")
    goPath("/")
  }, [openToast, goPath])

  return null
}

export default CallbackPage
