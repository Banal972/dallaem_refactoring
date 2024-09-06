"use client"

import { useRouter } from "next/navigation"

import { useEffect } from "react"

import { useToast } from "@/provider/ToastProvider"

const CallbackPage = () => {
  const { openToast } = useToast()
  const router = useRouter()

  useEffect(() => {
    openToast("로그인 이후에 이용이 가능힙니다.", "error")
    router.push("/")
  }, [openToast, router])

  return null
}

export default CallbackPage
