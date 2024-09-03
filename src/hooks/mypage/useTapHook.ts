import { useReducer } from "react"

import { IAction, IInitialState } from "@/types/mypage/mypage"
import { Entries } from "type-fest"

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

const findDataFetchingKey = (state: IInitialState) => {
  return Object.entries(state).find(([key, value]) => {
    return value === true && key !== "isReviewed"
  }) as Entries<IInitialState>
}

const useTapHook = () => {
  const [tapState, dispatch] = useReducer(reducer, initialState)
  const [dataFetchingKey] = findDataFetchingKey(tapState)

  return { tapState, dispatch, dataFetchingKey }
}

export default useTapHook
