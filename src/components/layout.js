/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Player from "./Player/Player"

import { MusicPlayerProvider } from "../components/_context/MusicPlayerContext"

import blob from "../images/blob.png"
import path2 from "../images/path2.png"

import "../styles/index.scss"

import Header from "./header"

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

  return (
    <MusicPlayerProvider>
      <div className="page-wrapper">
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
        <div className="player-wrapper">
          <Player></Player>
        </div>
      </div>
    </MusicPlayerProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
