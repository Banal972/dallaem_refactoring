"use client"

import { useQueryClient } from "@tanstack/react-query"
import { MouseEvent, ReactNode } from "react"

interface ICardCancelProps {
  onClick?: (e: MouseEvent) => void
  type?: "active" | "outline"
  children: ReactNode
}

const CardBtn = ({ onClick, type = "outline", children }: ICardCancelProps) => {
  const queryClient = useQueryClient()
  const cancelJoin = (e: MouseEvent) => {
    e.preventDefault()
    if(onClick !== undefined){
      onClick(e)
    }
    queryClient.invalidateQueries({queryKey:["mypage"]})
  }

  const clickHandler = type === "outline" ? cancelJoin : onClick
  return (
    <button
      className={`border-primary h-10 w-[120px] rounded-xl border text-sm font-semibold leading-5 transition-colors ${type === "active" ? "bg-primary hover:text-primary text-white hover:bg-white" : "text-primary hover:bg-primary hover:text-white"}`}
      type="button"
      onClick={clickHandler}
    >
      {children}
    </button>
  )
}

export default CardBtn
