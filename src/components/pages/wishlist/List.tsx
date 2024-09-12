"use client"

import Link from "next/link"

import { useState } from "react"

import FilterCalendar from "@/components/pages/findMeeting/FilterCalendar/FilterCalendar"
import FilterSort from "@/components/pages/findMeeting/FilterSort/FilterSort"
import FilterTab from "@/components/pages/findMeeting/FilterTab/FilterTab"
import { MeetingCard } from "@/components/pages/findMeeting/MeetingCard/MeetingList/MeetingList"
import ByeBtn from "@/components/pages/wishlist/ByeBtn"
import Filter from "@/components/public/Filter/Filter"
import ResetFilter from "@/components/public/ResetFilter"
import MeetingCardSkeleton from "@/components/public/Skeleton/MeetingCardSkeleton"
import Spinner from "@/components/public/Spinner/Spinner"
import { location } from "@/constants/meeting"
import ROUTE from "@/constants/route"
import useWishList from "@/hooks/useWishList"
import { IFilterOption } from "@/types/findMeeting/findMeeting"
import { isCurrentDateAfter } from "@/util/days"
import onFilterChanged from "@/util/onFilterChanged"
import SortSVG from "@public/icon/dynamicIcon/sort.svg"

const List = () => {
  const filterOptions: IFilterOption = {
    type: "DALLAEMFIT",
    sortBy: "registrationEnd",
    sortOrder: "desc",
  }

  const { filter, onSortOrderHandler, updateFilterOption, resetFilterHandler } =
    useFilter(filterOptions)

  const { wish, setWish, ref, isPending, hasMore } = useWishList(filter)

  const removeWishHandler = (id: number) => {
    setWish(
      wish.filter((item) => {
        return item.id !== id
      }),
    )
  }

  const HasMoreData = hasMore && !isPending

  return (
    <>
      <div className="mt-8 flex flex-1 flex-col">
        <div className="flex justify-between">
          <FilterTab
            selVal={filter.type}
            onSelect={(e) => {
              onFilterChanged(e, "type", filter, updateFilterOption)
            }}
          />
        </div>

        <div className="relative z-30 mt-6 flex justify-between border-t border-primary pt-6 sm:mt-4 sm:pt-4">
          <div className="flex gap-2">
            <Filter
              data={location}
              placeholder="지역 선택"
              onSelect={(e) => {
                onFilterChanged(e, "location", filter, updateFilterOption)
              }}
              selVal={filter.location}
            />
            <FilterCalendar
              placeholder="날짜 선택"
              selVal={filter.date}
              onChange={(e) => {
                onFilterChanged(e, "date", filter, updateFilterOption)
              }}
            />
          </div>

          <div className="ml-auto flex gap-2">
            <button
              aria-label="sortButton"
              type="button"
              className={`group flex size-9 cursor-pointer items-center justify-center rounded-xl border-2 transition-colors ${filter.sortOrder === "desc" ? "border-gray-100 bg-white" : "border-gray-100 bg-black"}`}
              onClick={onSortOrderHandler}
            >
              <SortSVG
                state="default"
                className={`transition-colors ${filter.sortOrder === "asc" && "text-white"} `}
              />
            </button>
            <FilterSort
              onSelect={(e) => {
                onFilterChanged(e, "sortBy", filter, updateFilterOption)
              }}
              selVal={filter.sortBy}
            />
          </div>
        </div>

        {isPending && (
          <div className="mt-6 flex-1">
            {new Array(10).fill(0).map((_, index) => {
              return <MeetingCardSkeleton key={`${index + 1}`} />
            })}
          </div>
        )}

        {!isPending && (
          <div className={`mt-6 flex-1 ${wish.length === 0 && "flex items-center justify-center"}`}>
            {wish.length === 0 && (
              <p className="text-sm font-medium leading-5 text-gray-500">아직 찜한 모임이 없어요</p>
            )}

            {wish.map((list) => {
              return (
                <div key={list.id} className="relative mt-6 first:mt-0">
                  {isCurrentDateAfter(list.registrationEnd) && (
                    <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-6 rounded-3xl bg-black/80 text-center text-sm font-medium leading-5 text-white sm:flex-row">
                      마감된 챌린지에요, <br />
                      다음 기회에 만나요 🙏
                      <ByeBtn list={list} removeHandler={removeWishHandler} />
                    </div>
                  )}
                  <Link href={`${ROUTE.GATHERINGS}/${list.id}`}>
                    <MeetingCard data={list} />
                  </Link>
                </div>
              )
            })}
          </div>
        )}

        {HasMoreData && (
          <div ref={ref} className="w-full">
            <Spinner />
          </div>
        )}
      </div>

      <ResetFilter
        isVisible={Object.entries(filterOptions).toString() !== Object.entries(filter).toString()}
        onClick={resetFilterHandler}
      />
    </>
  )
}

export default List

const useFilter = (filterOptions: IFilterOption) => {
  const [filter, setFilter] = useState(filterOptions)

  const updateFilterOption = (newOption: Partial<IFilterOption>) => {
    setFilter((prevOption) => {
      return { ...prevOption, ...newOption }
    })
  }

  const onSortOrderHandler = () => {
    if (filter.sortOrder === "desc") {
      return setFilter((prev) => {
        return {
          ...prev,
          sortOrder: "asc",
        }
      })
    }
    return setFilter((prev) => {
      return {
        ...prev,
        sortOrder: "desc",
      }
    })
  }

  const resetFilterHandler = () => {
    setFilter({
      type: "DALLAEMFIT",
      sortBy: "registrationEnd",
      sortOrder: "desc",
    })
  }

  return { filter, onSortOrderHandler, updateFilterOption, resetFilterHandler }
}
