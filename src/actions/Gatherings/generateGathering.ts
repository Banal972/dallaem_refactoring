"use server"

import { auth } from "@/auth"
import { ICustomResponse, IMeetingDataState } from "@/types/findMeeting/findMeeting"

const generateGathering = async (formData: FormData): Promise<IMeetingDataState> => {
  const session = await auth()
  try {
    const data: RequestInit = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : "",
      },
    }

    const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/gatherings`, data)

    if (!response.ok) {
      const json: ICustomResponse = await response.json()
      throw new Error(json.message)
    }

    const responseData: IMeetingDataState = await response.json()
    return responseData
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("An unknown error occurred")
  }
}

export default generateGathering
