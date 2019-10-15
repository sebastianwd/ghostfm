/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Player from "./Player/Player"
import Header from "./header"
import { StoreProvider } from "easy-peasy"
import store from "../components/state/store"

import "../styles/index.scss"
import { MusicPlayerProvider } from "./_context/MusicPlayerContext"

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
              <div className="burger-container">
                <div className="burger-container__inner">
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
