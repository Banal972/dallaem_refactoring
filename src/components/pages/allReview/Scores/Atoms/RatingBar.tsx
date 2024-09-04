"use client"

import { useEffect } from "react"

import { IRatingBar } from "@/types/review/review"
import { animated, useSpring } from "@react-spring/web"

const RatingBar = ({ rating, count, maxScore }: IRatingBar) => {
  const style = useSpringBar({ count, maxScore })

  return (
    <div
      data-cy="ratingbar"
      className="mt-1 flex items-center gap-3 text-sm font-medium leading-5 first:mt-0"
    >
      <p className="w-[21px] flex-none">{rating}점</p>
      <div className="relative h-1 w-[84px] overflow-hidden rounded-full bg-gray-200 sm:w-[240px]">
        <animated.div
          style={style}
          className="absolute left-0 top-0 h-full rounded-full bg-[#111827]"
        />
      </div>
      <p className="flex-none text-gray-400">{count}</p>
    </div>
  )
}

export default RatingBar

const useSpringBar = ({ count, maxScore }: Pick<IRatingBar, "count" | "maxScore">) => {
  const [style, api] = useSpring(() => {
    return {
      from: { width: "0%" },
      to: { width: "0%" },
    }
  })

  useEffect(() => {
    api.start({
      to: { width: `${(count / maxScore) * 100}%` },
    })
  }, [count, maxScore, api])

  return style
}
