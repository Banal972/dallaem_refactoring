import { useReducer } from "react"

import { IAction, IInitialState } from "@/types/mypage/mypage"

const initialState = {
  myMeeting: true,
  myReview: false,
  myOwnMeeting: false,
}

const reducer = (state: IInitialState, action: IAction) => {
  switch (action.type) {
    case "myMeeting":
      return {
        ...state,
        myMeeting: true,
        myReview: false,
        myOwnMeeting: false,
      }
    case "myReview":
      if (action.isReviewed) {
        return {
          ...state,
          myMeeting: false,
          myReview: true,
          myOwnMeeting: false,
          isReviewed: action.isReviewed,
        }
      }
      return {
        ...state,
        myMeeting: false,
        myReview: true,
        myOwnMeeting: false,
      }
    case "myOwnMeeting":
      return {
        ...state,
        myMeeting: false,
        myReview: false,
        myOwnMeeting: true,
      }
    default:
      return state
  }
}

const useTapHook = () => {
  const [tapState, dispatch] = useReducer(reducer, initialState)
  const [dataFetchingKey] = (Object.entries(tapState) as [string, any]).find((state) => {
    return state[1] === true && state[0] !== "isReviewed"
  })

  return { tapState, dispatch, dataFetchingKey }
}

export default useTapHook
