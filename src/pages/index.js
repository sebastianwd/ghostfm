import React, { useRef, useContext } from "react"
import { Link } from "gatsby"
import Image from "../components/image"
import SEO from "../components/seo"

import Search from "../components/Search"

const IndexPage = () => {
  return (
    <React.Fragment>
      <SEO title="Home" />
      <div className="section-home section--full-height">
        <div className="container-fluid container-home">
          <div className="d-flex align-items-center justify-content-center mt-lg-4">
            <Search></Search>
          </div>
          <div className="heading-container text-left h-50 col-md-6 margin-top-10">
            <h1 className="heading-primary">
              Descubre nueva música y escucha a tus artistas favoritos
            </h1>
            <p className="text-primary w-75">
              Disfruta de música ilimitada, encuentra artistas similares,
              letras, descargas y más!
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default IndexPage
