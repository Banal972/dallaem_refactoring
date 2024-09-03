import { Dispatch, SetStateAction } from "react"

import signup from "@/actions/Auth-actions/signup"
import { useMutation } from "@tanstack/react-query"

const usePostSignup = (
  setError: Dispatch<SetStateAction<string>>,
  setIsStep: Dispatch<SetStateAction<number>>,
) => {
  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      setIsStep(2)
    },
    onError: (error) => {
      setError(error.message)
    },
  })
}

export default usePostSignup
