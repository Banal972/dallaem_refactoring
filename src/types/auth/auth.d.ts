import { Dispatch, SetStateAction } from "react"

/* export interface IAuthPageProps {
  searchParams: { mode?: string }
}

export interface IAuthLayoutProps {
  children: ReactNode
}

export interface ISigninData {
  email: string
  password: string
}

export interface ISignupData extends ISigninData {
  name: string
  companyName: string
}

export interface IButtonProps extends IAuthLayoutProps {
  className?: string
  borderStyle: "solid" | "outlined"
  type?: "submit" | "reset" | "button"
  disabled?: boolean
  onClick?: () => void
}

export interface IGetClassesProps extends Pick<IButtonProps, "disabled" | "borderStyle"> {}

export interface IMessage {
  message: string
}

export interface IValidationError extends IMessage {
  code: "VALIDATION_ERROR"
  parameter: "email"
}

export interface IInvalidCredentials extends IMessage {
  code: "INVALID_CREDENTIALS"
}

export interface ILoginSuccess {
  token: string
}

export type TSigninResponse = IValidationError | IInvalidCredentials | ILoginSuccess

export interface IEmailExists extends IMessage {
  code: "EMAIL_EXISTS"
}

export type TSignupResponse = IEmailExists | IValidationError | IMessage */

// 리팩토링 후

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
