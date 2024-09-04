"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"

import { ReactNode } from "react"

import Profile from "@/components/public/gnb/Profile/Profile"
import SideBarBtn from "@/components/public/gnb/SideBar/Atoms/SideBarBtn"
import ROUTE from "@/constants/route"
import useGNBLogic from "@/util/useGNBLogic"

import SideBar from "./SideBar/SideBar"

const GNB = ({ children }: { children: ReactNode }) => {
  const session = useSession()

  const { isOpen, is2XlScreen, profileImg, menuRef, menuIconClick } = useGNBLogic(
    session.data?.accessToken,
  )

  return (
    <>
      <div className="fixed left-0 top-0 z-50 w-full bg-white">
        <div className="relative flex h-[55px] w-full items-center justify-between border-b border-gray-300 px-5 text-sm md:h-[59px] md:px-[30px] md:text-lg">
          {!is2XlScreen && (
            <div className="mr-4">
              <SideBarBtn onClick={menuIconClick} isOpen={isOpen} />
            </div>
          )}
          <Link
            href={ROUTE.HOME}
            className="mr-auto font-tmoneyRoundWind text-lg font-extrabold text-primary subpixel-antialiased"
          >
            같이달램
          </Link>
          <Profile profileImg={profileImg} />
        </div>

        <SideBar menuRef={menuRef} isOpen={isOpen || is2XlScreen} />
      </div>

      <div
        className={`pt-[56px] transition-all duration-300 ease-in-out md:pt-[59px] ${is2XlScreen && "lg:ml-[220px]"}`}
      >
        {children}
      </div>
    </>
  )
}

export default GNB
