import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import useApi from "./hooks/useApi"
import useSession from "../components/hooks/useSession"

import { useStoreState } from "easy-peasy"
import { GoogleButton, MicrosoftButton } from "../components/shared/LoginButton"
import Scrollbars from "react-scrollbars-custom"

const Header = ({ sidebarRef }) => {
  const [isOpen, setIsOpen] = useState(false)
  const userState = useStoreState(state => state.user)

  const { getUserPlaylists } = useApi()
  const [playlists, setPlaylists] = useState()

  const shouldSibebarOpen = () => {
    let shouldOpen =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 992px)").matches
    if (shouldOpen) {
      setIsOpen(shouldOpen)
    }
  }

  const loadPlaylists = () => {
    getUserPlaylists().then(playlists => {
      setPlaylists(playlists)
    })
    shouldSibebarOpen()
  }
  const navigateToPlaylist = playlist => {
    navigate("/playlist/" + playlist.id, {
      state: { playlist },
    })
  }

  useEffect(() => {
    if (userState.userId) {
      loadPlaylists()
    } else {
      shouldSibebarOpen()
    }
  }, [userState.userId])

  return (
    <React.Fragment>
      <div
        className={`py-3 px-2 section-header ${isOpen ? `--is-open` : ``}`}
        ref={sidebarRef}
      >
        <div className="section-header__inner">
          {!userState.userId && (
            <React.Fragment>
              <p className="text-center mb-3">
                Ingresa para poder guardar playlists y más
              </p>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <GoogleButton />
                <MicrosoftButton />
              </div>
            </React.Fragment>
          )}
          {userState.userId && (
            <div className="menu">
              <a href="#" className="menu__item">
                <i className="ion-ios-musical-notes"></i>
                <span>Mi música</span>
              </a>
              <span className="menu__header mt-3 mb-1">
                <i className="ion-headphone"></i>
                <span>Playlists</span>
              </span>
              <Scrollbars noScrollX={true}>
                <ul className="menu__playlists">
                  {playlists &&
                    playlists.map((playlist, index) => {
                      return (
                        <>
                          <li onClick={() => navigateToPlaylist(playlist)}>
                            {playlist.name}
                          </li>
                        </>
                      )
                    })}
                </ul>
              </Scrollbars>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Header
