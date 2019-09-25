import React, { useRef, useContext } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import Search from "../components/Search"

import "../styles/index.scss"

const IndexPage = () => {
  return (
    <React.Fragment>
      <SEO title="Home" />
      <div className="container container--index">
        <div className="w-100">
          <div className="heading-container text-center h-50 col-md-12">
            <h1 className="heading-primary">
              Descubre nueva música y escucha a tus artistas favoritos
            </h1>
            <p className="w-50 m0-auto">
              {" "}
              Disfruta de música ilimitada, encuentra artistas similares,
              letras, descargas y más!
            </p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center mt-lg-5 mt-4">
            <div>
              <Search></Search>
            </div>
            <Link to="/artist/">page 2</Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default IndexPage
