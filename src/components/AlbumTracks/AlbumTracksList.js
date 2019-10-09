import React, { useState, useEffect } from "react"
import useApi from "../hooks/useApi"
import Image from "../../components/image"
import TrackItem from "../TrackItem"
import LyricsModal from "../LyricsModal"
import useMusicPlayer from "../hooks/useMusicPlayer"

function ShowAlbumTracksList({ album, artistName, closeAlbumInfo }) {
  console.log("album1 ", album)
  return (
    <AlbumTracksList
      artistName={artistName}
      album={album}
      closeAlbumInfo={closeAlbumInfo}
    ></AlbumTracksList>
  )
}

const AlbumTracksList = ({ artistName, album, closeAlbumInfo }) => {
  const { isLoading, isError, getAlbumInfo, getVideoId } = useApi()

  const { playerState, playTrackAndSetQueue } = useMusicPlayer()
  const [albumInfo, setAlbumInfo] = useState()
  const [lyrics, setLyrics] = useState({
    lyrics: "",
    trackName: "",
  })

  useEffect(() => {
    getAlbumInfo(artistName, album.strAlbum).then(albumInfo => {
      setAlbumInfo(albumInfo)
    })
  }, [artistName, album])

  const handleClick = (artistName, trackName) => {
    getVideoId(decodeURIComponent(`${artistName} ${trackName}`)).then(
      videoId => {
        playTrackAndSetQueue(
          videoId,
          trackName,
          artistName,
          albumInfo.tracks.track && albumInfo.tracks.track
        )
      }
    )
  }
  console.log("album", album)

  return (
    <div className="album-info-container p-2  pt-4">
      <button onClick={closeAlbumInfo}>Regresar</button>
      {albumInfo && (
        <React.Fragment>
          <div className="d-flex album-info-container__inner">
            <div className="album-info ">
              <div className="album__image">
                {album.strAlbumThumb && (
                  <div
                    className="album__image__inner"
                    style={{
                      backgroundImage: `url(${album.strAlbumThumb})`,
                    }}
                  ></div>
                )}
                {!album.strAlbumThumb && (
                  <Image
                    filename="album-art-placeholder.png"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
              </div>
              <p className="album-description">{album.strDescriptionEN}</p>
            </div>
            <div className="album-tracks">
              {albumInfo.tracks &&
                albumInfo.tracks.track.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <TrackItem
                        artistName={artistName}
                        trackName={item.name}
                        trackNumber={index + 1}
                        onClick={() => handleClick(artistName, item.name)}
                        setLyrics={setLyrics}
                        isPlaying={
                          playerState.currentSong === item.name ? true : false
                        }
                      ></TrackItem>
                    </React.Fragment>
                  )
                })}
            </div>
          </div>
          {lyrics.lyrics && (
            <LyricsModal trackName={lyrics.trackName} setLyrics={setLyrics}>
              {lyrics.lyrics}
            </LyricsModal>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default ShowAlbumTracksList
