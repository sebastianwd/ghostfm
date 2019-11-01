/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link, navigate } from "gatsby"
import Player from "./Player/Player"
import Header from "./header"
import { StoreProvider } from "easy-peasy"
import store from "../components/state/store"

import "../styles/index.scss"
import { MusicPlayerProvider } from "./_context/MusicPlayerContext"
import Image from "./image"
import useSession from "./hooks/useSession"
import Authenticate from "./User/Authenticate"
import Nav from "./Nav"

import { AuthProvider } from "react-use-auth"

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
        <Authenticate>
          <div className="page-wrapper" ref={layoutRef}>
            <Header
              siteTitle={data.site.siteMetadata.title}
              sidebarRef={sidebarRef}
            />
            <Nav onChange={handleChange}></Nav>
            <main>{children}</main>
            <div className="player-wrapper">
              <Player></Player>
            </div>
          </div>
        </Authenticate>
      </StoreProvider>
    </MusicPlayerProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
