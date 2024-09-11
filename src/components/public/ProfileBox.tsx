import Image from "next/image"

import getUserInfo from "@/actions/Auths/getUserInfo"

import LogoutBtn from "./LogoutBtn"
import ProfileEditBtn from "./ProfileEditBtn"
import Profile from "./img/Profile"

const ProfileBox = async () => {
  const userInfo = await getUserInfo()

  return (
    <div className="relative mx-auto h-[180px] w-full min-w-60 flex-none rounded-3xl border-2 border-gray-200 bg-white">
      <div className="flex items-center justify-between rounded-t-3xl bg-primary px-6 py-3.5 pt-5">
        <h3 className="z-10 text-lg font-semibold text-gray-900">내 프로필</h3>
        <ProfileEditBtn />
      </div>
      <Image
        src="/img/profile_bg.png"
        width={158}
        height={47}
        alt="ProfileBG"
        className="absolute right-5 top-[19px] h-[47px] w-[158px] sm:right-20"
        priority
      />
      <div className="flex px-3">
        <div className="relative -top-3 size-14 shrink-0 rounded-full">
          <Profile profileImg={userInfo.image} state="largeDefault" />
        </div>
        <div className="shrink-1 w-3/4 px-2 py-3">
          <div className="mb-1 flex items-center gap-3">
            <h3 className="overflow-hidden text-ellipsis whitespace-nowrap font-medium">
              {userInfo?.name}
            </h3>
            <LogoutBtn />
          </div>
          <div className="flex gap-2">
            <div className="text-sm font-medium text-gray-800">
              <p className="mb-1">company.</p>
              <p>E-mail.</p>
            </div>
            <div className="w-full overflow-hidden text-sm text-gray-800">
              <p className="mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {userInfo?.companyName}
              </p>
              <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {userInfo?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileBox
