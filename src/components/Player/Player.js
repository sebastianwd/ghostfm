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
    playerRef.current && playerRef.current.seekTo(parseFloat(target.value))
  }

  const handleEndedLocal = () => {
    handleEnded()
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
      {playerState.url && (
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
          className="video-player"
          style={{ position: "absolute", bottom: "50px", right: "0" }}
        />
      )}
      <div className="progress-bar">
        <input
          min={0}
          max={1}
          step="any"
          value={playerState.played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUpLocal}
          type="range"
          className="range range__played"
          style={{ width: "100%" }}
        />
      </div>
      <div className="player-wrapper__inner">
        <div className="player">
          <div className="player__controls--left">
            <div className="player__thumbnail">
              <div
                className="player__thumbnail__inner"
                style={{
                  backgroundImage: `url(${playerState.thumbnailUrl ||
                    "https://i.imgur.com/op68DON.jpg"})`,
                }}
              ></div>
            </div>
            <div className="track-info">
              <div className="track-info__track ellipsis-one-line">
                {playerState.currentSong}
              </div>
              <div className="track-info__artist ellipsis-one-line mt-1">
                {playerState.currentArtist}
              </div>
            </div>
          </div>
          <div className="player__controls--middle">
            <div className="main-controls">
              <Controls></Controls>
            </div>
          </div>
          <div className="player__controls--right">
            <div className="controls__volume d-none d-md-block">
              <i className="fa fa-volume-up" />
            </div>
            <i className="fa fa-list-ol" />
            <i className="fab fa-react d-none d-md-block" />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Player
