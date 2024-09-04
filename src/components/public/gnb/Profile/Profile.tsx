"use client"

import { useSession } from "next-auth/react"

import Authenticated from "@/components/public/gnb/Profile/Atoms/Authenticated"
import NotAuthenticated from "@/components/public/gnb/Profile/Atoms/NotAuthenticated"

interface IProfileComponentProps {
  profileImg: string | undefined | null
}

const Profile = ({ profileImg }: IProfileComponentProps) => {
  const session = useSession()
  const token = session.data?.accessToken
  const isNotToken = !token && session.status !== "loading"

  return (
    <>
      {isNotToken && <NotAuthenticated />}
      {token && <Authenticated profileImg={profileImg} />}
    </>
  )
}

export default Profile
