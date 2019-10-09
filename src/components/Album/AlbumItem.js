import React from "react"
import Image from "../image"

const AlbumItem = ({ album, artistName, onClick }) => {
  return (
    <React.Fragment>
      <div className="album">
        <div
          className="album__image"
          onClick={() => onClick(album, artistName)}
        >
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
          <div className="album__image__overlay">
            <i className="fa fa-play fa-lg"></i>
          </div>
        </div>
        <div className="album__title">
          <p>{album.strAlbum}</p>
        </div>
      </div>
    </React.Fragment>
  )
}
export default AlbumItem
