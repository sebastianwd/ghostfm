import React, { useEffect, useState, useContext } from "react"
import SEO from "../components/seo"
import useApi from "../components/hooks/useApi"
import TrackList from "../components/TrackList"
import SimilarArtist from "../components/SimilarArtist"
import { Tab, Tabs, TabList } from "react-tabs"
import LazyTabPanel from "../components/Tabs/LazyTabPanel"
import AlbumList from "../components/Album/AlbumList"
import VideoPlayer from "../components/Player/VideoPlayer"
import useLayoutOptions from "../components/hooks/useLayoutOptions"
import { MusicPlayerContext } from "../components/_context/MusicPlayerContext"
import Image from "../components/image"
import PlaylistTrackList from "../components/PlaylistTrackList"

const Playlist = ({ location, id }) => {
  const { isLoading, getUserPlaylistsSongs } = useApi()
  const [playlistInfo, setPlaylistInfo] = useState(null)
  const { layoutState } = useLayoutOptions()
  const playerRef = useContext(MusicPlayerContext)
  useEffect(() => {
    let playlistId
    if (!location.state || !location.state.id) {
      playlistId = id
    } else {
      playlistId = location.state.id
    }
    getUserPlaylistsSongs(playlistId).then(data => {
      if (data) {
        data.songs.map(item => {
          item.artist = {
            strArtist: item.artistname,
          }

          item.name = item.title
          return item
        })
        setPlaylistInfo(data)
      }
    })
  }, [id, location.state])

  return (
    <div className="section-artist pl-md-4 container-fluid">
      {playlistInfo && <SEO title={"Playlist " + playlistInfo.name}></SEO>}
      <div className="row">
        {playlistInfo && (
          <React.Fragment>
            <div
              className="col-12 col-md-7 col-lg-7 p-4"
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h3 style={{ minWidth: "20%" }}> {playlistInfo.name || ""}</h3>
              <div className="artist-card__image ml-5">
                <img src={playlistInfo.image}></img>
              </div>
            </div>
          </React.Fragment>
        )}

        <div className="col-12 col-md-5 col-lg-5">
          {!layoutState.videoPosition.fixed && (
            <div className="video-container">
              <VideoPlayer playerRef={playerRef}></VideoPlayer>
            </div>
          )}
        </div>
      </div>
      {playlistInfo && (
        <div className="col-12 col-md-7 col-lg-7">
          <PlaylistTrackList trackList={playlistInfo.songs}></PlaylistTrackList>
        </div>
      )}
    </div>
  )
}

export default Playlist
