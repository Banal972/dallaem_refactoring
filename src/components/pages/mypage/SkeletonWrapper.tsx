import { Fragment, ReactNode } from "react"

import LIMIT from "@/constants/limit"

const SkeletonWrapper = ({ component }: { component: ReactNode }) => {
  return (
    <div className="flex flex-col gap-4">
      {new Array(LIMIT)
        .fill(0)
        .map((_, i) => {
          return i + 1
        })
        .map((number) => {
          return <Fragment key={number}>{component}</Fragment>
        })}
    </div>
  )
}

export default SkeletonWrapper
