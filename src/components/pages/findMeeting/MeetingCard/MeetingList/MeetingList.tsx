import Link from "next/link"

import MeetingCard from "@/components/pages/findMeeting/MeetingCard/MeetingCard"
import Spinner from "@/components/public/Spinner/Spinner"
import { IMeetingListProps } from "@/types/findMeeting/findMeeting"
import { isCurrentDateAfter } from "@/util/days"

const MeetingList = ({ data, isLoading }: IMeetingListProps) => {
  return (
    <>
      {isLoading && (
        <div className="h-full w-full py-80">
          <Spinner />
        </div>
      )}
      {!isLoading &&
        (data?.pages.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center py-80">
            <span className="whitespace-nowrap text-sm text-gray-500">아직 모임이 없어요,</span>
            <span className="whitespace-nowrap text-sm text-gray-500">
              지금 바로 모임을 만들어보세요
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {data?.pages.map((pages) => {
              return pages.map((meeting) => {
                return (
                  <Link className="relative" href={`/findMeeting/${meeting.id}`} key={meeting.id}>
                    {isCurrentDateAfter(meeting.registrationEnd) && (
                      <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-6 rounded-3xl bg-black/80 text-center text-sm font-medium leading-5 text-white sm:flex-row">
                        마감된 챌린지에요, <br />
                        다음 기회에 만나요 🙏
                      </div>
                    )}
                    <MeetingCard key={meeting.id} data={meeting} />
                  </Link>
                )
              })
            })}
          </div>
        ))}
    </>
  )
}

export default MeetingList
