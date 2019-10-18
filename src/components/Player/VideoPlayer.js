import useMusicPlayer from "../hooks/useMusicPlayer"
import ReactPlayer from "react-player"
import React, { useEffect, memo } from "react"
import useLayoutOptions from "../hooks/useLayoutOptions"

const VideoPlayer = memo(({ playerRef }) => {
  const {
    playerState,
    handleProgress,
    handleDuration,
    handlePlay,
    handleEnded,
    handlePause,
    playNext,
  } = useMusicPlayer()

  const { layoutState } = useLayoutOptions()

  const onEnded = () => {
    handleEnded()
    playNext()
  }
  let className = "--fixed"
  if (layoutState.videoPosition.hidden) {
    className = "--docked --hidden"
  }
  if (layoutState.videoPosition.docked) {
    className = "--docked"
  }

  const handleError = () => {
    handleEnded()
    playNext()
  }

  useEffect(() => {
    if (playerState.played) {
      playerRef.current && playerRef.current.seekTo(playerState.played)
    }
    return () => {
      handlePause()
    }
  }, [])

  return (
    <React.Fragment>
      <ReactPlayer
        url={playerState.url}
        playing={playerState.playing}
        volume={playerState.volume}
        muted={playerState.muted}
        pip={playerState.pip}
        controls
        ref={playerRef}
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={onEnded}
        onError={handleError}
        className={`video-player ${className}`}
      />
    </React.Fragment>
  )
})

export default VideoPlayer
