import { useStoreState, useStoreActions } from "easy-peasy"

const useLayoutOptions = () => {
  const layoutState = useStoreState(state => state.layout)

  const toggleVideoPosition = useStoreActions(
    actions => actions.layout.toggleVideoPosition
  )

  return {
    layoutState,
    toggleVideoPosition,
  }
}

export default useLayoutOptions
