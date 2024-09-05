"use server"

import { revalidatePath } from "next/cache"
import quitMeeting from "./quitMeeting"

const cancelJoining = async (id: number) => {
  const stringId = id.toString()
  await quitMeeting(stringId)
  revalidatePath("/mypage")
}

export default cancelJoining