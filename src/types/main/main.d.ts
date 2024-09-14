import { IMeetingData } from "@/types/findMeeting/findMeeting"
import { IAllReview } from "@/types/review/review"
import { InfiniteData } from "@tanstack/react-query"
import { SwiperProps } from "swiper/react"

export type TuseSwiperOptionsProps = InfiniteData<IMeetingData[], unknown> | undefined

interface IPendingState {
  isPending: boolean
}

export interface INewMeetingRenderProps extends IPendingState {
  data: TuseSwiperOptionsProps
  swiperSetting: SwiperProps | null
}

export interface IMainReviewRenderProps extends IPendingState {
  data: IAllReview[][]
}
