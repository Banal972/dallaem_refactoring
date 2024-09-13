import { IMeetingData } from "@/types/findMeeting/findMeeting"
import { IAllReview } from "@/types/review/review"
import { InfiniteData } from "@tanstack/react-query"
import { SwiperProps } from "swiper/react"

export type TuseSwiperOptionsProps = InfiniteData<IMeetingData[], unknown> | undefined

export interface INewMeetingRenderProps {
  isPending: boolean
  data: TuseSwiperOptionsProps
  swiperSetting: SwiperProps | null
}

export interface IMainReviewRenderProps {
  isPending: boolean
  data: IAllReview[][]
}
