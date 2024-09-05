"use client"

import Link from "next/link"

import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react"

import Profile from "@/components/public/gnb/Profile/Profile"
import SideBarBtn from "@/components/public/gnb/SideBar/Atoms/SideBarBtn"
import ROUTE from "@/constants/route"
import useOutsideClick from "@/util/useOutsideClick"

import SideBar from "./SideBar/SideBar"

const GNB = ({ children }: { children: ReactNode }) => {
  const { isOpen, setIsOpen, menuRef, menuIconHandler } = useMenu()
  const { is2XlScreen } = useScreen(setIsOpen)

  return (
    <>
      <div className="fixed left-0 top-0 z-50 w-full bg-white">
        <div className="relative flex h-[55px] w-full items-center justify-between border-b border-gray-300 px-5 text-sm md:h-[59px] md:px-[30px] md:text-lg">
          {!is2XlScreen && (
            <div className="mr-4">
              <SideBarBtn onClick={menuIconHandler} isOpen={isOpen} />
            </div>
          )}
          <Link
            href={ROUTE.HOME}
            className="mr-auto font-tmoneyRoundWind text-lg font-extrabold text-primary subpixel-antialiased"
          >
            같이달램
          </Link>
          <Profile />
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

const useScreen = (setIsOpen: Dispatch<SetStateAction<boolean>>) => {
  const [is2XlScreen, setIs2XlScreen] = useState(false)
  useEffect(() => {
    const checkScreenSize = () => {
      const newIs2XlScreen = window.innerWidth >= 1024
      setIs2XlScreen(newIs2XlScreen)
      if (!newIs2XlScreen) {
        setIsOpen(false)
      }
    }

    checkScreenSize()

    let timeoutId: number
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(checkScreenSize, 100)
    }

    window.addEventListener("resize", debouncedResize)

    return () => {
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [setIsOpen])

  return {
    is2XlScreen,
  }
}

const useMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const menuRef = useRef(null)

  useOutsideClick(menuRef, () => {
    setIsOpen(false)
  })

  const menuIconHandler = () => {
    setIsOpen((prev) => {
      return !prev
    })
  }

  return { isOpen, setIsOpen, menuRef, menuIconHandler }
}
