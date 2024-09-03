"use client"

import { signIn } from "next-auth/react"

import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"

import { animated, useChain, useSpring, useSpringRef, useTransition } from "@react-spring/web"

const LoginModal = ({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean
  setIsLogin: Dispatch<SetStateAction<boolean>>
}) => {
  const { handleSubmit, register } = useForm()

  const onSubmit = handleSubmit((data) => {
    signIn("credentials", data)
  })

  const transitionsRef = useSpringRef()
  const transitions = useTransition(isLogin, {
    ref: transitionsRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
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
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center text-base">
          <animated.div
            style={style}
            onClick={() => {
              setIsLogin(false)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsLogin(false)
              }
            }}
            role="button"
            tabIndex={0}
            className="absolute left-0 top-0 h-full w-full cursor-pointer bg-black/40 backdrop-blur-sm"
            aria-label="Close login"
          />
          <animated.div
            style={springs}
            className="absolute left-1/2 top-1/2 w-[80%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded bg-white px-5 py-10"
          >
            <h1 className="text-center font-tmoneyRoundWind text-xl font-extrabold text-primary subpixel-antialiased">
              같이달램
            </h1>
            <form onSubmit={onSubmit}>
              <div className="mt-7 flex flex-col gap-3 text-sm">
                <input
                  className="h-10 w-full rounded-lg bg-gray-200 px-4 outline-none"
                  type="text"
                  placeholder="이메일을 입력해주세요"
                  name={register("email").name}
                  onChange={register("email").onChange}
                  onBlur={register("email").onBlur}
                  ref={register("email").ref}
                />
                <input
                  className="h-10 w-full rounded-lg bg-gray-200 px-4 outline-none"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  name={register("password").name}
                  onChange={register("password").onChange}
                  onBlur={register("password").onBlur}
                  ref={register("password").ref}
                />
              </div>
              <button
                type="submit"
                className="mt-5 w-full rounded-lg bg-primary py-2 text-sm text-white"
              >
                로그인
              </button>
            </form>
            <div className="mt-5 flex justify-center gap-2 text-center text-sm">
              <p className="text-gray-500">같이달램이 처음 이신가요?</p>
              <button type="button" className="text-primary">
                회원가입
              </button>
            </div>
          </animated.div>
        </div>
      )
    )
  })
}

export default LoginModal
