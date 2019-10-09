import React, { useEffect, useState } from "react"
import AlbumItem from "./AlbumItem"
import useApi from "../hooks/useApi"
import ShowAlbumTracksList from "../AlbumTracks/AlbumTracksList"

const AlbumList = ({ name }) => {
  const { isLoading, isError, getAlbumsByArtistName } = useApi()
  const [albums, setAlbums] = useState()
  const [albumInfo, setShowAlbumInfo] = useState()
  useEffect(() => {
    getAlbumsByArtistName(name).then(albums => {
      setAlbums(albums)
    })
    return () => {
      setShowAlbumInfo(null)
    }
  }, [name])

  const handleClick = (album, artistName) => {
    setShowAlbumInfo({ album, artistName })
  }

  return (
    <>
      {!albumInfo && (
        <div className="albums-container p-2  pt-4">
          {isLoading && "Cargando..."}
          {isError && "Error de conexión"}
          {albums &&
            albums.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <AlbumItem
                    album={item}
                    artistName={name}
                    onClick={handleClick}
                  ></AlbumItem>
                </React.Fragment>
              )
            })}
        </div>
      )}

      {albumInfo && (
        <ShowAlbumTracksList
          artistName={albumInfo.artistName}
          album={albumInfo.album}
          closeAlbumInfo={() => setShowAlbumInfo(null)}
        ></ShowAlbumTracksList>
      )}
    </>
  )
}

export default AlbumList
