import React from "react"
import useMusicPlayer from "../hooks/useMusicPlayer"

const Controls = () => {
  const {
    handleProgress,
    handleDuration,
    handleSeekMouseUp,
    handleSeekChange,
    handleSeekMouseDown,
    handlePlay,
    handleEnded,
    handlePlayPause,
  } = useMusicPlayer()

  return (
    <React.Fragment>
      <i className="fa fa-random" />
      <i className="fa fa-step-backward" />
      <i onClick={handlePlayPause} className="fa fa-play-circle fa-2x" />
      <i className="fa fa-step-forward" />
      <i className="fa fa-redo" />
    </React.Fragment>
  )
}

export default Controls
