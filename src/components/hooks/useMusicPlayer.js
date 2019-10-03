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

  function playTrack(id, trackName = "", artistName = "") {
    console.log(`looking up video with id ${id}...`)
    updateState({
      url: `https://www.youtube.com/watch?v=${id}`,
      played: 0,
      loaded: 0,
      pip: false,
      playing: true,
      currentSong: trackName,
      currentArtist: artistName,
    })
  }

  function playTrackAndSetQueue(id, trackName = "", artistName = "", tracks) {
    if (tracks) {
      let queue = tracks.map(({ artist, name }) => {
        return { artist: artist.strArtist, track: name }
      })
      updateState({
        url: `https://www.youtube.com/watch?v=${id}`,
        played: 0,
        loaded: 0,
        pip: false,
        playing: true,
        currentSong: trackName,
        currentArtist: artistName,
        queue: queue,
      })
      console.log("queue added", playerState.queue)
    } else {
      updateState({
        url: `https://www.youtube.com/watch?v=${id}`,
        played: 0,
        loaded: 0,
        pip: false,
        playing: true,
        currentSong: trackName,
        currentArtist: artistName,
      })
    }
  }

  function setQueue(tracks) {
    let queue = tracks.map(({ artist, name }) => {
      return { artist: artist.strArtist, track: name }
    })
    updateState({ queue: queue })
    console.log("queue added", playerState.queue)
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
  function handlePause() {
    console.log("handlePause")
    updateState({ playing: false })
  }

  function handlePlayPause() {
    console.log(playerState.playing)
    if (!playerState.url) {
      return
    }
    console.log("pausing...")
    updateState({ playing: !playerState.playing })
  }

  function handleEnded() {
    console.log("song ended")

    updateState({ playing: false })
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
    handlePause,
    setQueue,
    playTrackAndSetQueue,
  }
}

export default useMusicPlayer
