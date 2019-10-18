import React, { useEffect, useState, memo } from "react"
import useApi from "../components/hooks/useApi"
import { navigate, Link } from "gatsby"
import Loading from "./utils/Loading"
import { motion, AnimatePresence } from "framer-motion"
import { translateIn } from "./utils/animations"

const SimilarArtist = props => {
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

    return () => [setSimilar(null)]
  }, [props.artistName])

  /*? Check if direct link doesn't cause issues */
  /* const handleClick = artistName => {
    getArtistByName(decodeURIComponent(artistName)).then(data => {
      if (!isError && data) {
        navigate("/artist/" + artistName, {
          state: data,
        })
      }
    })
  }*/

  return (
    <React.Fragment>
      <h3 className="similar-artists__title">Artistas similares</h3>
      {loading && <Loading></Loading>}

      {similar && (
        <motion.div
          initial={translateIn.initial}
          animate={translateIn.animate}
          className="similar-artists__inner"
        >
          {similar.map((item, index) => {
            return (
              <Link
                className="similar-card "
                key={index}
                to={"/artist/" + encodeURIComponent(item.strArtist)}
              >
                <div className="similar-card__image">
                  <div
                    className="similar-card__image__inner"
                    style={
                      item.strArtistThumb
                        ? {
                            backgroundImage: `url(${item.strArtistThumb})`,
                          }
                        : {}
                    }
                  ></div>
                  <div className="similar-card__title">
                    <p className="similar-card__title__inner">
                      {decodeURIComponent(item.strArtist)}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </motion.div>
      )}
    </React.Fragment>
  )
}

export default SimilarArtist
