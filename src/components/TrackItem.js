import React, { useState, useRef, useEffect } from "react"
import useApi from "../components/hooks/useApi"
import useMusicPlayer from "./hooks/useMusicPlayer"
import LyricsModal from "./LyricsModal"
import usePortal from "react-useportal"
import { translateIn, fadeIn, slideIn } from "./utils/animations"
import { motion } from "framer-motion"
import Snackbar from "node-snackbar"
import useLayoutOptions from "./hooks/useLayoutOptions"
import useSession from "./hooks/useSession"

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

  const { openPlaylistModal } = useLayoutOptions()
  const { isOpen, closePortal, openPortal } = usePortal({
    closeOnOutsideClick: false,
  })
  const [isPlaying, setIsPlaying] = useState()

  const { isAuthenticated } = useSession()

  const showLyrics = e => {
    e.stopPropagation()

    getLyrics(artistName, trackName).then(lyrics => {
      if (!lyrics) {
        Snackbar.show({
          text: "No se encontró la letra de esta canción",
          pos: "top-center",
          duration: 3000,
        })
      }
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
  const openPlaylistsModal = e => {
    e.stopPropagation()

    if (!isAuthenticated()) {
      Snackbar.show({
        text: "Ingresa o crea una cuenta para acceder a tus playlist",
        pos: "top-center",
        duration: 5000,
      })
      return
    }
    openPlaylistModal({
      track: trackName,
      artist: artistName,
    })
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
        <span
          className="track__add"
          title={"Añadir a playlist"}
          onClick={openPlaylistsModal}
        >
          <i className="fa  fa-plus"></i>
        </span>
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
          title={"Ver letra"}
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
