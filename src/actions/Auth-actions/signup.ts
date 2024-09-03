"use server"

import { ICustomError } from "@/types/mypage/mypage"

interface ISingup {
  name: string
  email: string
  companyName: string
  password: string
}

const signup = async (formData: ISingup) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    if (!response.ok) {
      const { message } = await response.json()
      throw new Error(message)
    }
    return await response.json()
  } catch (e) {
    const error = e as ICustomError
    throw new Error(error.message)
  }
}

export default signup
