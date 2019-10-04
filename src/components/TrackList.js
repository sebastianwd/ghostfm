import React, { useEffect, useState } from "react"
import useApi from "../components/hooks/useApi"
import useMusicPlayer from "./hooks/useMusicPlayer"
import usePortal from "react-useportal"
import LyricsModal from "./LyricsModal"

const TrackList = ({ artistName }) => {
  const {
    isLoading,
    isError,
    getTopTracksByArtistName,
    getVideoId,
    getLyrics,
  } = useApi()
  const [tracks, setTracks] = useState()
  const [lyrics, setLyrics] = useState()
  const { playTrack, setQueue, playTrackAndSetQueue } = useMusicPlayer()
  const { Portal } = usePortal()

  useEffect(() => {
    getTopTracksByArtistName(artistName).then(data => {
      console.log("async received: ", data)
      if (!isError && data) {
        console.log("tracks", data)
        setTracks(data)
      }
    })
  }, [artistName])

  const handleClick = (artistName, trackName) => {
    getVideoId(decodeURIComponent(`${artistName} ${trackName}`)).then(
      videoId => {
        playTrackAndSetQueue(videoId, trackName, artistName, tracks && tracks)
      }
    )
  }

  const showLyrics = (e, artistName, trackName) => {
    e.stopPropagation()
    getLyrics(artistName, trackName).then(lyrics => {
      setLyrics(lyrics)
    })
  }

  return (
    <div className="tracklist-container">
      <div className="tracklist">
        {tracks &&
          tracks.map((item, index) => {
            return (
              <div
                key={index}
                className="track"
                onClick={() => handleClick(artistName, item.name)}
              >
                <span className="track__number">{index + 1}</span>
                <span className="track__name">
                  {decodeURIComponent(item.name)}
                </span>
                <span className="track__playcount">{item.playcount}</span>
                <span
                  className="track__lyrics"
                  onClick={e => showLyrics(e, artistName, item.name)}
                >
                  <i className="fa fa-lg fa-align-right"></i>
                </span>
              </div>
            )
          })}
      </div>
      {lyrics && (
        <Portal>
          <LyricsModal>{lyrics} </LyricsModal>
        </Portal>
      )}
    </div>
  )
}

export default TrackList
