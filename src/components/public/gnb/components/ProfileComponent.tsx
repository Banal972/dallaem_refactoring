"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { useRef, useState } from "react"
import { useForm } from "react-hook-form"

import Profile from "@/components/public/img/Profile"
import ROUTE from "@/constants/route"
import useOutsideClick from "@/util/useOutsideClick"
import { animated, useSpring } from "@react-spring/web"

// 테일윈드 스타일
const profileStyles = "w-[40px] h-[40px]"

const profileMenuStyles = {
  container:
    "absolute right-0 top-[62px] flex h-[70px] w-[150px] flex-col rounded-lg bg-white shadow-xl md:top-[66px]",
  navItems: "flex h-1/2 w-full items-center justify-center rounded-lg text-center text-orange-600",
  hoveredNavItem: "transition-all ease-in-out transform delay-[10ms] duration-150",
}

interface IProfileComponentProps {
  profileImg: string | undefined | null
}

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(false)

  const [{ clipPath }, api] = useSpring(() => {
    return { clipPath: "circle(0% at 0% 0%)" }
  })

  const { handleSubmit, register } = useForm()

  const onSubmit = handleSubmit((data) => {
    signIn("credentials", data)
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

      {isLogin && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center">
          <div
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
            className="absolute left-0 top-0 h-full w-full cursor-pointer bg-black/40"
            aria-label="Close login"
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5">
            <h1 className="text-lg">같이달램</h1>
            <form onSubmit={onSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="이메일 테스트"
                  name={register("email").name}
                  onChange={register("email").onChange}
                  onBlur={register("email").onBlur}
                  ref={register("email").ref}
                />
                <br />
                <input
                  type="password"
                  placeholder="비밀번호 테스트"
                  name={register("password").name}
                  onChange={register("password").onChange}
                  onBlur={register("password").onBlur}
                  ref={register("password").ref}
                />
              </div>
              <button type="submit">버튼</button>
            </form>
          </div>
        </div>
      )}
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
        <Profile state="largeDefault" className={profileStyles} profileImg={profileImg} />
      </button>
      {isOpen && (
        <div className={profileMenuStyles.container}>
          <button
            type="button"
            className={`${profileMenuStyles.navItems} ${profileMenuStyles.hoveredNavItem}`}
            onClick={() => {
              setIsOpen(false)
              return router.push(ROUTE.MY_PAGE)
            }}
          >
            마이 페이지
          </button>
          <div className={`${profileMenuStyles.navItems} ${profileMenuStyles.hoveredNavItem}`}>
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

const ProfileComponent = ({ profileImg }: IProfileComponentProps) => {
  const session = useSession()
  const token = session.data?.accessToken

  return (
    <>
      {!token && session.status !== "loading" && <SignIn />}
      {token && <Login profileImg={profileImg} />}
    </>
  )
}

export default ProfileComponent
