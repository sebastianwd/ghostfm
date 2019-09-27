import React, { useEffect } from "react"
import Artist from "../modules/artist"
import { Router as ReachRouter } from "@reach/router"

const ArtistPage = () => {
  return (
    <React.Fragment>
      <ReachRouter>
        <Artist path="artist/:name"></Artist>
      </ReachRouter>
    </React.Fragment>
  )
}

export default ArtistPage
