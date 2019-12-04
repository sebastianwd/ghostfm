import React, { useEffect } from "react"
import { Router as ReachRouter } from "@reach/router"
import Playlist from "../modules/playlist"

const PlaylistPage = () => {
  return (
    <React.Fragment>
      <ReachRouter>
        <Playlist path="playlist/:id"></Playlist>
      </ReachRouter>
    </React.Fragment>
  )
}

export default PlaylistPage
