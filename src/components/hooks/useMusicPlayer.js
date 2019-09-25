import { useContext } from "react"
import { MusicPlayerContext } from "../_context/MusicPlayerContext"

const useMusicPlayer = () => {
  const [playerState, setPlayerState] = useContext(MusicPlayerContext)

  const updateState = newState => {
    setPlayerState(prevState => {
      console.log(prevState)
      return { ...prevState, ...newState }
    })
  }

  function playTrack(id) {
    console.log(`looking up video with id ${id}...`)
    updateState({
      url: `https://www.youtube.com/watch?v=${id}`,
      played: 0,
      loaded: 0,
      pip: false,
    })
  }

  function handleProgress(state) {
    if (!state.seeking) {
      updateState({ ...state })
    }
  }

  function handleDuration(duration) {
    updateState({ duration })
  }

  function handleSeekMouseUp(e) {
    updateState({ seeking: false })
  }

  function handleSeekChange(e) {
    updateState({ played: parseFloat(e.target.value) })
  }

  function handleSeekMouseDown() {
    updateState({ seeking: true })
  }

  function handlePlay() {
    updateState({ playing: true })
  }

  function handlePlayPause() {
    console.log("pausing...")
    updateState({ playing: !playerState.playing })
  }

  function handleEnded() {
    console.log("song ended")
  }

  return {
    playerState,
    playTrack,
    handleProgress,
    handleDuration,
    handleSeekMouseUp,
    handleSeekChange,
    handleSeekMouseDown,
    handlePlay,
    handleEnded,
    handlePlayPause,
  }
}

export default useMusicPlayer
