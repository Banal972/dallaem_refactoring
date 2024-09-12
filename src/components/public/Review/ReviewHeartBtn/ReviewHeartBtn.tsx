"use client"

import HeartSVG from "@public/icon/dynamicIcon/heart.svg"

import styles from "./ReviewHeartBtn.module.scss"

interface IReviewHeartBtnProps {
  value: number
  setter: (userScore: number) => void
}

/**
 * @interface IReviewHeartBtnProps
 * @param {number} value - 0~5 숫자
 * @param {function} onClick - value값이 수정되는 setter 함수
 */
const ReviewHeartBtn = ({ value, setter }: IReviewHeartBtnProps) => {
  const getHeartClass = (index: number) => {
    return `absolute left-0 top-0 transition-all duration-[800ms] ${styles.heart} ${value > index ? `${styles.active}` : ""}`
  }

  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: 5 }, (_, index) => {
        return (
          <button
            className="relative"
            key={`Heart ${index + 1}`}
            type="button"
            onClick={() => {
              setter(index + 1)
            }}
            aria-label={`Heart ${index + 1}`}
          >
            <HeartSVG className="h-6 w-6 text-[#E5E7EB]" />
            <HeartSVG
              className={`h-6 w-6 text-[#EA580C] ${getHeartClass(index)}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            />
          </button>
        )
      })}
    </div>
  )
}

export default ReviewHeartBtn
