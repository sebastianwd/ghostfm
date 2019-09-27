import React, { Fragment, useState, useEffect } from "react"
import axios from "axios"

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const BASE_URL = "http://localhost:8081/"

  const fetchData = async (endpoint, params) => {
    setIsError(false)
    setIsLoading(true)
    try {
      console.log("useApi", "fetching: " + BASE_URL + endpoint)
      const result = await axios({
        method: "get",
        url: BASE_URL + endpoint,
        params,
      })
      console.log("useApi", "Data received: " + JSON.stringify(result))
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

  return [{ isLoading, isError }, getArtistByName]
}

export default useApi
