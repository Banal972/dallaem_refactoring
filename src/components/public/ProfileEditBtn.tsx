"use client"

import ROUTE from "@/constants/route"
import useNav from "@/hooks/useNav"

import Edit from "./img/Edit"

const ProfileEditBtn = () => {
  const { goPath } = useNav()

  return (
    <button
      onClick={() => {
        return goPath(`${ROUTE.MY_PAGE}/edit`)
      }}
      type="button"
      className="size-8 rounded-full border-none bg-cover bg-no-repeat"
    >
      {" "}
      <Edit state="large" />
    </button>
  )
}

export default ProfileEditBtn
