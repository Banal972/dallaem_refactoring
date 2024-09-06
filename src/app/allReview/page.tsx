import { Metadata } from "next"

import getQueryClient from "@/components/app/queryClient"
import List from "@/components/pages/allReview/List"
import Scores from "@/components/pages/allReview/Scores/Scores"
import ImageHeader from "@/components/public/ImageHeader"
import { allReviewOptions } from "@/hooks/Review/useAllReview"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

export const metadata: Metadata = {
  title: "같이달램 | 모든 리뷰",
}

const AllReviewsPage = async () => {
  const options = allReviewOptions({})
  const queryClient = getQueryClient()

  const hasNotDefaultData = !queryClient.getQueryData(options.queryKey)

  if (hasNotDefaultData) {
    queryClient.prefetchQuery(options)
  }

  return (
    <main>
      <div className="m-6 flex min-h-screen flex-col rounded-[20px] bg-white px-6 py-14 md:m-12 md:px-16">
        <ImageHeader sort="review" mainText={mainText} subText={subText} />
        <Scores />
        <div className="flex flex-1 flex-col py-6">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <List />
          </HydrationBoundary>
        </div>
      </div>
    </main>
  )
}

export default AllReviewsPage

const mainText = "모든 리뷰"
const subText = "같이달램을 이용한 분들은 이렇게 느꼈어요 🫶"
