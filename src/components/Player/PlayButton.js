import React, { useContext } from "react"
import { MusicPlayerContext } from "../_context/MusicPlayerContext"

const PlayButton = () => {
  const [state, setState] = useContext(MusicPlayerContext)

  return (
    <button onClick={() => setState(state => ({ ...state, name: "Clicked!" }))}>
      {state.name}
    </button>
  )
}

export default PlayButton
