import React from "react"
import useApi from "../components/hooks/useApi"

const TrackItem = ({
  artistName,
  trackName,
  trackNumber,
  playcount,
  onClick,
  setLyrics,
  isPlaying = "",
  isLoading = "",
}) => {
  const { isError, getLyrics } = useApi()

  const showLyrics = e => {
    e.stopPropagation()
    getLyrics(artistName, trackName).then(lyrics => {
      setLyrics({ lyrics, trackName })
    })
  }

  return (
    <div className={`track ${isPlaying && `playing`}`} onClick={onClick}>
      <span className="track__number">{trackNumber}</span>
      <span className="track__play">
        <i className="fa  fa-play"></i>
      </span>
      {isLoading && (
        <span className="track__loading">
          <i className="fas  fa-circle-notch fa-spin"></i>
        </span>
      )}
      <span className="track__name">{decodeURIComponent(trackName)}</span>
      <span className="track__playcount">{playcount || ""}</span>
      <span className="track__lyrics" onClick={showLyrics}>
        <i className="fa fa-lg fa-align-right"></i>
      </span>
    </div>
  )
}

export default TrackItem
