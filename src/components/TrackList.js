import React, { useEffect, useState } from "react"
import useApi from "../components/hooks/useApi"
import useMusicPlayer from "./hooks/useMusicPlayer"
import LyricsModal from "./LyricsModal"
import TrackItem from "../components/TrackItem"

const TrackList = ({ artistName }) => {
  const { isLoading, isError, getTopTracksByArtistName, getVideoId } = useApi()
  const [tracks, setTracks] = useState()
  const [lyrics, setLyrics] = useState({
    lyrics: "",
    trackName: "",
  })
  const {
    playerState,
    playTrack,
    setQueue,
    playTrackAndSetQueue,
  } = useMusicPlayer()

  useEffect(() => {
    getTopTracksByArtistName(artistName).then(data => {
      console.log("async received: ", data)
      if (!isError && data) {
        console.log("tracks", data)
        setTracks(data)
      }
    })
  }, [artistName])

  const handleClick = (artistName, trackName, e) => {
    e.stopPropagation()
    getVideoId(decodeURIComponent(`${artistName} ${trackName}`)).then(
      videoId => {
        playTrackAndSetQueue(videoId, trackName, artistName, tracks && tracks)
      }
    )
  }

  return (
    <div className="tracklist-container">
      <div className="tracklist">
        {tracks &&
          tracks.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <TrackItem
                  artistName={artistName}
                  trackName={item.name}
                  playcount={item.playcount}
                  trackNumber={index + 1}
                  onClick={e => handleClick(artistName, item.name, e)}
                  setLyrics={setLyrics}
                  isPlaying={
                    playerState.currentSong === item.name ? true : false
                  }
                ></TrackItem>
              </React.Fragment>
            )
          })}
      </div>
      {lyrics.lyrics && (
        <LyricsModal trackName={lyrics.trackName} setLyrics={setLyrics}>
          {lyrics.lyrics}
        </LyricsModal>
      )}
    </div>
  )
}

export default TrackList
