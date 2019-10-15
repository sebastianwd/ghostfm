import React, { useRef } from "react"

const MusicPlayerContext = React.createContext(null)

const MusicPlayerProvider = props => {
  const playerRef = useRef()

  return (
    <MusicPlayerContext.Provider value={playerRef}>
      {props.children}
    </MusicPlayerContext.Provider>
  )
}

export { MusicPlayerContext, MusicPlayerProvider }
