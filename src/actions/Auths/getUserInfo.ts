"use server"

import { auth } from "@/auth"
import { IUserInfo } from "@/types/mypage/mypage"

const getUserInfo = async (): Promise<IUserInfo> => {
  const session = await auth()
  const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/user`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
  const userInfo = await response.json()

  return userInfo
}

export default getUserInfo
