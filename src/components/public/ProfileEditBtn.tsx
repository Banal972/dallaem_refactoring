"use client"

import Image from "next/image"

import ROUTE from "@/constants/route"
import useNav from "@/hooks/useNav"
import EditLargeIMG from "@public/img/edit_large.png"

const ProfileEditBtn = () => {
  const { goPath } = useNav()

  return (
    <button
      onClick={() => {
        return goPath(`${ROUTE.MY_PAGE}/edit`)
      }}
      type="button"
      className="z-30 size-8 rounded-full border-none bg-cover bg-no-repeat"
    >
      <Image width={32} height={32} src={EditLargeIMG.src} alt="EditLargeIMG" />
    </button>
  )
}

export default ProfileEditBtn
