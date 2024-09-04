"use server"

import { auth } from "@/auth"

const quitMeeting = async (id: string) => {
  const session = await auth()
  try {
    const data = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }

    const response = await fetch(
      `${process.env.BASE_URL}/${process.env.TEAM_ID}/gatherings/${id}/leave`,
      data,
    )

    const json = await response.json()
    return json.message
  } catch (error) {
    throw new Error(error as string)
  }
}

export default quitMeeting
