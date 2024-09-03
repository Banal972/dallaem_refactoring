import { Dispatch, SetStateAction } from "react"

import signup from "@/actions/Auth-actions/signup"
import { useMutation } from "@tanstack/react-query"

const usePostSignup = (setError: Dispatch<SetStateAction<string>>) => {
  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      alert("회원가입 되었습니다.")
    },
    onError: (error) => {
      setError(error.message)
    },
  })
}

export default usePostSignup
