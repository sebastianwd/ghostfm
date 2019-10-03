import React, { useContext, useRef } from "react"
import ReactPlayer from "react-player"
import { MusicPlayerContext } from "../_context/MusicPlayerContext"
import useMusicPlayer from "../hooks/useMusicPlayer"

import Duration from "../utils/Duration"

import Controls from "./Controls"

import useApi from "../hooks/useApi"

const Player = () => {
  const [playerState, setPlayerState] = useContext(MusicPlayerContext)

  const {
    handleProgress,
    handleDuration,
    handleSeekMouseUp,
    handleSeekChange,
    handleSeekMouseDown,
    handlePlay,
    handleEnded,
    handlePause,
    playTrack,
  } = useMusicPlayer()

  const { getVideoId } = useApi()

  const playerRef = useRef()

  const handleSeekMouseUpLocal = e => {
    let target = e.target
    handleSeekMouseUp()
    playerRef.current.seekTo(parseFloat(target.value))
  }

  const handleEndedLocal = () => {
    handleEnded()
    console.log("handleEndedLocal", playerState)
    if (playerState.queue.length > 0) {
      const currentTrackIndex = playerState.queue.findIndex(
        item => item.track === playerState.currentSong
      )
      console.log("current song ", playerState.queue[currentTrackIndex])
      console.log("next song ", playerState.queue[currentTrackIndex + 1])
      const nextTrack = playerState.queue[currentTrackIndex + 1].track
      const nextArtist = playerState.queue[currentTrackIndex + 1].artist
      getVideoId(`${nextArtist} ${nextTrack}`).then(videoId => {
        playTrack(videoId, nextTrack, nextArtist)
      })
    }
  }

  return (
    <React.Fragment>
      <div
        style={{
          position: "fixed",
          bottom: "55px",
          right: "0",
          height: "30%",
          width: "25%",
        }}
      >
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
          onEnded={handleEndedLocal}
          width="100%"
          height="100%"
        />
        <div
          className="index_av__background__3hOvd"
          style={{ position: "fixed", botton: "0", left: "0" }}
        >
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
                  <Duration
                    seconds={playerState.duration * playerState.played}
                  />
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
            {playerState.currentSong && (
              <div className="index_meta__ilh_B">
                <div className="index_meta__img__4jOGx">
                  {playerState.thumbnailUrl && (
                    <img
                      src={playerState.thumbnailUrl}
                      alt={playerState.currentSong}
                    />
                  )}
                </div>
                <div className="index_meta__tags__31gB2">
                  <span className="index_meta__tags__title__2pPO5">
                    {playerState.currentSong}
                  </span>
                  <span className="index_meta__tags__artist__1BdKF">
                    <span>{playerState.currentArtist}</span>
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
    </React.Fragment>
  )
}

export default Player
