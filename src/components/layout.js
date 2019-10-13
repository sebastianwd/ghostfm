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

  return (
    <StoreProvider store={store}>
      <div className="page-wrapper">
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
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
