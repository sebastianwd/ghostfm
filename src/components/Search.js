import React, { useRef, useContext } from "react"

import useMusicPlayer from "./hooks/useMusicPlayer"
import axios from "axios"

const Search = () => {
  const searchRef = useRef()
  const { playTrack } = useMusicPlayer()

  const handleClick = () => {
    console.log(`Searching ${searchRef.current.value}...`)
    axios({
      method: "get",
      url: "http://localhost:8081/youtubeid",
      params: {
        query: searchRef.current.value,
      },
    }).then(response => {
      playTrack(response.data)
    })
  }

  return (
    <React.Fragment>
      <input
        ref={searchRef}
        type="text"
        className="input--primary"
        placeholder="Buscar"
      />
      <button
        onClick={handleClick}
        type="button"
        className="btn btn--inside btn--info"
      >
        &nbsp;<i className="fa fa-search"></i>
      </button>
    </React.Fragment>
  )
}

export default Search
