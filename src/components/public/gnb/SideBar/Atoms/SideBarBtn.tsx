import XSVG from "@public/icon/staticIcon/X.svg"
import MenuSVG from "@public/icon/staticIcon/menuIcon.svg"
import { animated, useSpring } from "@react-spring/web"

interface IAnimatedMenuIconProps {
  onClick: () => void
  isOpen: boolean
}

const SideBarBtn = ({ onClick, isOpen }: IAnimatedMenuIconProps) => {
  const springProps = useSpring({
    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
    config: { tension: 150, friction: 15 },
  })

  return (
    <animated.div style={springProps} className="cursor-pointer" onClick={onClick}>
      {isOpen ? (
        <XSVG className="h-5 w-5 text-primary" />
      ) : (
        <MenuSVG className="h-5 w-5 text-primary" />
      )}
    </animated.div>
  )
}

export default SideBarBtn
