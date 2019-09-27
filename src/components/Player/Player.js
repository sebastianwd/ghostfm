import React, { useContext, useRef } from "react"
import ReactPlayer from "react-player"
import { MusicPlayerContext } from "../_context/MusicPlayerContext"
import useMusicPlayer from "../hooks/useMusicPlayer"

import Duration from "../utils/Duration"

import Controls from "./Controls"

const Player = () => {
  const {
    playerState,
    handleProgress,
    handleDuration,
    handleSeekMouseUp,
    handleSeekChange,
    handleSeekMouseDown,
    handlePlay,
    handleEnded,
    handlePause,
  } = useMusicPlayer()

  const playerRef = useRef()

  const handleSeekMouseUpLocal = e => {
    let target = e.target
    handleSeekMouseUp()
    playerRef.current.seekTo(parseFloat(target.value))
  }

  return (
    <div>
      <div className="w-50">
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
          onEnded={handleEnded}
        />
      </div>
      <div className="index_av__background__3hOvd">
        <div className="index_av__container__1nzKQ">
          <div className="index_av__playback__u58Ue">
            <div className="index_icons__MkQjN">
              <Controls playerRef={playerRef}></Controls>
            </div>
            <div />
          </div>
          <div className="index_progress__container__ngzSQ">
            <div className="index_progress__1xtJx">
              <div className="index_progress__currentTime__3ltXz">
                <Duration seconds={playerState.duration * playerState.played} />
              </div>
              <div className="index_progress__bar__1D-aE">
                <input
                  min={0}
                  max={1}
                  step="any"
                  value={playerState.played}
                  onMouseDown={handleSeekMouseDown}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekMouseUpLocal}
                  type="range"
                  className="index_progress__bar__percent__o52rO"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="index_progress__songDuration__nLySu">
                <Duration seconds={playerState.duration} />
              </div>
            </div>
          </div>
          {playerState.artistName && (
            <div className="index_meta__ilh_B">
              <div className="index_meta__img__4jOGx">
                <img
                  src={playerState.thumbnailUrl}
                  alt={playerState.artistName}
                />
              </div>
              <div className="index_meta__tags__31gB2">
                <span className="index_meta__tags__title__2pPO5">
                  On The Offensive
                </span>
                <span className="index_meta__tags__artist__1BdKF">
                  <span>From Autumn To Ashes</span>
                </span>
              </div>
            </div>
          )}
          <div className="index_media__toggles__2sLLn">
            <div className="index_volume__slider__mTWbJ">
              <i className="fa fa-volume-up" />
            </div>
            <i
              className="fa fa-list-ol"
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <i
              className="fab fa-react"
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
