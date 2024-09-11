import getQueryClient from "@/components/app/queryClient"
import { CustomHydrationBoundaryProp } from "@/types/mypage/mypage"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

const CustomHydrationBoundary = ({ options, children }: CustomHydrationBoundaryProp) => {
  const queryClient = getQueryClient()
  queryClient.prefetchQuery(options)

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}

export default CustomHydrationBoundary
