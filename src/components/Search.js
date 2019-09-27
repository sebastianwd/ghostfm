import React, { useRef, useContext } from "react"

import useMusicPlayer from "./hooks/useMusicPlayer"
import axios from "axios"
import { navigate } from "gatsby"
import useApi from "../components/hooks/useApi"

const Search = () => {
  const searchRef = useRef()
  const { playTrack } = useMusicPlayer()
  const [{ isLoading, isError }, getArtistByName] = useApi()

  const handleClick = () => {
    getArtistByName(searchRef.current.value).then(data => {
      console.log("async received: ", data)
      if (!isError && data) {
        navigate("/app/artist/" + searchRef.current.value, {
          state: data,
        })
      }
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
        &nbsp;
        {isLoading ? (
          <i className="fa fa-spinner fa-spin"></i>
        ) : (
          <i className="fa fa-search"></i>
        )}
      </button>
    </React.Fragment>
  )
}

export default Search
