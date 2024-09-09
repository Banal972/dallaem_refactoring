import { useRouter } from "next/navigation"

const useNav = () => {
  const router = useRouter()

  const goPath = (path = "/") => {
    router.push(path)
  }

  const goBack = () => {
    router.back()
  }

  return { goPath, goBack }
}

export default useNav
