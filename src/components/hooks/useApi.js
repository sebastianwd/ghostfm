import { useState } from "react"
import axios from "axios"
import useSession from "./useSession"

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const { getAuthToken, getToken } = useSession()

  // https://ghostfm.herokuapp.com/
  const BASE_URL = "https://ghostfm.herokuapp.com/"

  const fetchData = async (endpoint, params, headers = null) => {
    setIsError(false)
    setIsLoading(true)
    try {
      console.log("useApi", "fetching: " + BASE_URL + endpoint)
      const result = await axios({
        method: "GET",
        url: `${BASE_URL}${endpoint}`,
        params: params,
        headers: headers && headers,
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
  const postData = async (endpoint, data, headers = null) => {
    setIsError(false)
    setIsLoading(true)
    try {
      console.log("useApi", "post: " + BASE_URL + endpoint)
      const result = await axios({
        method: "POST",
        url: `${BASE_URL}${endpoint}`,
        data: data,
        headers: headers && headers,
      })
      setIsLoading(false)
      return result
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
  async function logIn({ username, name, email }) {
    let data = await postData("log_in", {
      username,
      name,
      email,
    })
    return data
  }

  async function addPlaylist(playlist) {
    let data = await postData(
      "user/playlist",
      { ...playlist },
      {
        Authorization: getAuthToken(),
        Token: getToken(),
      }
    )
    return data
  }
  async function addToPlaylist(playlistId, song) {
    let data = await postData(
      "user/playlist/song",
      { playlistId, ...song },
      {
        Authorization: getAuthToken(),
        Token: getToken(),
      }
    )
    return data
  }

  async function getUserPlaylists() {
    let data = await fetchData(
      "user/playlist",
      {},
      {
        Authorization: getAuthToken(),
        Token: getToken(),
      }
    )
    return data
  }

  async function getUserPlaylistsSongs(playlistId) {
    let data = await fetchData(
      "user/playlist/song",
      { playlistId },
      {
        Authorization: getAuthToken(),
        Token: getToken(),
      }
    )
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
    getUserPlaylistsSongs,
    addPlaylist,
    getUserPlaylists,
    logIn,
    isLoading,
    isError,
    getArtistByName,
    getTopTracksByArtistName,
    getVideoId,
    addToPlaylist,
    getLyrics,
    searchAutocomplete,
    getSimilarByArtistName,
    getAlbumsByArtistName,
    getAlbumInfo,
  }
}

export default useApi
