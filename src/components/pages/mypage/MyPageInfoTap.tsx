"use client"

import useTapHook from "@/hooks/mypage/useTapHook"

import MyPageInfoTapButton from "./MyPageInfoTapButton"
import MyPageInfoWrapper from "./MyPageInfoWrapper"
import UnderBar from "./UnderBar"

const MyPageInfoTap = () => {
  const { tapState, dispatch, dataFetchingKey } = useTapHook()

  return (
    <section className="mx-auto mt-6 w-full grow border-t-2 border-primary bg-white p-6">
      <div className="relative mb-6 flex gap-3">
        <MyPageInfoTapButton onClick={dispatch} state="myMeeting" isActive={tapState.myMeeting} />
        <MyPageInfoTapButton onClick={dispatch} state="myReview" isActive={tapState.myReview} />
        <MyPageInfoTapButton
          onClick={dispatch}
          state="myOwnMeeting"
          isActive={tapState.myOwnMeeting}
        />
        <UnderBar dataFetchingKey={dataFetchingKey} />
      </div>
      <MyPageInfoWrapper
        onClick={dispatch}
        dataFetchingKey={dataFetchingKey}
        isReviewed={tapState.isReviewed}
      />
    </section>
  )
}

export default MyPageInfoTap
