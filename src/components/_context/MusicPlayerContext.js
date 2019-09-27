import React, { useState } from "react"

const MusicPlayerContext = React.createContext([{}, () => {}])

const updatePlayerState = (setState, newState) => {
  setState(prevState => {
    return { ...prevState, ...newState }
  })
}

const MusicPlayerProvider = props => {
  const [state, setState] = useState({
    url: null,
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    thumbnailUrl: "",
    artistName: "",
    songName: "",
    albumName: "",
  })

  return (
    <MusicPlayerContext.Provider value={[state, setState]}>
      {props.children}
    </MusicPlayerContext.Provider>
  )
}

export { MusicPlayerContext, MusicPlayerProvider, updatePlayerState }
