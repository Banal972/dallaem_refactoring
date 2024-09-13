"use client"

import Image from "next/image"

import { useEffect, useRef, useState } from "react"

import SwiperCore from "swiper"
import { Autoplay, Pagination, Parallax } from "swiper/modules"
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"

SwiperCore.use([Pagination])

const Banner = () => {
  const { swiperSetting, realIndex, dotUl } = useSwiperOptions()

  return (
    <div className="relative">
      {swiperSetting && (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Swiper {...swiperSetting}>
          <SwiperSlide className="overflow-hidden">
            <div
              className="relative h-[300px] bg-[#F4EAE0] px-5 pt-8 md:px-16"
              data-swiper-parallax="50%"
            >
              <p className="text-xl font-semibold leading-normal md:text-2xl lg:text-3xl">
                새로운 모임을 개설해서
                <br /> 같이달램에서 편리하게 모집하세요!
              </p>
              <div className="absolute bottom-0 right-[5%] w-[289px] after:block after:pb-[calc(272/490*100%)] xl:right-40 xl:w-[409px]">
                <Image
                  src="/img/banner/banner01.png"
                  alt="배너1 이미지"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="overflow-hidden">
            <div
              className="relative h-[300px] bg-[#CCDAF2] px-5 pt-8 md:px-16"
              data-swiper-parallax="50%"
            >
              <p className="text-xl font-semibold leading-normal md:text-2xl lg:text-3xl">
                <span className="text-lg md:text-xl lg:text-2xl">모두의 이야기가 모이는 곳,</span>
                <br /> 같이달램
              </p>
              <div className="absolute bottom-0 right-[4%] w-[291px] after:block after:pb-[calc(299/661*100%)] md:w-[461px] xl:right-[90px] xl:w-[661px]">
                <Image
                  src="/img/banner/banner02.png"
                  alt="배너2 이미지"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="overflow-hidden">
            <div
              className="relative h-[300px] bg-[#EBD4F3] px-5 pt-8 md:px-16"
              data-swiper-parallax="50%"
            >
              <p className="text-xl font-semibold leading-normal md:text-2xl lg:text-3xl">
                소중한 사람들과 <br />
                함께하는 시간
              </p>
              <div className="absolute bottom-0 right-[5%] w-[240px] after:block after:pb-[calc(253/490*100%)] md:right-[9%] md:w-[390px] xl:right-32 xl:w-[490px]">
                <Image
                  src="/img/banner/banner03.png"
                  alt="배너3 이미지"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      )}
      <div className="absolute bottom-0 right-5 z-10 flex translate-y-1/2 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white py-[6px] pl-2 pr-4">
        <div className="rounded-full bg-gray-300 px-2 py-[1px] text-[10px] font-semibold">
          {realIndex} / 3
        </div>
        <ul ref={dotUl} className="flex gap-1" />
      </div>
    </div>
  )
}

export default Banner

const useSwiperOptions = () => {
  const dotUl = useRef<HTMLUListElement>(null)
  const [realIndex, setRealIndex] = useState(1)
  const [swiperSetting, setSwiperSetting] = useState<SwiperProps | null>(null)

  useEffect(() => {
    if (!swiperSetting) {
      setSwiperSetting({
        pagination: {
          el: dotUl.current,
          clickable: true,
          renderBullet: (_, className: string) => {
            return `<li class="${className}"/>`
          },
        },
        autoplay: {
          delay: 6000,
        },
        modules: [Pagination, Parallax, Autoplay],
        speed: 800,
        parallax: true,
        loop: true,
        onSlideChange: (swiper: SwiperCore) => {
          setRealIndex(swiper.realIndex + 1)
        },
      })
    }
  }, [swiperSetting])

  return { swiperSetting, realIndex, dotUl }
}
