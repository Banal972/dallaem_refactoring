"use client"

import { ReactNode } from "react"

import GNB from "@/components/public/gnb/GNB"

// import { ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation"

// import ROUTE from "@/constants/route"

const RouteValidationLayout = ({ children }: { children: ReactNode }) => {
  /* const pathname = usePathname()
  const searchParams = useSearchParams()

  const shouldShowGNB = isValidRoute(pathname, searchParams)

  if (!shouldShowGNB) {
    return children
  } */

  return <GNB>{children}</GNB>
}

export default RouteValidationLayout

/* function isValidRoute(path: string, searchParams: ReadonlyURLSearchParams): boolean {
  return Object.values(ROUTE).some((route) => {
    // '/' 경로에 대한 특별 처리
    if (route === ROUTE.HOME) {
      const result = path === "/"
      return result
    }

    // GATHERINGS 경로에 대한 특별 처리
    if (route === ROUTE.GATHERINGS) {
      const pathParts = path.split("/")
      // GATHERINGS 경로 자체인 경우 (뒷부분이 비어있는 경우)
      if (path === ROUTE.GATHERINGS) {
        return true
      }
      const lastPart = pathParts[pathParts.length - 1]
      // 'number'이거나 숫자인 경우 true 반환
      return lastPart === "number" || /^\d+$/.test(lastPart)
    }

    // 쿼리 스트링이 있는 경우
    if (route.includes("?")) {
      const [basePath, query] = route.split("?")
      const [paramKey, paramValue] = query.split("=")
      const result = path === basePath && searchParams.get(paramKey) === paramValue

      return result
    }
    // 쿼리 스트링이 없는 경우 (루트 경로 제외)
    const result = path === route || path.startsWith(`${route}/`)
    return result
  })
} */
