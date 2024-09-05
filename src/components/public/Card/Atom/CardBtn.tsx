"use client"

import { MouseEvent, ReactNode } from "react"

import { useQueryClient } from "@tanstack/react-query"

interface ICardCancelProps {
  onClick: (e: MouseEvent) => void
  type?: "active" | "outline"
  children: ReactNode
}

const CardBtn = ({ onClick, type = "outline", children }: ICardCancelProps) => {
  const clickHandler = useButtonHandler({ onClick, type })

  return (
    <button
      className={`h-10 w-[120px] rounded-xl border border-primary text-sm font-semibold leading-5 transition-colors ${type === "active" ? "bg-primary text-white hover:bg-white hover:text-primary" : "text-primary hover:bg-primary hover:text-white"}`}
      type="button"
      onClick={clickHandler}
    >
      {children}
    </button>
  )
}

export default CardBtn

const useButtonHandler = ({ onClick, type }: Omit<ICardCancelProps, "children">) => {
  const queryClient = useQueryClient()
  const cancelJoin = (e: MouseEvent) => {
    e.preventDefault()
    if (onClick !== undefined) {
      onClick(e)
    }
    queryClient.invalidateQueries({ queryKey: ["mypage"] })
  }

  const clickHandler = type === "outline" ? cancelJoin : onClick

  return clickHandler
}
