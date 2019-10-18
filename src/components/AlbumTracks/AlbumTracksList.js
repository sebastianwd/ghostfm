import React, { useState, useEffect } from "react"
import useApi from "../hooks/useApi"
import Image from "../../components/image"
import TrackItem from "../TrackItem"
import ButtonBack from "../Buttons/ButtonBack"

function ShowAlbumTracksList({ album, artistName, closeAlbumInfo }) {
  return (
    <AlbumTracksList
      artistName={artistName}
      album={album}
      closeAlbumInfo={closeAlbumInfo}
    ></AlbumTracksList>
  )
}

const AlbumTracksList = ({ artistName, album, closeAlbumInfo }) => {
  const { isLoading, isError, getAlbumInfo } = useApi()
  const [albumInfo, setAlbumInfo] = useState()

  useEffect(() => {
    getAlbumInfo(artistName, album.strAlbum).then(albumInfo => {
      setAlbumInfo(albumInfo)
    })
  }, [artistName, album])

  return (
    <div className="album-info-container p-2  pt-4">
      <ButtonBack onClick={closeAlbumInfo}>Regresar</ButtonBack>
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
                        tracks={albumInfo.tracks.track}
                      ></TrackItem>
                    </React.Fragment>
                  )
                })}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default ShowAlbumTracksList
