"use client"

import { useState } from "react"

import AuthModal from "@/components/pages/auth/AuthModal"
import { animated, useSpring } from "@react-spring/web"

const NotAuthenticated = () => {
  const { isLogin, openLoginHandler, closeLoginHandler } = useLoginState()

  const [{ clipPath }, api] = useSpring(() => {
    return { clipPath: "circle(0% at 0% 0%)" }
  })

  return (
    <>
      <button
        type="button"
        className="relative flex h-8 w-[80px] items-center justify-center overflow-hidden rounded-lg bg-primary text-sm font-semibold text-white md:w-[100px]"
        onClick={openLoginHandler}
        onMouseEnter={() => {
          return api({ clipPath: "circle(150% at 0% 0%)" })
        }}
        onMouseLeave={() => {
          return api({ clipPath: "circle(0% at 0% 0%)" })
        }}
      >
        <animated.div
          style={{ clipPath }}
          className="absolute left-0 top-0 h-full w-full bg-[#ed8f60]"
        />
        <p className="relative z-10">로그인</p>
      </button>

      <AuthModal isLogin={isLogin} closeLoginHandler={closeLoginHandler} />
    </>
  )
}

export default NotAuthenticated

const useLoginState = () => {
  const [isLogin, setIsLogin] = useState(false)

  const openLoginHandler = () => {
    setIsLogin(true)
  }

  const closeLoginHandler = () => {
    setIsLogin(false)
  }

  return { isLogin, openLoginHandler, closeLoginHandler }
}
