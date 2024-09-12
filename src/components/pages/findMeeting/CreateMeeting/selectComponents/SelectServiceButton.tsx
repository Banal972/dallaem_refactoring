import { ISelectServiceButton } from "@/types/findMeeting/findMeeting"
import CheckboxSVG from "@public/icon/dynamicIcon/checkbox.svg"

const SelectServiceButton = ({ category, detail, state, type, onClick }: ISelectServiceButton) => {
  return (
    <button
      type="button"
      className={`rounded-lg p-3 ${state ? "bg-gray-900" : "bg-gray-50"}`}
      onClick={() => {
        onClick(type)
      }}
    >
      <div className="flex h-full items-start gap-2">
        <div className="relative h-[18px] w-[18px]">
          <div className="absolute left-0 top-0 z-20 h-full w-full rounded-md border border-gray-200" />
          <CheckboxSVG
            className={`absolute left-1/2 top-1/2 z-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 ${state ? "text-[#EA580C]" : "text-[#FFFFFF]"}`}
          />
        </div>
        <div
          className={`flex flex-col items-start text-sm sm:text-base ${state ? "text-white" : "text-gray-900"}`}
        >
          <span className="font-semibold">{category}</span>
          <div className={`text-xs ${state ? "text-white" : "text-gray-700"}`}>{detail}</div>
        </div>
      </div>
    </button>
  )
}

export default SelectServiceButton
