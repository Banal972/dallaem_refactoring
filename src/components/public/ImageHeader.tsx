import Image from "next/image"

import { ImageHeaderProp } from "@/types/common/global"
import headClassIMG from "@public/img/head_class.png"
import headReviewIMG from "@public/img/head_review.png"
import headWishIMG from "@public/img/head_saved.png"

const ImageHeader = ({ sort, mainText, subText }: ImageHeaderProp) => {
  const imageSrc = getImageSrc(sort)
  const isMeeting = sort === "meeting"
  return (
    <div className="flex-none">
      <div className="flex items-center gap-4">
        <div className="size-[72px] flex-none">
          <Image width={72} height={72} src={imageSrc} alt="headClassIMG" priority />
        </div>
        <div>
          {isMeeting && <p className="text-sm font-medium text-gray-700">{subText}</p>}
          <h4 className="mt-2 text-lg font-semibold leading-8 text-gray-900 sm:text-2xl">
            {mainText}
          </h4>
          {!isMeeting && <p className="left-5 mt-2 text-sm font-medium text-gray-700">{subText}</p>}
        </div>
      </div>
    </div>
  )
}

export default ImageHeader

const getImageSrc = (sort: string): string => {
  switch (sort) {
    case "meeting":
      return headClassIMG.src
    case "wish":
      return headWishIMG.src
    default:
      return headReviewIMG.src
  }
}
