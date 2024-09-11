"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"

import Input from "@/components/pages/auth/Modal/Atoms/Input"
import VerifyBtn from "@/components/pages/auth/Modal/Atoms/VerifyBtn"

const LoginModal = ({ setIsStep }: { setIsStep: Dispatch<SetStateAction<number>> }) => {
  const { register, errors, error, onSubmit } = useSubmit()
  const { isShowPwd, onIsShowClickHanlder } = useShowPwd()

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mt-7 flex flex-col gap-3 text-sm">
          <Input
            name="email"
            label="아이디"
            type="text"
            placeholder="이메일을 입력해주세요"
            register={register("email", { required: true })}
            errors={errors}
          />
          <Input
            name="password"
            label="비밀번호"
            type={isShowPwd ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요"
            register={register("password", { required: true })}
            errors={errors}
          >
            <VerifyBtn onClick={onIsShowClickHanlder}>
              {isShowPwd ? (
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
          로그인
        </button>
        {error && <p className="mt-2 text-center text-sm font-semibold text-red-500">{error}</p>}
      </form>
      <div className="mt-5 flex justify-center gap-2 text-center text-sm">
        <p className="text-gray-500">같이달램이 처음 이신가요?</p>
        <button
          onClick={() => {
            setIsStep(1)
          }}
          type="button"
          className="text-primary"
        >
          회원가입
        </button>
      </div>
    </>
  )
}

const useSubmit = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const [error, setError] = useState("")
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", { ...data, redirect: false })
    if (res?.error) {
      setError("잘못된 이메일 또는 비밀번호입니다")
    } else {
      router.refresh()
    }
  })

  return { register, errors, error, onSubmit }
}

const useShowPwd = () => {
  const [isShowPwd, setIsShowPwd] = useState(false)

  const onIsShowClickHanlder = () => {
    setIsShowPwd(!isShowPwd)
  }

  return { isShowPwd, onIsShowClickHanlder }
}

export default LoginModal
