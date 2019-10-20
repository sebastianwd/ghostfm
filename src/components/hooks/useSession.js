import { useStoreActions } from "easy-peasy"

const useSession = () => {
  const setSession = useStoreActions(actions => actions.user.setSession)

  return {
    setSession,
  }
}

export default useSession
