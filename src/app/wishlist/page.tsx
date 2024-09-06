import List from "@/components/pages/wishlist/List"
import ImageHeader from "@/components/public/ImageHeader"

const WishListPage = () => {
  return (
    <main>
      <div className="m-6 flex min-h-screen flex-col rounded-[20px] bg-white px-6 py-14 md:m-12 md:px-16">
        <ImageHeader sort="wish" mainText={mainText} subText={subText} />
        <List />
      </div>
    </main>
  )
}

export default WishListPage

const mainText = "찜한 모임"
const subText = "마감되기 전에 지금 바로 참여해보세요 👀"
