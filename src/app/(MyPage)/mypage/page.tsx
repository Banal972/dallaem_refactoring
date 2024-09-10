import MyPageInfoTap from "@/components/pages/mypage/MyPageInfoTap"
import ProfileBox from "@/components/public/ProfileBox"
import CustomHydrationBoundary from "@/hooks/CustomHydrationBoundary.tsx"
import MyPagePrefetchOption from "@/hooks/mypage/myPageQuery"

const MyPage = () => {
  return (
    <div className="flex h-full flex-col items-stretch gap-3">
      <ProfileBox />
      <CustomHydrationBoundary options={MyPagePrefetchOption()}>
        <MyPageInfoTap />
      </CustomHydrationBoundary>
    </div>
  )
}

export default MyPage
