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
              <div class="icon">
                <svg
                  width="30"
                  height="31"
                  viewBox="0 0 80 81"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Playlist Icon</title>
                  <path
                    d="M25.6 11.565v45.38c-2.643-3.27-6.68-5.37-11.2-5.37-7.94 0-14.4 6.46-14.4 14.4s6.46 14.4 14.4 14.4 14.4-6.46 14.4-14.4v-51.82l48-10.205V47.2c-2.642-3.27-6.678-5.37-11.2-5.37-7.94 0-14.4 6.46-14.4 14.4s6.46 14.4 14.4 14.4S80 64.17 80 56.23V0L25.6 11.565zm-11.2 65.61c-6.176 0-11.2-5.025-11.2-11.2 0-6.177 5.024-11.2 11.2-11.2 6.176 0 11.2 5.023 11.2 11.2 0 6.174-5.026 11.2-11.2 11.2zm51.2-9.745c-6.176 0-11.2-5.024-11.2-11.2 0-6.174 5.024-11.2 11.2-11.2 6.176 0 11.2 5.026 11.2 11.2 0 6.178-5.026 11.2-11.2 11.2z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
              {playerState.thumbnailUrl && (
                <div
                  className="player__thumbnail__inner"
                  style={{
                    backgroundImage: `url(${playerState.thumbnailUrl ||
                      "https://i.imgur.com/op68DON.jpg"})`,
                  }}
                ></div>
              )}
            </div>
            <div className="track-info ellipsis-one-line">
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
