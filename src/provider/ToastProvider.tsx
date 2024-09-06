"use client"

import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react"

import Toast from "@/components/public/Toast"

interface IToastCountContext {
  openToast: (message: string, type: "error" | "success") => void
  closeToast: () => void
}

const ToastCountContext = createContext<IToastCountContext | null>(null)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState({ message: "", type: "active" })

  const openToast = useCallback((message: string, type: "error" | "success") => {
    setToast((prev) => {
      return {
        ...prev,
        message,
        type,
      }
    })
  }, [])

  const closeToast = useCallback(() => {
    setToast((prev) => {
      return { ...prev, message: "" }
    })
  }, [])

  const value = useMemo(() => {
    return { openToast, closeToast }
  }, [openToast, closeToast])

  return (
    <ToastCountContext.Provider value={value}>
      {children}
      <Toast toast={toast} closeToast={closeToast} />
    </ToastCountContext.Provider>
  )
}

export const useToast = () => {
  const { openToast, closeToast } = useContext(ToastCountContext) as IToastCountContext
  return { openToast, closeToast }
}
