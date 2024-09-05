"use client"

import { useEffect, useState } from "react"

import RatingBar from "@/components/pages/allReview/Scores/Atoms/RatingBar"
import FilterTab from "@/components/pages/findMeeting/FilterTab/FilterTab"
import Heart from "@/components/public/icon/dynamicIcon/Heart"
import useScoreCalculation from "@/hooks/Review/useScoreCalculation"
import { TScoresType } from "@/types/review/review"
import onFilterChanged from "@/util/onFilterChanged"
import { animated, useSpring } from "@react-spring/web"

const Scores = () => {
  const { filter, updateFilterOption } = useFilter()

  const { allScore, maxScore, ratings } = useScoreCalculation(filter)
  const style = useSpringScore(allScore)

  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <FilterTab
          selVal={filter.type}
          onSelect={(e) => {
            onFilterChanged(e, "type", filter, updateFilterOption)
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
  const [style, api] = useSpring(() => {
    return {
      from: {
        clipPath: "inset(0 100% 0 0)",
      },
      to: {
        clipPath: "inset(0 100% 0 0)",
      },
    }
  })

  useEffect(() => {
    api.start({
      to: { clipPath: `inset(0 ${100 - (Number(allScore) / 5) * 100}% 0 0)` },
    })
  }, [api, allScore])

  return style
}

const useFilter = () => {
  const [filter, setFilter] = useState<TScoresType>({
    type: "DALLAEMFIT",
  })

  const updateFilterOption = (newOption: Partial<TScoresType>) => {
    setFilter((prevOption) => {
      return { ...prevOption, ...newOption }
    })
  }

  return { filter, updateFilterOption }
}
