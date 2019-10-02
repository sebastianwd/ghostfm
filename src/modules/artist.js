import React, { useEffect, useState } from "react"
import SEO from "../components/seo"
import useApi from "../components/hooks/useApi"
import TrackList from "../components/TrackList"

const Artist = ({ location, name }) => {
  const { isLoading, getArtistByName } = useApi()
  const [infoState, setInfoState] = useState(null)

  useEffect(() => {
    if (!location.state || !location.state.idArtist) {
      getArtistByName(name).then(data => {
        if (data) {
          setInfoState(data)
          console.log("infostate", infoState)
        }
      })
    } else {
      setInfoState(location.state)
      console.log("infostate", infoState)
    }
    console.log("infostate", infoState)
  }, [])

  return (
    <div className="section-artist pl-md-4 container-fluid">
      <div className="row">
        {infoState && (
          <div className="col-12 col-md-8">
            <div
              className="artist-card"
              style={{
                backgroundImage: `linear-gradient(
          to bottom,
          #0a0a0a7a,
          #070707fa
        ), url(${infoState.strArtistFanart})`,
              }}
            >
              <div className="artist-card__image">
                <img src={infoState.strArtistThumb}></img>
              </div>
              <div className="artist-card__info">
                <h2 className="title-primary">{infoState.strArtist}</h2>
                <ul className="artist-card__info__genres">
                  <li>{infoState.strGenre}</li>
                  <li>{infoState.strStyle}</li>
                </ul>
              </div>
              <ul className="social">
                {infoState.strFacebook && (
                  <li>
                    <a
                      href={`//${infoState.strFacebook}`}
                      target="_blank"
                      rel="noopener"
                    >
                      <i
                        className="fab fa-facebook-square"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                )}
                {infoState.strTwitter && (
                  <li>
                    <a
                      href={`//${infoState.strTwitter}`}
                      target="_blank"
                      rel="noopener"
                    >
                      <i className="fab fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                )}
                {infoState.strWebsite && (
                  <li>
                    <a
                      href={`//${infoState.strWebsite}`}
                      target="_blank"
                      rel="noopener"
                    >
                      <i className="fa fa-globe" aria-hidden="true"></i>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        <div className="col-12 col-md-4"></div>
      </div>
      {infoState && (
        <div className="row">
          <div className="col-12 col-md-8">
            <TrackList artistName={infoState.strArtist}></TrackList>
          </div>
          <div className="col-12 col-md-4"></div>
        </div>
      )}
    </div>
  )
}

export default Artist
