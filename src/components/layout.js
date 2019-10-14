/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React, { useRef } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Player from "./Player/Player"
import Header from "./header"
import { StoreProvider } from "easy-peasy"
import store from "../components/state/store"

import "../styles/index.scss"

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
    sidebarRef.current.classList.toggle("--is-closed")
    layoutRef.current.classList.toggle("--sidebar-is-closed")
  }

  return (
    <StoreProvider store={store}>
      <div className="page-wrapper" ref={layoutRef}>
        <Header
          siteTitle={data.site.siteMetadata.title}
          sidebarRef={sidebarRef}
        />
        <main>
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
          {children}
        </main>
        <div className="player-wrapper">
          <Player></Player>
        </div>
      </div>
    </StoreProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
