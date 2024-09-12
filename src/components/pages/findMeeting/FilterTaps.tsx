import FilterSort from "@/components/pages/findMeeting/FilterSort/FilterSort"
import Filter from "@/components/public/Filter/Filter"
import { location } from "@/constants/meeting"
import { IFilterOption } from "@/types/findMeeting/findMeeting"
import onFilterChanged from "@/util/onFilterChanged"
import SortSVG from "@public/icon/dynamicIcon/sort.svg"

import FilterCalendar from "./FilterCalendar/FilterCalendar"

interface FilterTabProp {
  filterOption: IFilterOption
  updateFilterOption: (newOption: Partial<IFilterOption>) => void
}

const FilterTabs = ({ filterOption, updateFilterOption }: FilterTabProp) => {
  const isDesc = filterOption.sortOrder === "desc"
  return (
    <div className="mb-6 mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-primary pt-4">
      <div className="flex gap-2">
        <Filter
          data={location}
          placeholder="지역 선택"
          onSelect={(e) => {
            onFilterChanged(e, "location", filterOption, updateFilterOption)
          }}
          selVal={filterOption.location}
        />
        <FilterCalendar
          placeholder="날짜 선택"
          selVal={filterOption.date}
          onChange={(e) => {
            onFilterChanged(e, "date", filterOption, updateFilterOption)
          }}
        />
      </div>
      <div className="ml-auto flex gap-2">
        <button
          aria-label="sortButton"
          type="button"
          className={`group flex size-9 cursor-pointer items-center justify-center rounded-xl border-2 transition-colors ${
            isDesc ? "border-gray-100 bg-white" : "border-gray-100 bg-black"
          }`}
          onClick={() => {
            const sortOrder = isDesc ? "asc" : "desc"
            return updateFilterOption({ sortOrder })
          }}
        >
          <SortSVG
            className={`h-6 w-6 transition-colors ${isDesc ? "text-[#111827]" : "text-white"} `}
          />
        </button>
        <FilterSort
          onSelect={(e) => {
            onFilterChanged(e, "sortBy", filterOption, updateFilterOption)
          }}
          selVal={filterOption.sortBy}
        />
      </div>
    </div>
  )
}

export default FilterTabs
