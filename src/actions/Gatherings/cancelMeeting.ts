"use server"

import { auth } from "@/auth"

const cancelMeeting = async (id: string) => {
  const session = await auth()
  try {
    const data = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }

    const response = await fetch(
      `${process.env.BASE_URL}/${process.env.TEAM_ID}/gatherings/${id}/cancel`,
      data,
    )

    const json = await response.json()
    return json.message
  } catch (error) {
    throw new Error(error as string)
  }
}

export default cancelMeeting
