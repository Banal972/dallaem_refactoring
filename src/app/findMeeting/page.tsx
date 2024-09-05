"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import FilterCalendar from "@/components/pages/findMeeting/FilterCalendar/FilterCalendar"
import FilterSort from "@/components/pages/findMeeting/FilterSort/FilterSort"
import FilterTab from "@/components/pages/findMeeting/FilterTab/FilterTab"
import MeetingList from "@/components/pages/findMeeting/MeetingCard/MeetingList/MeetingList"
import Filter from "@/components/public/Filter/Filter"
import ResetFilter from "@/components/public/ResetFilter"
import Spinner from "@/components/public/Spinner/Spinner"
import Sort from "@/components/public/icon/dynamicIcon/Sort"
import CreateMeetingModal from "@/components/public/modal/CreateMeetingModal"
import LIMIT from "@/constants/limit"
import { location } from "@/constants/meeting"
import ROUTE from "@/constants/route"
import useGetMeetingList from "@/hooks/useGetMeetingList"
import useNav from "@/hooks/useNav"
import { FetchFunction, IFilterOption } from "@/types/findMeeting/findMeeting"
import onFilterChanged from "@/util/onFilterChanged"
import headClassIMG from "@public/img/head_class.png"

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

  const isDesc = filterOption.sortOrder === "desc"

  const hasData = data && data.pages[0].length === 0

  return (
    <>
      <div className="m-6 flex min-h-screen flex-col rounded-[20px] bg-white px-6 py-14 md:m-12 md:px-16">
        <div className="flex-none">
          <div className="flex items-center gap-4">
            <div className="size-[72px] flex-none">
              <Image width={72} height={72} src={headClassIMG.src} alt="headClassIMG" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">함께 할 사람이 없나요?</p>
              <h4 className="mt-2 text-lg font-semibold leading-8 text-gray-900 sm:text-2xl">
                지금 모임에 참여해보세요
              </h4>
            </div>
          </div>
        </div>
        <div className="relative mt-12 flex justify-between">
          <FilterTab
            selVal={filterOption.type}
            onSelect={(e) => {
              onFilterChanged(e, "type", filterOption, updateFilterOption)
            }}
          />
          <button
            type="button"
            className="absolute right-0 top-0 h-[34px] w-[85px] rounded-lg border border-primary bg-primary text-xs font-semibold leading-6 text-white transition-colors hover:bg-white hover:text-primary sm:text-sm md:h-[44px] md:w-[115px] md:rounded-xl md:text-base"
            onClick={createMeetingHandler}
          >
            모임 만들기
          </button>
        </div>

        <div className="mb-6 mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-primary pt-4">
          <div className="flex gap-2">
            <Filter
              data={location}
              placeholder="지역 선택"
              onSelect={(e) => {
                onFilterChanged(e, "location", filterOption, updateFilterOption)
              }}
              selVal={filterOption.location}
            />
            <FilterCalendar
              placeholder="날짜 선택"
              selVal={filterOption.date}
              onChange={(e) => {
                onFilterChanged(e, "date", filterOption, updateFilterOption)
              }}
            />
          </div>
          <div className="ml-auto flex gap-2">
            <button
              aria-label="sortButton"
              type="button"
              className={`group flex size-9 cursor-pointer items-center justify-center rounded-xl border-2 transition-colors ${
                isDesc ? "border-gray-100 bg-white" : "border-gray-100 bg-black"
              }`}
              onClick={() => {
                const sortOrder = isDesc ? "asc" : "desc"
                return updateFilterOption({ sortOrder })
              }}
            >
              <Sort state="default" className={`transition-colors ${isDesc || "text-white"} `} />
            </button>
            <FilterSort
              onSelect={(e) => {
                onFilterChanged(e, "sortBy", filterOption, updateFilterOption)
              }}
              selVal={filterOption.sortBy}
            />
          </div>
        </div>
        {hasData && (
          <p className="flex w-full flex-1 items-center justify-center text-sm text-gray-500">
            첫 모임을 등록해주세요! 🖐️
          </p>
        )}
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

const initialFilterOption: IFilterOption = {
  type: "DALLAEMFIT",
  sortBy: "registrationEnd",
  sortOrder: "desc",
  limit: LIMIT,
}

const useMeeting = () => {
  const session = useSession()
  const { goPath } = useNav()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const createMeetingHandler = () => {
    if (session.data) {
      toggleModal()
    } else {
      goPath(`${ROUTE.SIGNIN}&alert=로그인 후 이용이 가능합니다.`)
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
