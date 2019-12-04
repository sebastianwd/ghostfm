import React, { useRef } from "react"
import useApi from "../hooks/useApi"

import { Playlist } from "./classes/Playlist"

export const NewPlaylist = ({ onSubmit }) => {
  const { addPlaylist } = useApi()
  const inputRef = useRef()

  const handleClick = async () => {
    const playlistName = inputRef.current.value
    const playlist = await addPlaylist(new Playlist(playlistName, 0))
    onSubmit()
  }

  return (
    <div style={{ position: "relative" }} className="d-flex align-items-center">
      <input className="h-100 input--newplaylist" ref={inputRef} />
      <button onClick={handleClick} className="button button--highlight h-100">
        Crear playlist
      </button>
    </div>
  )
}
