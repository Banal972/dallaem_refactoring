"use server"

import { auth } from "@/auth"

const joinGathering = async (id: string) => {
  const session = await auth()
  try {
    const data = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }

    const response = await fetch(
      `${process.env.BASE_URL}/${process.env.TEAM_ID}/gatherings/${id}/join`,
      data,
    )

    const json = await response.json()

    return json.message
  } catch (error) {
    throw new Error(error as string)
  }
}

export default joinGathering
