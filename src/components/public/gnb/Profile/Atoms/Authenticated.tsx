import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

import { useRef, useState } from "react"

import Profile from "@/components/public/img/Profile"
import ROUTE from "@/constants/route"
import useOutsideClick from "@/util/useOutsideClick"

const Authenticated = ({ profileImg }: { profileImg: string | undefined | null }) => {
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

export default Authenticated
