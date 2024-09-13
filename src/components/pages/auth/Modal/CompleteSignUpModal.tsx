import { ICompleteSignUpModalProps } from "@/types/auth/auth"

const CompleteSignUpModal = ({ onClick }: ICompleteSignUpModalProps) => {
  return (
    <div className="py-0">
      <p className="text-center">가입이 완료되었습니다.</p>
      <button
        type="button"
        onClick={onClick}
        className="mt-10 w-full rounded-lg bg-primary py-2 text-sm text-white"
      >
        확인
      </button>
    </div>
  )
}

export default CompleteSignUpModal
