"use client"

import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { useRef, useState } from "react"

import LoginModal from "@/components/pages/auth/LoginModal"
import SignUpModal from "@/components/pages/auth/SignUpModal/SignUpModal"
import Profile from "@/components/public/img/Profile"
import ROUTE from "@/constants/route"
import useOutsideClick from "@/util/useOutsideClick"
import { animated, useSpring } from "@react-spring/web"

interface IProfileComponentProps {
  profileImg: string | undefined | null
}

const ProfileComponent = ({ profileImg }: IProfileComponentProps) => {
  const session = useSession()
  const token = session.data?.accessToken
  const isNotToken = !token && session.status !== "loading"

  return (
    <>
      {isNotToken && <SignIn />}
      {token && <Login profileImg={profileImg} />}
    </>
  )
}

export default ProfileComponent

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(false)

  const [{ clipPath }, api] = useSpring(() => {
    return { clipPath: "circle(0% at 0% 0%)" }
  })

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsLogin(true)
        }}
        className="relative flex h-8 w-[80px] items-center justify-center overflow-hidden rounded-lg bg-primary text-sm font-semibold text-white md:w-[100px]"
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

      <SignUpModal />
      <LoginModal isLogin={isLogin} setIsLogin={setIsLogin} />
    </>
  )
}

const Login = ({ profileImg }: { profileImg: string | undefined | null }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  useOutsideClick(dropdownRef, () => {
    return setIsOpen(false)
  })
  const handleToggle = () => {
    return setIsOpen(!isOpen)
  }

  return (
    <div ref={dropdownRef} className="mt-1 md:mt-2">
      <button type="button" onClick={handleToggle} aria-label="프로필 메뉴 열기">
        <Profile state="largeDefault" className="h-[40px] w-[40px]" profileImg={profileImg} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[62px] flex h-[70px] w-[150px] flex-col rounded-lg bg-white shadow-xl md:top-[66px]">
          <button
            type="button"
            className="flex h-1/2 w-full transform items-center justify-center rounded-lg text-center text-orange-600 transition-all delay-[10ms] duration-150 ease-in-out"
            onClick={() => {
              setIsOpen(false)
              return router.push(ROUTE.MY_PAGE)
            }}
          >
            마이 페이지
          </button>

          <div className="flex h-1/2 w-full transform items-center justify-center rounded-lg text-center text-orange-600 transition-all delay-[10ms] duration-150 ease-in-out">
            <button
              type="button"
              onClick={() => {
                signOut()
              }}
              className="h-full w-full"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
