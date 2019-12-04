import React, { useEffect, useState, useRef } from "react"
import usePortal from "react-useportal"
import { CoverArt } from "./CoverArt"
import iconClose from "../../images/close-icon.svg"
import { NewPlaylist } from "./NewPlaylist"
import useApi from "../hooks/useApi"
import useLayoutOptions from "../hooks/useLayoutOptions"
import { useStoreState } from "easy-peasy"
import { Song } from "../shared/classes/Song"
import { toast } from "react-toastify"
import Snackbar from "node-snackbar"

export const PlaylistModal = () => {
  const { Portal } = usePortal({
    closeOnOutsideClick: false,
  })
  const [playlists, setPlaylists] = useState()
  const { layoutState, closePlaylistModal } = useLayoutOptions()
  const { getUserPlaylists, addToPlaylist } = useApi()

  const closeModal = e => {
    e.stopPropagation()
    closePlaylistModal()
  }
  useEffect(() => {
    if (!layoutState.isPlaylistModalOpen) {
      return
    }
    loadPlaylists()
  }, [layoutState.isPlaylistModalOpen])

  const loadPlaylists = () => {
    getUserPlaylists().then(playlists => {
      setPlaylists(playlists)
      console.log("playlists", playlists)
    })
  }

  const handleClick = async playlistId => {
    let response = await addToPlaylist(
      playlistId,
      new Song(layoutState.itemToAdd.track, layoutState.itemToAdd.artist)
    )

    if (!response.errors) {
      Snackbar.show({
        text: "Canción añadida a la playlist",
        pos: "top-center",
        duration: 5000,
      })
    }
    closePlaylistModal()
  }

  return (
    <>
      {layoutState.isPlaylistModalOpen && (
        <Portal>
          <div
            aria-hidden="false"
            aria-labelledby="playlists-modal-container"
            role="dialog"
            className="playlists-modal-container animated fadeIn faster"
          >
            <div
              style={{
                height: "100%",
                overflowY: "scroll",
                backgroundColor: "rgba(0, 0, 0, 0.9)",
              }}
            >
              <div className="playlists-modal container">
                <div className="playlists-modal__header">
                  <img
                    onClick={closeModal}
                    className={"playlists-modal__header__close"}
                    src={iconClose}
                  ></img>
                  <NewPlaylist onSubmit={loadPlaylists}></NewPlaylist>
                </div>
                <div className="row">
                  {playlists &&
                    playlists.map((playlist, index) => {
                      return (
                        <div
                          className="col-6  col-md-4 col-lg-3 col-xl-2"
                          key={playlist.id}
                        >
                          <div className="playlists-modal__item">
                            <CoverArt.Image
                              onClick={() => handleClick(playlist.id)}
                              backgroundImage={playlist.image}
                              iconType={"PLAYLIST-ADD"}
                            ></CoverArt.Image>
                            <CoverArt.Title>{playlist.name}</CoverArt.Title>
                            <CoverArt.Subtitle>
                              {playlist.songsCount}{" "}
                              {playlist.songsCount == 1
                                ? "canción"
                                : "canciones"}
                            </CoverArt.Subtitle>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
