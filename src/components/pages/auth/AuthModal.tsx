"use client"

import { useState } from "react"

import CompleteSignUpModal from "@/components/pages/auth/Modal/CompleteSignUpModal"
import LoginModal from "@/components/pages/auth/Modal/LoginModal"
import SignUpModal from "@/components/pages/auth/Modal/SignUpModal"
import { animated, useChain, useSpring, useSpringRef, useTransition } from "@react-spring/web"

interface IAuthModal {
  isLogin: boolean
  closeLoginHandler: () => void
}

const AuthModal = ({ isLogin, closeLoginHandler }: IAuthModal) => {
  const [isStep, setIsStep] = useState(0)

  const transitionsRef = useSpringRef()
  const transitions = useTransition(isLogin, {
    ref: transitionsRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    onDestroyed: () => {
      setIsStep(0)
    },
  })

  const springsRef = useSpringRef()
  const springs = useSpring({
    ref: springsRef,
    from: { y: "-35%", x: "-50%", opacity: 0 },
    to: { y: isLogin ? "-50%" : "-35%", x: "-50%", opacity: isLogin ? 1 : 0 },
  })

  useChain(isLogin ? [transitionsRef, springsRef] : [springsRef, transitionsRef], [0, 0.1])

  return transitions((style, item) => {
    return (
      item && (
        <div className="fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center text-base">
          <animated.div
            style={style}
            onClick={closeLoginHandler}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                closeLoginHandler()
              }
            }}
            className="absolute left-0 top-0 h-full w-full cursor-pointer bg-black/40 backdrop-blur-sm"
            role="button"
            tabIndex={0}
            aria-label="Close Modal"
          />
          <animated.div
            style={springs}
            className="absolute left-1/2 top-1/2 w-[80%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded bg-white px-5 py-10"
          >
            {isStep !== 2 && (
              <h1 className="text-center font-tmoneyRoundWind text-xl font-extrabold text-primary subpixel-antialiased">
                같이달램
              </h1>
            )}
            {isStep === 0 && <LoginModal setIsStep={setIsStep} />}
            {isStep === 1 && <SignUpModal setIsStep={setIsStep} />}
            {isStep === 2 && (
              <CompleteSignUpModal
                onClick={() => {
                  setIsStep(0)
                }}
              />
            )}
          </animated.div>
        </div>
      )
    )
  })
}

export default AuthModal
