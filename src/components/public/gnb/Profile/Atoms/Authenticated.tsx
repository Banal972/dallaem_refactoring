"use client"

import { signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { useRef, useState } from "react"

import ROUTE from "@/constants/route"
import useGetUserData from "@/hooks/useGetUserData"
import useOutsideClick from "@/util/useOutsideClick"
import ProfileLargeEditIMG from "@public/img/profile_large_edit.png"

const Authenticated = ({ token }: { token: string }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useOutsideClick(dropdownRef, () => {
    return setIsOpen(false)
  })

  const handleToggle = () => {
    return setIsOpen(!isOpen)
  }

  const { data } = useGetUserData(token)

  return (
    <div ref={dropdownRef} className="mt-1 md:mt-2">
      <button type="button" onClick={handleToggle} aria-label="프로필 메뉴 열기">
        <Image
          src={data?.image || ProfileLargeEditIMG}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
          alt="유저 이미지"
        />
      </button>

      {isOpen && (
        <div className="absolute right-5 top-[62px] flex h-[70px] w-[150px] flex-col rounded-lg bg-white shadow-xl md:top-[66px]">
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

export default Authenticated
