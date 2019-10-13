import React, { useEffect, useState, useRef } from "react"
import usePortal from "react-useportal"
import Draggable from "react-draggable"

const LyricsModal = ({ closePortal, lyrics, trackName }) => {
  const { Portal } = usePortal({
    closeOnOutsideClick: false,
  })

  const handleClick = e => {
    e.stopPropagation()
    closePortal(e)
  }

  return (
    <>
      <Portal>
        <div
          aria-hidden="false"
          aria-labelledby="modal-lyrics"
          role="dialog"
          className="modal"
        >
          <Draggable cancel=".no-drag">
            <div className="modal__wrapper">
              <div className="modal__header">
                <h4 className="modal__header__title no-drag">
                  <i
                    className="fa fa-align-right mr-3"
                    style={{ color: "white" }}
                  />
                  {trackName || ""}
                </h4>
                <div className="modal__header__buttons">
                  <button
                    className="button button--close  "
                    type="button"
                    onClick={handleClick}
                    title="Cerrar"
                  >
                    <i className="far fa-lg fa-times-circle"></i>
                  </button>
                </div>
              </div>
              <div className="modal__content no-drag">
                <pre className="lyrics">{lyrics}</pre>
              </div>
            </div>
          </Draggable>
        </div>
      </Portal>
    </>
  )
}

export default LyricsModal
