"use client"

import { useCallback, useEffect, useState } from "react"
import { IoAlertOutline, IoCheckmark } from "react-icons/io5"

import { animated, useTransition } from "@react-spring/web"

const DURATION = 300

const Toast = ({
  toast,
  closeToast,
}: {
  toast: { message: string; type: string }
  closeToast: () => void
}) => {
  const { transitions, message } = useToastTransition({ toast, closeToast })

  return transitions((style, item) => {
    return item ? (
      <animated.div
        style={style}
        className={`fixed right-4 top-[90px] z-50 inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-lg ${toast.type === "error" ? "bg-red-100" : "bg-green-100"}`}
      >
        <div
          className={`flex size-4 items-center justify-center rounded-full text-[10px] text-white md:size-5 ${toast.type === "error" ? "bg-red-400" : "bg-green-400"}`}
        >
          {toast.type === "error" ? <IoAlertOutline /> : <IoCheckmark />}
        </div>
        <p className="text-[10px] text-gray-700 md:text-xs">{message}</p>
      </animated.div>
    ) : null
  })
}

export default Toast

const useToastTransition = ({
  toast,
  closeToast,
}: {
  toast: { message: string; type: string }
  closeToast: () => void
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (toast.message) {
      setIsVisible(true)
      setMessage(toast.message)
    }
  }, [toast.message])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    const timer = setTimeout(() => {
      closeToast()
    }, DURATION)

    return () => {
      clearTimeout(timer)
    }
  }, [closeToast])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    if (isVisible) {
      timer = setTimeout(handleClose, 3000) // 3초 후 자동으로 닫힘
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [isVisible, handleClose])

  const transitions = useTransition(toast.message, {
    from: { opacity: 0, x: "100%" },
    enter: { opacity: 1, x: "0%" },
    leave: { opacity: 0, x: "100%" },
    config: {
      duration: DURATION,
    },
  })

  return { transitions, message }
}
