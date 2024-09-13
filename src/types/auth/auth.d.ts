import { Dispatch, SetStateAction } from "react"

export type TIsLogin = boolean

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

export interface IAuthModalProps {
  isLogin: TIsLogin
  closeLoginHandler: () => void
}

export interface IUseAuthModalAni {
  isLogin: TIsLogin
  setIsStep: Dispatch<SetStateAction<number>>
}

export interface ISignModalProps {
  setIsStep: Dispatch<SetStateAction<number>>
}

export interface ICompleteSignUpModalProps {
  onClick: () => void
}
