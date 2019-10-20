import { useState } from "react"
import axios from "axios"

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // https://ghostfm.herokuapp.com/
  const BASE_URL = "http://localhost:8081/"

  const fetchData = async (endpoint, params) => {
    setIsError(false)
    setIsLoading(true)
    try {
      console.log("useApi", "fetching: " + BASE_URL + endpoint)
      const result = await axios({
        method: "GET",
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
  const postData = async (endpoint, data, withCredentials = false) => {
    setIsError(false)
    setIsLoading(true)
    try {
      console.log("useApi", "post: " + BASE_URL + endpoint)
      const result = await axios({
        method: "POST",
        url: `${BASE_URL}${endpoint}`,
        data: data,
        withCredentials: withCredentials,
      })
      setIsLoading(false)
      return result.data
    } catch (error) {
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

  async function getAlbumsByArtistName(artistName) {
    console.log(artistName)
    let data = await fetchData("artist/albums", {
      name: artistName,
    })
    return data
  }
  async function logIn({ givenName, name, email }, isGoogle = 0) {
    let data = await postData(
      "login",
      {
        username: givenName,
        name,
        email,
        isGoogle,
      },
      true
    )
    return data
  }
  async function registerUser({ givenName, name, email }, isGoogle = 0) {
    let data = await postData(
      "register",
      {
        username: givenName,
        name,
        email,
        isGoogle,
      },
      true
    )
    return data
  }
  async function getUserPlaylists() {
    let data = await postData("user/playlist", {}, true)
    return data
  }

  async function getAlbumInfo(artistName, albumName) {
    console.log("fetching album", albumName)
    let data = await fetchData("album", {
      artistName: artistName,
      albumName: albumName,
    })
    return data
  }

  return {
    getUserPlaylists,
    logIn,
    registerUser,
    isLoading,
    isError,
    getArtistByName,
    getTopTracksByArtistName,
    getVideoId,
    getLyrics,
    searchAutocomplete,
    getSimilarByArtistName,
    getAlbumsByArtistName,
    getAlbumInfo,
  }
}

export default useApi
