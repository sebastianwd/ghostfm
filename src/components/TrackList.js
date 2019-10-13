import React, { useEffect, useState } from "react"
import useApi from "../components/hooks/useApi"
import LyricsModal from "./LyricsModal"
import TrackItem from "../components/TrackItem"
import { useStoreActions, useStoreState } from "easy-peasy"

const TrackList = ({ artistName }) => {
  const { isLoading, isError, getTopTracksByArtistName } = useApi()
  const [tracks, setTracks] = useState()

  useEffect(() => {
    getTopTracksByArtistName(artistName).then(data => {
      if (!isError && data) {
        setTracks(data)
      }
    })
  }, [artistName])

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
                  tracks={tracks}
                ></TrackItem>
              </React.Fragment>
            )
          })}
      </div>
    </div>
  )
}

export default TrackList
