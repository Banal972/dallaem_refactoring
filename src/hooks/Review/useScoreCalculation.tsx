import { useMemo } from "react"

import getScoreReview from "@/actions/Reviews/getScoreReview"
import {
  IReviewScoreReturn,
  IScoreReview,
  TReviewScoreRatings,
  TScoresType,
} from "@/types/review/review"
import { useQuery } from "@tanstack/react-query"

const sumScoreData = (scoreData: IScoreReview[]) => {
  return scoreData.reduce(
    (acc, curr) => {
      acc.oneStar += curr.oneStar
      acc.twoStars += curr.twoStars
      acc.threeStars += curr.threeStars
      acc.fourStars += curr.fourStars
      acc.fiveStars += curr.fiveStars
      return acc
    },
    {
      oneStar: 0,
      twoStars: 0,
      threeStars: 0,
      fourStars: 0,
      fiveStars: 0,
    },
  )
}

const reviewSum = (score: number[]) => {
  return score.reduce((ac, cur) => {
    return ac + cur
  }, 0)
}

const totalScore = (score: number[]) => {
  return score.reduce((ac, cur, index) => {
    return ac + cur * (index + 1)
  }, 0)
}

// 진행바가 끝까지 안차게끔 5를 더 대입
const maxScore = (score: number[]) => {
  return Math.max(...score) + 5
}

const ratings = (score: number[]) => {
  return score
    .reduce((ac: TReviewScoreRatings[], cur, index): TReviewScoreRatings[] => {
      return [...ac, { rating: index + 1, count: cur }]
    }, [])
    .sort((a, b) => {
      return b.rating - a.rating
    })
}

const calculation = (score: number[]): IReviewScoreReturn => {
  return {
    allScore: (totalScore(score) / reviewSum(score)).toFixed(1),
    maxScore: maxScore(score),
    ratings: ratings(score),
  }
}

const useScoreCalculation = (filter: TScoresType) => {
  const { data: scoreData } = useQuery({
    queryKey: ["scores", filter],
    queryFn: () => {
      return getScoreReview(filter)
    },
  })

  return useMemo(() => {
    if (!scoreData || scoreData.length === 0) {
      return { allScore: 0, maxScore: 0, ratings: [] }
    }
    const { oneStar, twoStars, threeStars, fourStars, fiveStars } = sumScoreData(scoreData)
    return calculation([oneStar, twoStars, threeStars, fourStars, fiveStars])
  }, [scoreData])
}

export default useScoreCalculation
