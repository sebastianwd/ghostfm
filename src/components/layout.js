/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import Player from "./Player/Player"
import Header from "./header"
import { StoreProvider } from "easy-peasy"
import store from "../components/state/store"

import "../styles/index.scss"
import { MusicPlayerProvider } from "./_context/MusicPlayerContext"
import Image from "./image"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const sidebarRef = useRef()
  const layoutRef = useRef()

  const handleChange = () => {
    sidebarRef.current.classList.toggle("--is-open")
    layoutRef.current.classList.toggle("--sidebar-is-closed")
  }

  return (
    <MusicPlayerProvider>
      <StoreProvider store={store}>
        <div className="page-wrapper" ref={layoutRef}>
          <Header
            siteTitle={data.site.siteMetadata.title}
            sidebarRef={sidebarRef}
          />
          <nav className="navbar">
            <div className="navbar__inner">
              <div className="logo mr-4">
                <Link to="/" className="logo__image">
                  <Image
                    alt="Ghostfm Logo"
                    filename="logo.png"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: "-99",
                    }}
                  />
                </Link>
                <Link to="/" className="logo__brand">
                  <div className="glitch ml-2" data-text="GhostFM">
                    GhostFM
                  </div>
                </Link>
              </div>
              <div className="d-flex align-items-center ">
                <div className="burger-container">
                  <input
                    type="checkbox"
                    className="burger"
                    onChange={handleChange}
                  />
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </nav>
          <main>{children}</main>
          <div className="player-wrapper">
            <Player></Player>
          </div>
        </div>
      </StoreProvider>
    </MusicPlayerProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
