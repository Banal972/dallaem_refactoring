"use client"

import Image from "next/image"

import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

import MainReviewSkeleton from "@/components/public/Skeleton/MainReviewSkeleton"
import Spinner from "@/components/public/Spinner/Spinner"
import LIMIT from "@/constants/limit"
import { useAllReview } from "@/hooks/Review/useAllReview"
import { IMainReviewRenderProps } from "@/types/main/main"
import HeartSVG from "@public/icon/dynamicIcon/heart.svg"
import dayjs from "dayjs"

const MainReview = () => {
  const { data, isPending, hasNextPage, isFetchingNextPage, ref } = useInfiniteReviews()

  return (
    <>
      <PendingRender isPending={isPending} data={data} />
      {hasNextPage && isFetchingNextPage && (
        <div className="flex w-full items-center justify-center py-7">
          <Spinner />
        </div>
      )}
      <div ref={ref} className="h-1 w-full" />
    </>
  )
}

export default MainReview

const PendingRender = ({ isPending, data }: IMainReviewRenderProps) => {
  const isEmptyData = !data || (data && data[0]?.length === 0)

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:gap-x-12">
        {new Array(LIMIT).fill(0).map((_, index) => {
          return <MainReviewSkeleton key={`${index + 1}`} />
        })}
      </div>
    )
  }

  if (isEmptyData) {
    return (
      <p className="w-full py-10 text-center text-sm text-gray-500">
        리뷰 첫 주인공이 돼주세요! 🖐️
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 md:gap-y-12 lg:gap-x-12">
      {data.map((reviews) => {
        return reviews.map((review) => {
          return (
            <div
              key={review.id}
              className="rounded-lg border border-primary/60 px-6 py-7 lg:py-9"
              data-cy="reviews"
            >
              <div className="flex items-center gap-2">
                <div className="relative size-8 overflow-hidden rounded-full border">
                  <Image
                    src={review.User.image || "/img/profile_small_default.png"}
                    alt="유저 이미지"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <p className="text-gray-700 after:ml-2">{review.User.name}</p>
              </div>
              <div className="mt-2 flex gap-1">
                {Array(5)
                  .fill(null)
                  .map((_, index) => {
                    return (
                      <div data-testid="scoreHeart" key={`score-${index + 1}`}>
                        <HeartSVG
                          className={`h-6 w-6 ${index < review.score ? "text-[#EA580C]" : "text-[#E5E7EB]"}`}
                        />
                      </div>
                    )
                  })}
              </div>
              <h3 className="mt-[10px] line-clamp-2 text-ellipsis break-keep text-sm font-medium leading-5">
                {review.comment}
              </h3>
              <p className="mt-[10px] text-xs font-medium leading-4 text-gray-700">
                {review.Gathering.name} · {review.Gathering.location}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                {dayjs(review.createdAt).format("YYYY.MM.DD")}
              </p>
            </div>
          )
        })
      })}
    </div>
  )
}

const useInfiniteReviews = () => {
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } = useAllReview({
    sortOrder: "desc",
  })

  const { ref, inView } = useInView({ threshold: 1 })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  return { data, isPending, hasNextPage, isFetchingNextPage, ref }
}
