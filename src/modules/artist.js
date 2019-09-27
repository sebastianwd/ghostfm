import React, { useEffect, useState } from "react"
import SEO from "../components/seo"
import useApi from "../components/hooks/useApi"

const Artist = ({ location, name }) => {
  const [{ isLoading }, getArtistByName] = useApi()
  const [infoState, setInfoState] = useState(null)

  useEffect(() => {
    if (!location.state || !location.state.idArtist) {
      getArtistByName(name).then(data => {
        if (data) {
          setInfoState(data)
        }
      })
    } else {
      setInfoState(location.state)
    }
  }, [])

  return (
    <React.Fragment>
      <SEO title={name} />
      {infoState ? <p>id : {infoState.idArtist}</p> : "cargando"}
      <div>
        <p>{name}</p>
        <p>{JSON.stringify(location.state)}</p>
      </div>
    </React.Fragment>
  )
}

export default Artist
