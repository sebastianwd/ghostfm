import React, { useRef, useContext, useState } from "react"

import useMusicPlayer from "./hooks/useMusicPlayer"
import axios from "axios"
import { navigate } from "gatsby"
import useApi from "../components/hooks/useApi"
import Dropdown from "../components/Dropdown"

const Search = () => {
  const searchRef = useRef()
  const { playTrack } = useMusicPlayer()
  const { isLoading, isError, getArtistByName, searchAutocomplete } = useApi()
  const [results, setResults] = useState([])

  const handleClick = () => {
    getArtistByName(searchRef.current.value).then(data => {
      console.log("async received: ", data)
      if (!isError && data) {
        navigate("/artist/" + searchRef.current.value, {
          state: data,
        })
      }
    })
  }

  const handleChange = () => {
    if (searchRef.current.value !== "") {
      setTimeout(() => {
        searchAutocomplete(searchRef.current.value).then(results => {
          setResults(results)
        })
      }, 300)
    } else {
      setTimeout(() => {
        setResults([])
      }, 500)
    }
  }

  const triggerSearch = query => {
    setResults([])
    searchRef.current.value = query
    handleClick()
  }

  return (
    <React.Fragment>
      <div style={{ position: "relative" }}>
        <input
          ref={searchRef}
          type="text"
          className="input--primary"
          placeholder="Buscar"
          onChange={handleChange}
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
        <Dropdown items={results} triggerSearch={triggerSearch}></Dropdown>
      </div>
    </React.Fragment>
  )
}

export default Search
