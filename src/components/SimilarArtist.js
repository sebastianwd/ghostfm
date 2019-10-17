import React, { useEffect, useState, memo } from "react"
import useApi from "../components/hooks/useApi"
import { navigate } from "gatsby"
import Loading from "./utils/Loading"
const SimilarArtist = memo(props => {
  const { isError, getSimilarByArtistName, getArtistByName } = useApi()

  const [similar, setSimilar] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getSimilarByArtistName(props.artistName).then(data => {
      if (data) {
        setSimilar(data)
      }
      setLoading(false)
    })
  }, [props.artistName])

  const handleClick = artistName => {
    getArtistByName(decodeURIComponent(artistName)).then(data => {
      if (!isError && data) {
        navigate("/artist/" + artistName, {
          state: data,
        })
      }
    })
  }

  return (
    <React.Fragment>
      {loading && <Loading></Loading>}
      {similar &&
        similar.map((item, index) => {
          return (
            <div
              className="similar-card animated fadeIn"
              onClick={() => handleClick(item.strArtist)}
              key={index}
            >
              <div className="similar-card__image">
                <div
                  className="similar-card__image__inner"
                  style={{
                    backgroundImage: ` linear-gradient(90deg, rgba(11,5,6,0.68) 0%, rgba(11,14,6,0.68) 94%), url(${item.strArtistThumb})`,
                  }}
                ></div>
                <div className="similar-card__title">
                  <p className="similar-card__title__inner">
                    {decodeURIComponent(item.strArtist)}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
    </React.Fragment>
  )
})

export default SimilarArtist
