"use client"

import { useSession } from "next-auth/react"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import CreateMeetingBtn from "@/components/pages/findMeeting/CreateMeetingBtn"
import FilterTab from "@/components/pages/findMeeting/FilterTab/FilterTab"
import FilterTabs from "@/components/pages/findMeeting/FilterTaps"
import MeetingList from "@/components/pages/findMeeting/MeetingCard/MeetingList/MeetingList"
import ImageHeader from "@/components/public/ImageHeader"
import ResetFilter from "@/components/public/ResetFilter"
import Spinner from "@/components/public/Spinner/Spinner"
import CreateMeetingModal from "@/components/public/modal/CreateMeetingModal"
import LIMIT from "@/constants/limit"
import useGetMeetingList from "@/hooks/useGetMeetingList"
import { useToast } from "@/provider/ToastProvider"
import { FetchFunction, IFilterOption } from "@/types/findMeeting/findMeeting"
import onFilterChanged from "@/util/onFilterChanged"

const FindMeetingPage = () => {
  const { isModalOpen, toggleModal, createMeetingHandler } = useMeeting()

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    filterOption,
    updateFilterOption,
    resetFilterOption,
  } = useGetMeetingList(initialFilterOption)

  const { ref } = useNextPage(hasNextPage, fetchNextPage)

  const hasData = data && data.pages[0].length === 0

  return (
    <>
      <div className="m-6 flex min-h-screen flex-col rounded-[20px] bg-white px-6 py-14 md:m-12 md:px-16">
        <ImageHeader sort="meeting" mainText={mainText} subText={subText} />
        <div className="relative mt-8 flex justify-between">
          <FilterTab
            selVal={filterOption.type}
            onSelect={(e) => {
              onFilterChanged(e, "type", filterOption, updateFilterOption)
            }}
          />
          <CreateMeetingBtn onClick={createMeetingHandler} />
        </div>
        <FilterTabs filterOption={filterOption} updateFilterOption={updateFilterOption} />
        {hasData && <DefaultValue />}

        <MeetingList data={data ?? null} isLoading={isLoading} />

        {isFetchingNextPage ? (
          <div className="py-7">
            <Spinner />
          </div>
        ) : (
          <div ref={ref} />
        )}
        {isModalOpen && (
          <CreateMeetingModal
            changeState={toggleModal}
            aria-haspopup="true"
            aria-pressed={isModalOpen}
          />
        )}
      </div>
      <ResetFilter
        isVisible={hasChangedOption(initialFilterOption, filterOption)}
        onClick={resetFilterOption}
      />
    </>
  )
}

export default FindMeetingPage

const mainText = "지금 모임에 참여해보세요"
const subText = "함께 할 사람이 없나요?"

const initialFilterOption: IFilterOption = {
  type: "DALLAEMFIT",
  sortBy: "registrationEnd",
  sortOrder: "desc",
  limit: LIMIT,
}

const useMeeting = () => {
  const { openToast } = useToast()
  const session = useSession()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const createMeetingHandler = () => {
    if (session.data) {
      toggleModal()
    } else {
      openToast("로그인 후 이용이 가능합니다.", "success")
    }
  }

  return { isModalOpen, toggleModal, createMeetingHandler }
}

const useNextPage = (hasNext: boolean, fetchNext: FetchFunction) => {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNext) {
      fetchNext()
    }
  }, [fetchNext, hasNext, inView])

  return { ref }
}

const getStringifiedOption = (option: IFilterOption) => {
  return Object.entries(option).toString()
}

const hasChangedOption = (initialOption: IFilterOption, changedOption: IFilterOption) => {
  const hasChangedOptions =
    getStringifiedOption(initialOption) !== getStringifiedOption(changedOption)
  return hasChangedOptions
}

const DefaultValue = () => {
  return (
    <p className="flex w-full flex-1 items-center justify-center text-sm text-gray-500">
      첫 모임을 등록해주세요! 🖐️
    </p>
  )
}
