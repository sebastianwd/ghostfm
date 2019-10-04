import React from "react"
import useMusicPlayer from "../hooks/useMusicPlayer"

const Controls = ({ playerRef }) => {
  const { playerState, handlePlayPause } = useMusicPlayer()

  const playIcon = playerState.playing ? `fa-pause-circle ` : `fa-play-circle`

  return (
    <React.Fragment>
      <i className="fa fa-random" />
      <i className="fa fa-step-backward" />
      <i onClick={handlePlayPause} className={`fa ${playIcon} fa-2x`} />
      <i className="fa fa-step-forward" />
      <i
        className="fa fa-redo d-none d-md-block"
        onClick={() => playerRef.current.seekTo(parseFloat(0.0))}
      />
    </React.Fragment>
  )
}

export default Controls
