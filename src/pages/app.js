import React, { useEffect } from "react"
import Artist from "./artist"
import { Router as ReachRouter } from "@reach/router"

const Router = () => {
  return (
    <ReachRouter>
      <Artist path="app/artist/:name"></Artist>
    </ReachRouter>
  )
}

export default Router
