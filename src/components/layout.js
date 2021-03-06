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
import useSession from "./hooks/useSession"
import Authenticate from "./User/Authenticate"
import Nav from "./Nav"
import { PlaylistModal } from "../components/shared/PlaylistModal"
import useLayoutOptions from "./hooks/useLayoutOptions"
import { toast } from "react-toastify"

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

  toast.configure()

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
          <PlaylistModal></PlaylistModal>
        </Authenticate>
      </StoreProvider>
    </MusicPlayerProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
