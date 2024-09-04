import Image from "next/image"

interface IProfileBG {
  className?: string
}

const ProfileBG = ({ className }: IProfileBG) => {
  return (
    <Image
      src="/img/profile_bg.png"
      width={158}
      height={47}
      alt="ProfileBG"
      className={className}
    />
  )
}

export default ProfileBG
