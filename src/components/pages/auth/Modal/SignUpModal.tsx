import Image from "next/image"

import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"

import Input from "@/components/pages/auth/Modal/Atoms/Input"
import VerifyBtn from "@/components/pages/auth/Modal/Atoms/VerifyBtn"
import { EmailRagex, PasswordRagex } from "@/constants/Regex"
import usePostSignup from "@/hooks/Auth/usePostSignup"
import { PasswordVisibility } from "@/types/auth/auth"

const SignUpModal = ({ setIsStep }: { setIsStep: Dispatch<SetStateAction<number>> }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const { isShowPassword, onShowPwdHanlder } = useShowPwd()
  const [error, setError] = useState("")
  const { mutate } = usePostSignup(setError, setIsStep)

  const onSubmit = handleSubmit((data) => {
    const { name, email, companyName, password, verifyPassword } = data
    if (password !== verifyPassword) {
      setError("비밀번호가 서로 다릅니다.")
      return
    }
    mutate({ name, email, companyName, password })
  })

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mt-7 flex flex-col gap-6 text-sm">
          <Input
            name="name"
            label="이름"
            type="text"
            placeholder="이름을 입력해주세요"
            register={register("name", { required: true })}
            errors={errors}
          />
          <Input
            name="email"
            label="아이디"
            type="text"
            placeholder="이메일을 입력해주세요"
            register={register("email", {
              required: true,
              pattern: EmailRagex,
            })}
            errors={errors}
            patternMessage="이메일양식에 맞게 작성해주세요"
          />
          <Input
            name="companyName"
            label="회사명"
            type="text"
            placeholder="회사명을 입력해주세요"
            errors={errors}
            register={register("companyName", { required: true })}
          />
          <Input
            name="password"
            label="비밀번호"
            type={isShowPassword.showPwd ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요."
            register={register("password", { required: true, pattern: PasswordRagex })}
            errors={errors}
            patternMessage="8자 이상, 숫자, 소문자, 특수문자(!,@,#)를 포함해야합니다."
          >
            <VerifyBtn
              onClick={() => {
                onShowPwdHanlder("showPwd")
              }}
            >
              {isShowPassword.showPwd ? (
                <Image
                  src="/icon/staticIcon/visibility_on.svg"
                  alt="비밀번호 확인 끄기 버튼"
                  width={20}
                  height={14}
                />
              ) : (
                <Image
                  src="/icon/staticIcon/visibility_off.svg"
                  alt="비밀번호 확인 활성화 버튼"
                  width={20}
                  height={14}
                />
              )}
            </VerifyBtn>
          </Input>
          <Input
            name="verify-password"
            label="비밀번호 확인"
            type={isShowPassword.verifyShowPwd ? "text" : "password"}
            placeholder="비밀번호를 다시 한번 입력해주세요."
            register={register("verifyPassword", { required: true })}
            errors={errors}
          >
            <VerifyBtn
              onClick={() => {
                onShowPwdHanlder("verifyShowPwd")
              }}
            >
              {isShowPassword.verifyShowPwd ? (
                <Image
                  src="/icon/staticIcon/visibility_on.svg"
                  alt="비밀번호 확인 끄기 버튼"
                  width={20}
                  height={14}
                />
              ) : (
                <Image
                  src="/icon/staticIcon/visibility_off.svg"
                  alt="비밀번호 확인 활성화 버튼"
                  width={20}
                  height={14}
                />
              )}
            </VerifyBtn>
          </Input>
        </div>
        <button type="submit" className="mt-8 w-full rounded-lg bg-primary py-2 text-sm text-white">
          회원가입
        </button>
        {error && <p className="mt-2 text-center text-sm font-semibold text-red-500">{error}</p>}
      </form>
      <div className="mt-5 flex justify-center gap-2 text-center text-sm">
        <p className="text-gray-500">이미 회원이신가요?</p>
        <button
          onClick={() => {
            setIsStep(0)
          }}
          type="button"
          className="text-primary"
        >
          로그인
        </button>
      </div>
    </>
  )
}

export default SignUpModal

const useShowPwd = () => {
  const [isShowPassword, setIsShowPassword] = useState<PasswordVisibility>({
    showPwd: false,
    verifyShowPwd: false,
  })

  const onShowPwdHanlder = (key: keyof PasswordVisibility) => {
    setIsShowPassword((prev) => {
      return {
        ...prev,
        [key]: !prev[key],
      }
    })
  }

  return { isShowPassword, onShowPwdHanlder }
}
