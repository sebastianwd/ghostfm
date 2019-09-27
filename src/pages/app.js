import React, { useEffect } from "react"
import Artist from "../modules/artist"
import { Router as ReachRouter } from "@reach/router"

const AppPage = () => {
  return (
    <ReachRouter>
      <Artist path="app/artist/:name"></Artist>
    </ReachRouter>
  )
}

export default AppPage
