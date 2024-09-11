"use client"

import { useSession } from "next-auth/react"

import Authenticated from "@/components/public/gnb/Profile/Atoms/Authenticated"
import NotAuthenticated from "@/components/public/gnb/Profile/Atoms/NotAuthenticated"

const Profile = () => {
  const session = useSession()
  const token = session.data?.accessToken
  const isNotToken = !token && session.status !== "loading"

  return (
    <>
      {isNotToken && <NotAuthenticated />}
      {token && <Authenticated token={session.data?.accessToken || ""} />}
    </>
  )
}

export default Profile
