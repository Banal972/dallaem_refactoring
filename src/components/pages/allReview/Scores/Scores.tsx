"use client"

import { useState } from "react"

import RatingBar from "@/components/pages/allReview/Scores/Atoms/RatingBar"
import FilterTab from "@/components/pages/findMeeting/FilterTab/FilterTab"
import Heart from "@/components/public/icon/dynamicIcon/Heart"
import useScoreCalculation from "@/hooks/Review/useScoreCalculation"
import { TCustomFilterEvent } from "@/types/findMeeting/findMeeting"
import { TScoresType } from "@/types/review/review"
import { animated, useSpring } from "@react-spring/web"

const Scores = () => {
  const { filter, onFilterChanged } = useFilter()
  const { allScore, maxScore, ratings } = useScoreCalculation(filter)
  const style = useSpringScore(allScore)

  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <FilterTab
          selVal={filter.type}
          onSelect={(e) => {
            onFilterChanged(e, "type")
          }}
        />
      </div>
      <div className="mt-6 flex h-[180px] items-center justify-center gap-5 border-2 border-l-0 border-r-0 border-primary md:gap-[138px] xl:gap-[188px]">
        {Number(allScore) < 1 && <p className="text-sm text-gray-500">아직 리뷰가 없어요</p>}
        {Number(allScore) > 0 && (
          <>
            <div>
              <p className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl">
                {allScore} <span className="text-gray-400">/5</span>
              </p>
              <div className="relative mt-2 flex gap-[2px]">
                {Array.from({ length: 5 }, (_, index) => {
                  return <Heart key={index + 1} state="default" />
                })}
                <animated.div style={style} className="absolute left-0 top-0 z-10 flex gap-[2px]">
                  {Array.from({ length: 5 }, (_, index) => {
                    return <Heart key={index + 1} state="active" />
                  })}
                </animated.div>
              </div>
            </div>
            <div>
              {ratings.map((rating) => {
                return (
                  <RatingBar
                    key={rating.rating}
                    rating={rating.rating}
                    count={rating.count}
                    maxScore={maxScore}
                  />
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Scores

const useSpringScore = (allScore: string | number) => {
  const style = useSpring({
    from: {
      clipPath: "inset(0 100% 0 0)",
    },
    to: {
      clipPath: `inset(0 ${100 - (Number(allScore) / 5) * 100}% 0 0)`,
    },
  })

  return style
}

const useFilter = () => {
  const [filter, setFilter] = useState<TScoresType>({
    type: "DALLAEMFIT",
  })

  const onFilterChanged = (e: TCustomFilterEvent, key: string) => {
    if (key) {
      if (typeof e === "string") {
        if (e === "") {
          if (key in filter) {
            const newFilterOption = { ...filter }
            // @ts-ignore
            delete newFilterOption[key]
            setFilter(newFilterOption)
          }
        } else {
          setFilter({ ...filter, [key]: e })
        }
      } else {
        const target = e.target as HTMLButtonElement
        if (target.value) setFilter({ ...filter, [key]: target.value })
        else if (target.parentElement && target.parentElement.tagName.toLowerCase() === "button") {
          const targetParent = target.parentElement as HTMLButtonElement
          if (targetParent.value) setFilter({ ...filter, [key]: targetParent.value })
        }
      }
    }
  }

  return { filter, onFilterChanged }
}
