import { useStoreActions } from "easy-peasy"
import Cookies from "js-cookie"

const useSession = () => {
  const setSession = useStoreActions(actions => actions.user.setSession)

  const setCookies = (authToken, token) => {
    Cookies.set("ghsetk", authToken)
    Cookies.set("rfrsh", token)
    setSession()
  }
  const getAuthToken = () => Cookies.get("ghsetk")
  const getToken = () => Cookies.get("rfrsh")

  const isAuthenticated = () => !!getAuthToken()

  const signOut = () => {
    Cookies.remove("ghsetk")
    typeof window !== "undefined" && window.location.reload()
  }

  return {
    setSession,
    setCookies,
    isAuthenticated,
    signOut,
    getToken,
    getAuthToken,
  }
}

export default useSession
