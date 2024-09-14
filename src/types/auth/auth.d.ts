import { Dispatch, ReactNode, SetStateAction } from "react"

type DefaultHandler = () => void
type SetAction<T> = Dispatch<SetStateAction<T>>

export interface ILogInState {
  isLogin: boolean
}

export interface IAuthLayoutProps {
  children: ReactNode
}

export interface IButtonProps extends IAuthLayoutProps {
  className?: string
  borderStyle: "solid" | "outlined"
  type?: "submit" | "reset" | "button"
  disabled?: boolean
  onClick?: DefaultHandler
}

export interface IGetClassesProps extends Pick<IButtonProps, "disabled" | "borderStyle"> {}

export interface PasswordVisibility {
  showPwd: boolean
  verifyShowPwd: boolean
}

export declare module "next-auth" {
  interface User {
    accessToken: string
  }
  interface Session {
    accessToken: string
  }
}
export declare module "@auth/core/jwt" {
  interface JWT {
    accessToken: string
  }
}

export interface IAuthModalProps extends ILogInState {
  closeLoginHandler: DefaultHandler
}

export interface ISignModalProps {
  setIsStep: SetAction<number>
}

export interface IUseAuthModalAni extends ILogInState, ISignModalProps {}

export interface ICompleteSignUpModalProps {
  onClick: DefaultHandler
}
