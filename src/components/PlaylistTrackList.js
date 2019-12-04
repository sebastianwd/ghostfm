import React, { useEffect, useState } from "react"
import useApi from "../components/hooks/useApi"
import TrackItem from "../components/TrackItem"
import { PlaylistModal } from "./shared/PlaylistModal"

const PlaylistTrackList = ({ trackList }) => {
  const { isLoading, isError, getUserPlaylistsSongs } = useApi()
  const [tracks, setTracks] = useState()

  useEffect(() => {
    setTracks(trackList)
  }, [trackList])

  return (
    <div className="tracklist-container">
      <div className="tracklist">
        {tracks &&
          tracks.map((item, index) => {
            return (
              <React.Fragment key={`${item.name}${index}`}>
                <TrackItem
                  artistName={item.artist.strArtist}
                  trackName={item.name}
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

export default PlaylistTrackList
