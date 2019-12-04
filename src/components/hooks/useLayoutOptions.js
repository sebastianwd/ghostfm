import { useStoreState, useStoreActions } from "easy-peasy"

const useLayoutOptions = () => {
  const layoutState = useStoreState(state => state.layout)

  const toggleVideoPosition = useStoreActions(
    actions => actions.layout.toggleVideoPosition
  )

  const openPlaylistModal = useStoreActions(
    actions => actions.layout.openPlaylistModal
  )

  const closePlaylistModal = useStoreActions(
    actions => actions.layout.closePlaylistModal
  )

  return {
    layoutState,
    toggleVideoPosition,
    openPlaylistModal,
    closePlaylistModal,
  }
}

export default useLayoutOptions
