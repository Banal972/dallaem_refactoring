import { ReactNode } from "react"

import getQueryClient from "@/components/app/queryClient"
import { DataTag, HydrationBoundary, UseQueryOptions, dehydrate } from "@tanstack/react-query"

type UseQueryOptionsCompatible = UseQueryOptions<
  { data: any; hasMore: boolean },
  Error,
  { data: any; hasMore: boolean },
  {}[]
> & { initialData?: undefined } & { queryKey: DataTag<{}[], { data: any; hasMore: boolean }> }

interface CustomHydrationBoundaryProp {
  children: ReactNode
  options: UseQueryOptionsCompatible
}

const CustomHydrationBoundary = ({ options, children }: CustomHydrationBoundaryProp) => {
  const queryClient = getQueryClient()
  queryClient.prefetchQuery(options)

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}

export default CustomHydrationBoundary
