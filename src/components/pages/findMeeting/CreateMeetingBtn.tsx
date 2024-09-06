import { DefaultHandlerProp } from "@/types/findMeeting/findMeeting"

const CreateMeetingBtn = ({ onClick }: DefaultHandlerProp) => {
  return (
    <button
      type="button"
      className="absolute right-0 top-0 h-[34px] w-[85px] rounded-lg border border-primary bg-primary text-xs font-semibold leading-6 text-white transition-colors hover:bg-white hover:text-primary sm:text-sm md:h-[44px] md:w-[115px] md:rounded-xl md:text-base"
      onClick={onClick}
    >
      모임 만들기
    </button>
  )
}

export default CreateMeetingBtn
