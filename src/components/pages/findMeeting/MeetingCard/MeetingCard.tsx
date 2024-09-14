import { useSession } from "next-auth/react"
import Image from "next/image"

import { MouseEvent } from "react"

import joinGathering from "@/actions/Gatherings/joinGathering"
import DateTag from "@/components/pages/findMeeting/MeetingCard/Atoms/DateTag"
import ParticipantGage from "@/components/pages/findMeeting/MeetingCard/Atoms/ParticipantGage"
import WishBtn from "@/components/pages/wishlist/WishBtn"
import { useToast } from "@/provider/ToastProvider"
import { IMeetingData } from "@/types/findMeeting/findMeeting"
import { msTransform } from "@/util/days"
import ArrowRightSVG from "@public/icon/staticIcon/arrow_right.svg"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"

const MeetingCard = ({ data }: { data: IMeetingData }) => {
  const { joinNowHandler } = useJoin(data)

  return (
    <div className="flex w-full overflow-hidden rounded-3xl border-2 border-gray-100 bg-white max-sm:flex-col">
      {data.image && (
        <div className="relative h-[156px] w-[280px]">
          <Image
            src={data.image}
            alt={`${data.name} 이미지`}
            fill
            className="object-cover"
            sizes="(min-width : 640px) 280px"
            priority
          />
          {msTransform(data.registrationEnd) > dayjs().unix() && (
            <div className="absolute right-0 top-0 inline-flex items-center rounded-bl-xl bg-primary px-[10px] py-[4px]">
              <Image src="/icon/staticIcon/clock.svg" alt="마감 임박" width={24} height={24} />
              <span className="text-xs text-white">
                <DayRender registrationEnd={data.registrationEnd} />
              </span>
            </div>
          )}
        </div>
      )}
      <div className="flex grow flex-col justify-between px-6 py-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="text-lg font-semibold">{data.name}</div>
              <div className="h-3 w-[2px] bg-gray-900" />
              <div className="text-sm font-medium text-gray-700">{data.location}</div>
            </div>
            <DateTag date={data.dateTime} />
          </div>
          <WishBtn list={data} />
        </div>

        <div className="mt-7 flex items-end gap-6 md:mt-0">
          <div className="flex-1">
            <div className="flex items-center">
              <Image
                src="/icon/staticIcon/person.svg"
                alt="참가인원"
                width={16}
                height={16}
                className="mr-[2px]"
              />
              <span className="text-sm">{`${data.participantCount}/${data.capacity}`}</span>
              {Number(data.participantCount) >= 5 && (
                <>
                  <Image
                    src="/icon/staticIcon/confirmed.svg"
                    alt="개설확정"
                    width={24}
                    height={24}
                    className="ml-[11px] mr-[6px]"
                  />
                  <div className="text-sm text-primary">개설확정</div>
                </>
              )}
            </div>
            <div className="mt-2">
              <ParticipantGage now={data.participantCount} max={data.capacity} />
            </div>
          </div>
          <button type="button" onClick={joinNowHandler} className="flex items-center gap-2">
            <span className="whitespace-nowrap font-semibold text-primary">join now</span>
            <ArrowRightSVG width={18} height={18} className="text-primary" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MeetingCard

const DayRender = ({ registrationEnd }: { registrationEnd: string }) => {
  if (dayjs(registrationEnd).diff(dayjs(), "day") === 7) {
    return <>다음주 마감</>
  }

  if (dayjs(registrationEnd).diff(dayjs(), "day") > 0) {
    return <>{dayjs(registrationEnd).diff(dayjs(), "day")}일 후 마감</>
  }

  if (dayjs(registrationEnd).diff(dayjs(), "hour") <= 24) {
    return <>오늘 {dayjs(registrationEnd).diff(dayjs(), "hour")}시 마감</>
  }

  return null
}

const useJoin = (data: IMeetingData) => {
  const { openToast } = useToast()
  const session = useSession()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => {
      return joinGathering(String(data.id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetingList"] })
    },
  })

  const joinNowHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (session.data) {
      const res = await mutation.mutateAsync()
      openToast(res, "success")
    } else {
      openToast("로그인이 필요합니다.", "error")
    }
  }

  return { joinNowHandler }
}
