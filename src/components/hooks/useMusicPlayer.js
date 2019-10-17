import { useStoreActions, useStoreState, useStore } from "easy-peasy"
import useApi from "./useApi"

const useMusicPlayer = () => {
  const { getVideoId } = useApi()

  const store = useStore()
  const playerState = useStoreState(state => state.player)
  const playlistState = useStoreState(state => state.playlist)

  const playTrack = useStoreActions(actions => actions.player.playTrack)
  const handleProgress = useStoreActions(
    actions => actions.player.handleProgress
  )
  const handleDuration = useStoreActions(
    actions => actions.player.handleDuration
  )
  const handleSeekMouseUp = useStoreActions(
    actions => actions.player.handleSeekMouseUp
  )
  const handleSeekChange = useStoreActions(
    actions => actions.player.handleSeekChange
  )
  const handleSeekMouseDown = useStoreActions(
    actions => actions.player.handleSeekMouseDown
  )
  const handlePlay = useStoreActions(actions => actions.player.handlePlay)
  const handlePause = useStoreActions(actions => actions.player.handlePause)
  const handlePlayPause = useStoreActions(
    actions => actions.player.handlePlayPause
  )
  const handleEnded = useStoreActions(actions => actions.player.handleEnded)

  const setQueue = useStoreActions(actions => actions.playlist.setQueue)

  const playPrev = () => {
    let playlistState = store.getState().playlist
    let queue = playlistState.queue
    if (queue && queue.length > 0) {
      const prevTrack = playlistState.prevTrack.track
      const prevArtist = playlistState.prevTrack.artist
      getVideoId(`${prevArtist} ${prevTrack}`).then(videoId => {
        playTrack({
          videoId,
          current: { track: prevTrack, artist: prevArtist },
        })
      })
    }
  }

  const playNext = () => {
    let playlistState = store.getState().playlist
    let queue = playlistState.queue
    if (queue && queue.length > 0) {
      const nextTrack = playlistState.nextTrack.track
      const nextArtist = playlistState.nextTrack.artist
      console.log("nextArtist", nextArtist)
      console.log("nextTrack", nextTrack)

      getVideoId(`${nextArtist} ${nextTrack}`).then(videoId => {
        playTrack({
          videoId,
          current: { track: nextTrack, artist: nextArtist },
        })
      })
    }
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
    handlePause,
    handlePlayPause,
    handleEnded,
    setQueue,
    playlistState,
    playNext,
    playPrev,
  }
}

export default useMusicPlayer
