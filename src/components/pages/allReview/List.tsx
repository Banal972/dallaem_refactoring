"use client"

import Link from "next/link"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import FilterSort from "@/components/pages/allReview/FilterSort"
import FilterCalendar from "@/components/pages/findMeeting/FilterCalendar/FilterCalendar"
import Filter from "@/components/public/Filter/Filter"
import ResetFilter from "@/components/public/ResetFilter"
import Review from "@/components/public/Review/Review"
import ReviewSkeleton from "@/components/public/Skeleton/ReviewSkeleton"
import Spinner from "@/components/public/Spinner/Spinner"
import LIMIT from "@/constants/limit"
import { location } from "@/constants/meeting"
import ROUTE from "@/constants/route"
import { useAllReview } from "@/hooks/Review/useAllReview"
import { IAllReview, TReviewFilterOptions } from "@/types/review/review"
import onFilterChanged from "@/util/onFilterChanged"

interface ReviewRednerProps {
  data: IAllReview[][]
  isPending: boolean
}

const List = () => {
  const filterOptions: TReviewFilterOptions = {
    sortOrder: "desc",
  }

  const { filter, updateFilterOption, resetFilterHandler } = useFilter(filterOptions)

  const { ref, inView } = useInView({ threshold: 1 })

  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } = useAllReview(filter)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  return (
    <>
      <div className="flex justify-between">
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

        <FilterSort
          onSelect={(e) => {
            onFilterChanged(e, "sortOrder", filter, updateFilterOption)
          }}
          selVal={filter.sortOrder}
        />
      </div>

      <div
        className={`mt-6 flex flex-1 flex-col gap-6 text-sm font-medium leading-5 text-gray-500 ${!isPending && data.length === 0 && "items-center justify-center"}`}
      >
        <ReviewRedner data={data} isPending={isPending} />
      </div>

      {hasNextPage && isFetchingNextPage && (
        <div className="flex w-full items-center justify-center py-7">
          <Spinner />
        </div>
      )}

      <div ref={ref} className="h-1 w-full" />

      <ResetFilter
        isVisible={Object.entries(filterOptions).toString() !== Object.entries(filter).toString()}
        onClick={resetFilterHandler}
      />
    </>
  )
}

export default List

const ReviewRedner = ({ data, isPending }: ReviewRednerProps) => {
  const isEmptyData = !data || (data && data[0]?.length === 0)

  if (isPending) {
    return new Array(LIMIT).fill(0).map((_, index) => {
      return <ReviewSkeleton key={`${index + 1}`} />
    })
  }

  if (isEmptyData) {
    return <p className="flex w-full flex-1 items-center justify-center">아직 리뷰가 없어요</p>
  }

  return data.map((reviews) => {
    return reviews.map((review) => {
      return (
        <Link key={review.id} href={`${ROUTE.GATHERINGS}/${review.Gathering.id}`}>
          <Review
            score={review.score}
            comment={review.comment}
            gathering={review.Gathering}
            createdAt={review.createdAt}
            user={review.User}
            isImage
          />
        </Link>
      )
    })
  })
}

const useFilter = (filterOptions: TReviewFilterOptions) => {
  const [filter, setFilter] = useState(filterOptions)

  const resetFilterHandler = () => {
    setFilter(filterOptions)
  }

  const updateFilterOption = (newOption: Partial<TReviewFilterOptions>) => {
    setFilter((prevOption) => {
      return { ...prevOption, ...newOption }
    })
  }

  return { filter, updateFilterOption, resetFilterHandler }
}
