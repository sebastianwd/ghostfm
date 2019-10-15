import React, { useEffect, useState, useContext } from "react"
import SEO from "../components/seo"
import useApi from "../components/hooks/useApi"
import TrackList from "../components/TrackList"
import SimilarArtist from "../components/SimilarArtist"
import { Tab, Tabs, TabList } from "react-tabs"
import LazyTabPanel from "../components/Tabs/LazyTabPanel"
import "../../node_modules/react-tabs/style/react-tabs.css"
import AlbumList from "../components/Album/AlbumList"
import VideoPlayer from "../components/Player/VideoPlayer"
import useLayoutOptions from "../components/hooks/useLayoutOptions"
import { MusicPlayerContext } from "../components/_context/MusicPlayerContext"

const Artist = ({ location, name }) => {
  const { isLoading, getArtistByName } = useApi()
  const [infoState, setInfoState] = useState(null)
  const { layoutState } = useLayoutOptions()
  const playerRef = useContext(MusicPlayerContext)

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
  }, [name, location.state])

  return (
    <div className="section-artist pl-md-4 container-fluid">
      <SEO title={name}></SEO>
      <div className="row">
        {infoState && (
          <React.Fragment>
            <div className="col-12 col-md-7 col-lg-8">
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
                  <h2 className="title-primary">
                    {decodeURIComponent(infoState.strArtist)}
                  </h2>
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
                        rel="noopener noreferrer"
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
                        rel="noopener noreferrer"
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
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-globe" aria-hidden="true"></i>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </React.Fragment>
        )}

        <div className="col-12 col-md-5 col-lg-4">
          {!layoutState.videoPosition.fixed && (
            <div className="video-container">
              <VideoPlayer playerRef={playerRef}></VideoPlayer>
            </div>
          )}
        </div>
      </div>
      {infoState && (
        <div className="row">
          <div className="col-12 col-md-7 col-lg-8 mt-3">
            <Tabs>
              <TabList>
                <Tab>Canciones</Tab>
                <Tab>Álbumes</Tab>
              </TabList>

              <LazyTabPanel>
                <TrackList artistName={infoState.strArtist}></TrackList>
              </LazyTabPanel>
              <LazyTabPanel>
                <AlbumList name={infoState.strArtist}></AlbumList>
              </LazyTabPanel>
            </Tabs>
          </div>
          <div className="col-12  col-md-5 col-lg-4 similar-artists">
            <div className="similar-artists__inner ">
              <SimilarArtist artistName={infoState.strArtist}></SimilarArtist>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Artist
