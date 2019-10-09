import React from "react"
import SEO from "../components/seo"

import Search from "../components/Search"
import landingImage from "../images/iconfinder_music-melody-sound-audio-50_4083819.svg"

const IndexPage = () => {
  return (
    <React.Fragment>
      <SEO title="Home" />
      <div className="section-home section--full-height">
        <div className="container-fluid container-home">
          <div className="d-flex align-items-center justify-content-center mt-lg-4">
            <Search></Search>
          </div>
          <div className="row">
            <div className="heading-container text-left h-50 col-md-6 margin-top-10">
              <h1 className="heading-primary fade-in-left">
                Descubre nueva música y escucha a tus artistas favoritos
              </h1>
              <p className="text-primary w-75 animated fadeIn">
                Disfruta de música ilimitada, encuentra artistas similares,
                letras, descargas y más!
              </p>
            </div>
            <div className="col-md-6 landing-image-container">
              <div className="landing-image"></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default IndexPage
