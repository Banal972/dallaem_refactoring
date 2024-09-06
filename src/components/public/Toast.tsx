"use client"

import { useState } from "react"
import { IoAlertOutline, IoCheckmark } from "react-icons/io5"

import { animated, useTransition } from "@react-spring/web"

const Toast = ({
  toast,
  closeToast,
}: {
  toast: { message: string; type: string }
  closeToast: () => void
}) => {
  const { transitions, message } = useToastTransition({ closeToast, toastMsg: toast.message })

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
  closeToast,
  toastMsg,
}: {
  closeToast: () => void
  toastMsg: string
}) => {
  const [message, setMessage] = useState("")

  const transitions = useTransition(toastMsg, {
    from: { opacity: 0, x: "100%" },
    enter: { opacity: 1, x: "0%" },
    leave: { opacity: 0, x: "100%" },
    config: {
      duration: 300,
      tension: 120,
      friction: 44,
    },
    delay: toastMsg ? 100 : 3000,
    onStart: () => {
      if (toastMsg) {
        setMessage(toastMsg)
      }
    },
    onRest: () => {
      closeToast()
    },
  })

  return { transitions, message }
}
