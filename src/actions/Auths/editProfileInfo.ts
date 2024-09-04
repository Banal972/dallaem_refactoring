"use server"

import { revalidatePath } from "next/cache"

import { auth } from "@/auth"
import ROUTE from "@/constants/route"

const editProfileInfo = async (formData: FormData) => {
  const session = await auth()
  const img = formData.get("image")

  if (img instanceof File && img.size === 0) {
    formData.set("image", "")
  }

  await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/user`, {
    method: "PUT",
    body: formData,
    headers: {
      "content-header": "multipart/form-data",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })

  revalidatePath(ROUTE.MY_PAGE)
}

export default editProfileInfo
