import React, { Fragment, useState, useEffect } from "react"
import axios from "axios"

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const BASE_URL = "https://ghostfm.herokuapp.com/"

  const fetchData = async (endpoint, params) => {
    setIsError(false)
    setIsLoading(true)
    try {
      console.log("useApi", "fetching: " + BASE_URL + endpoint)
      const result = await axios({
        method: "get",
        url: `${BASE_URL}${endpoint}`,
        params: params,
      })
      console.log("useApi", "Data received: " + JSON.stringify(result))
      setIsLoading(false)
      return result.data
    } catch (error) {
      console.log("useApi", error)
      setIsError(true)
    }
    setIsLoading(false)
  }

  async function getArtistByName(name) {
    let data = await fetchData("artist", {
      name: name,
    })

    return data
  }
  async function getTopTracksByArtistName(name) {
    let data = await fetchData("artist/toptracks", {
      name: name,
    })

    return data
  }
  async function getVideoId(trackName) {
    let data = await fetchData("youtubeid", {
      query: trackName,
    })

    return data
  }

  async function getLyrics(artistName, trackName) {
    let data = await fetchData("track/lyrics", {
      artist: artistName,
      track: trackName,
    })
    return data
  }

  async function searchAutocomplete(query, type = "artist") {
    let data = await fetchData("search", {
      query: query,
    })
    return data
  }

  async function getSimilarByArtistName(artistName) {
    let data = await fetchData("artist/similar", {
      name: artistName,
    })
    return data
  }

  return {
    isLoading,
    isError,
    getArtistByName,
    getTopTracksByArtistName,
    getVideoId,
    getLyrics,
    searchAutocomplete,
    getSimilarByArtistName,
  }
}

export default useApi
