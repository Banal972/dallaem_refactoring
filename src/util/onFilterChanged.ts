import { IFilterOption, TCustomFilterEvent } from "@/types/findMeeting/findMeeting"
import { TReviewFilterOptions, TScoresType } from "@/types/review/review"

const onFilterChanged = (
  e: TCustomFilterEvent,
  key: string,
  filterOption: IFilterOption | TReviewFilterOptions | TScoresType,
  updateFilter: (newOption: Partial<any>) => void,
) => {
  if (!key) return

  if (typeof e === "string") {
    if (e === "") {
      const newFilterOption = { ...filterOption }
      // @ts-ignore
      delete newFilterOption[key]
      updateFilter(newFilterOption)
    } else {
      updateFilter({ [key]: e })
    }
  } else {
    const target = e.target as HTMLButtonElement
    if (target.value) updateFilter({ [key]: target.value })
    else if (target.parentElement && target.parentElement.tagName.toLowerCase() === "button") {
      const targetParent = target.parentElement as HTMLButtonElement
      if (targetParent.value) updateFilter({ [key]: targetParent.value })
    }
  }
}

export default onFilterChanged
