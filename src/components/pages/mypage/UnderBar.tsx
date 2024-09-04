import { IDataSort } from "@/types/mypage/mypage"

const UnderBar = ({ dataFetchingKey }: Pick<IDataSort, "dataFetchingKey">) => {
  return (
    <div
      className={`absolute bottom-0 h-[1.5px] bg-gray-900 transition-transform ${animatedBottomClassName(dataFetchingKey)}`}
    />
  )
}

export default UnderBar

const animatedBottomClassName = (state: string) => {
  const myMeetingClass = "w-[66px] -translate-x-[1px] md:w-[74px]"
  const myReviewClass = "w-[54px] translate-x-[76px] md:w-[62px] md:translate-x-[85px]"
  const myOwnMeetingClass = "w-[82px] translate-x-[140px] md:w-[94px] md:translate-x-[155px]"

  switch (state) {
    case "myMeeting":
      return myMeetingClass
    case "myReview":
      return myReviewClass
    case "myOwnMeeting":
      return myOwnMeetingClass
    default:
      return myMeetingClass
  }
}
