import { signIn } from "next-auth/react"

import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"

import Input from "@/components/pages/auth/Modal/Atoms/Input"

const LoginModal = ({ setIsStep }: { setIsStep: Dispatch<SetStateAction<number>> }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    signIn("credentials", data)
  })

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
            type="text"
            placeholder="비밀번호를 입력해주세요"
            register={register("password", { required: true })}
            errors={errors}
          />
        </div>
        <button type="submit" className="mt-8 w-full rounded-lg bg-primary py-2 text-sm text-white">
          로그인
        </button>
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

export default LoginModal
