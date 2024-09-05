import getUserInfo from "@/actions/Auths/getUserInfo"

import LogoutBtn from "./LogoutBtn"
import ProfileEditBtn from "./ProfileEditBtn"
import Profile from "./img/Profile"
import ProfileBG from "./img/ProfileBG"

const ProfileBox = async () => {
  const userInfo = await getUserInfo()

  return (
    <div className="relative mx-auto h-[180px] min-w-60 w-full flex-none rounded-3xl border-2 border-gray-200 bg-white">
      <div className="flex items-center justify-between rounded-t-3xl bg-primary px-6 py-3.5 pt-5">
        <h3 className="z-10 text-lg font-semibold text-gray-900">내 프로필</h3>
        <ProfileEditBtn />
      </div>
      <ProfileBG className="absolute right-5 sm:right-20 top-[19px]" />
      <div className="flex px-3">
        <div className="relative -top-3 size-14 rounded-full shrink-0">
          <Profile profileImg={userInfo.image} state="largeDefault" />
        </div>
        <div className="px-2 py-3 shrink-1 w-3/4">
          <div className="mb-1 flex items-center gap-3">
            <h3 className="font-medium text-ellipsis overflow-hidden whitespace-nowrap">{userInfo?.name}</h3>
            <LogoutBtn />
          </div>
          <div className="flex gap-2">
            <div className="text-sm font-medium text-gray-800">
              <p className="mb-1">company.</p>
              <p>E-mail.</p>
            </div>
            <div className="text-sm text-gray-800 overflow-hidden w-full">
              <p className="mb-1 text-ellipsis overflow-hidden w-full whitespace-nowrap">{userInfo?.companyName}</p>
              <p className="text-ellipsis overflow-hidden w-full whitespace-nowrap">{userInfo?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileBox
