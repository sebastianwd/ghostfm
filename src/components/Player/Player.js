import React, { useRef, useState, useEffect } from "react"
import ReactPlayer from "react-player"
import Duration from "../utils/Duration"
import Controls from "./Controls"
import useMusicPlayer from "../hooks/useMusicPlayer"
import Nouislider from "nouislider-react"

const Player = () => {
  const {
    playlistState,
    playerState,
    handleProgress,
    handleDuration,
    handleSeekMouseUp,
    handleSeekChange,
    handleSeekMouseDown,
    handlePlay,
    handleEnded,
    handlePause,
    playTrack,
    playNext,
  } = useMusicPlayer()

  const playerRef = useRef()

  const sliderRef = useRef()

  const handleSeekMouseUpLocal = values => {
    handleSeekMouseUp()
    if (sliderRef.current && sliderRef.current.noUiSlider) {
      sliderRef.current.noUiSlider.set(values[0])
    }
    playerRef.current && playerRef.current.seekTo(values[0])
  }

  const handleEndedLocal = () => {
    handleEnded()
    playNext()
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
        <Nouislider
          instanceRef={instance => {
            if (!sliderRef.current) {
              sliderRef.current = instance
            }
          }}
          start={playerState.played}
          connect={[true, false]}
          range={{
            min: 0,
            max: 1,
          }}
          onSlide={handleSeekMouseDown}
          onChange={values => {
            handleSeekChange(values[0])
            handleSeekMouseUpLocal(values)
          }}
          style={{ width: "100%" }}
        />
      </div>
      <div className="player-wrapper__inner">
        <div className="player">
          <div className="player__controls--left">
            <div className="player__thumbnail">
              <div className="icon">
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
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
              {playlistState.current.image && (
                <div
                  className="player__thumbnail__inner"
                  style={{
                    backgroundImage: `url(${playlistState.current.image ||
                      "https://i.imgur.com/op68DON.jpg"})`,
                  }}
                ></div>
              )}
            </div>
            <div className="track-info ellipsis-one-line">
              <div className="track-info__track ellipsis-one-line">
                {playlistState.current.track}
              </div>
              <div className="track-info__artist ellipsis-one-line mt-1">
                {playlistState.current.artist}
              </div>
            </div>
          </div>
          <div className="player__controls--middle flex-column">
            <div className="main-controls">
              <Controls playerRef={playerRef}></Controls>
            </div>
          </div>
          <div className="player__controls--right">
            <i className="fa fa-volume-up" />
            <div className="controls__volume d-none d-md-block"></div>
            <i className="fa fa-list-ol" />
            <i className="fab fa-react d-none d-md-block" />
            <div style={{ fontSize: "8px" }} className=" mt-1">
              <Duration seconds={playerState.duration * playerState.played} />
              &ensp;-&ensp;
              <Duration seconds={playerState.duration} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Player
