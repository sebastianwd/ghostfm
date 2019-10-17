import React, { useState, useRef, useEffect } from "react"
import useApi from "../components/hooks/useApi"
import useMusicPlayer from "./hooks/useMusicPlayer"
import LyricsModal from "./LyricsModal"
import usePortal from "react-useportal"
import { translateIn, fadeIn, slideIn } from "./utils/animations"
import { motion } from "framer-motion"

const TrackItem = ({
  artistName,
  trackName,
  trackNumber,
  playcount,
  tracks,
}) => {
  const { isLoading, isError, getLyrics, getVideoId } = useApi()
  const [lyrics, setLyrics] = useState({
    lyrics: "",
    trackName: "",
  })
  const { setQueue, playTrack, playlistState } = useMusicPlayer()
  const { isOpen, closePortal, openPortal } = usePortal({
    closeOnOutsideClick: false,
  })
  const [isPlaying, setIsPlaying] = useState()

  const showLyrics = e => {
    e.stopPropagation()
    getLyrics(artistName, trackName).then(lyrics => {
      setLyrics({ lyrics, trackName })
    })
  }
  useEffect(() => {
    if (playlistState.current && playlistState.current.track == trackName) {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }, [playlistState.current])

  const handleClick = e => {
    e.stopPropagation()
    getVideoId(decodeURIComponent(`${artistName} ${trackName}`)).then(
      videoId => {
        playTrack({
          videoId,
          current: {
            track: trackName,
            artist: artistName,
          },
        })
        tracks && setQueue({ tracks: tracks })
      }
    )
  }

  return (
    <React.Fragment>
      <motion.div
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        className={`track ${isPlaying ? `playing` : ``}`}
        onClick={handleClick}
        style={{ ...fadeIn.styles, transitionDelay: `${trackNumber * 20}ms` }}
      >
        <span className="track__number">{trackNumber}</span>
        {!isLoading && (
          <span className="track__play">
            <i className="fa  fa-play"></i>
          </span>
        )}
        {isLoading && (
          <span className="track__loading">
            <i className="fas  fa-circle-notch fa-spin"></i>
          </span>
        )}
        <span className="track__name">{decodeURIComponent(trackName)}</span>
        <span className="track__playcount">{playcount || ""}</span>
        <span
          className="track__lyrics"
          onClick={showLyrics}
          onMouseDown={openPortal}
        >
          <i className="fa fa-lg fa-align-right"></i>
        </span>
      </motion.div>
      {lyrics.lyrics && isOpen && (
        <LyricsModal
          trackName={lyrics.trackName}
          lyrics={lyrics.lyrics}
          closePortal={closePortal}
        ></LyricsModal>
      )}
    </React.Fragment>
  )
}

export default TrackItem
