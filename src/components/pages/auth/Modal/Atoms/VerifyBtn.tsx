import { ReactNode } from "react"

const VerifyBtn = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => {
  return (
    <button onClick={onClick} type="button" className="absolute right-4 top-1/2 -translate-y-1/2">
      {children}
    </button>
  )
}

export default VerifyBtn
