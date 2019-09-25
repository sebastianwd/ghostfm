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
        <div className="square square-1" />
        <div className="square square-2" />
        <div className="square square-3" />
        <div className="square square-4" />
        <div className="square square-5" />
        <div className="square square-6" />
        <div className="square square-7" />
        <main className="mh-100vh" style={{ zIndex: "1" }}>
          <Header siteTitle={data.site.siteMetadata.title} />
          {children}
          <footer></footer>
          <Player></Player>
        </main>
      </div>
    </MusicPlayerProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
