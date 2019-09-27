import React, { useEffect } from "react"
import Artist from "../modules/artist"
import { Router as ReachRouter } from "@reach/router"

const ArtistPage = () => {
  return (
    <ReachRouter>
      <Artist path="artist/:name"></Artist>
    </ReachRouter>
  )
}

export default ArtistPage
