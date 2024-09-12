import Calendar from "react-calendar"
import { LooseValue, Value } from "react-calendar/dist/cjs/shared/types"

import ArrowSVG from "@public/icon/dynamicIcon/arrow.svg"

import "./Calendars.scss"

interface ICalendars {
  value?: LooseValue
  className?: string
  onChange?: (value: Value, event: React.MouseEvent<HTMLButtonElement>) => void
}

/**
 * @interface ICalendars
 * @param {number} value - getter 타입은 react-calender에서 지원하는 방식을 넣어야합니다.
 * @param {Function} onChange - setter 날짜 클릭시 value값을 변동합니다.
 */
const Calendars = ({ onChange, className, value }: ICalendars) => {
  return (
    <div className={`w-[337px] rounded-xl border px-[43px] pb-4 pt-[10px] ${className}`}>
      <Calendar
        value={value}
        onChange={onChange}
        next2Label={null}
        prev2Label={null}
        locale="en"
        calendarType="gregory"
        prevLabel={<ArrowSVG className="h-6 w-[15.7px] rotate-90 text-[#1F2937]" />}
        nextLabel={<ArrowSVG className="h-6 w-[15.7px] -rotate-90 text-[#1F2937]" />}
      />
    </div>
  )
}

export default Calendars
