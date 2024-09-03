import { HTMLInputTypeAttribute, ReactNode } from "react"
import { FieldErrors, FieldValues, UseFormRegisterReturn } from "react-hook-form"

interface InputProps {
  label: string
  placeholder: string
  name: string
  type?: HTMLInputTypeAttribute
  register: UseFormRegisterReturn
  children?: ReactNode
  errors?: FieldErrors<FieldValues>
  patternMessage?: string
}

const Input = ({
  label,
  placeholder,
  register,
  name,
  type,
  children,
  errors,
  patternMessage,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          className="h-10 w-full rounded-lg bg-gray-200 px-4 outline-none"
          id={name}
          placeholder={placeholder}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register}
        />
        {children}
      </div>
      {errors && errors[name]?.type === "required" && (
        <p className="text-sm font-semibold text-red-500">{label}을 입력해주세요</p>
      )}
      {errors && errors[name]?.type === "pattern" && (
        <p className="text-sm font-semibold text-red-500">{patternMessage}</p>
      )}
    </div>
  )
}

export default Input
