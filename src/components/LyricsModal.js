import React, { useEffect, useState, useRef } from "react"
import usePortal from "react-useportal"
import Draggable from "react-draggable"

const LyricsModal = props => {
  const { isOpen, Portal, closePortal, openPortal } = usePortal({
    closeOnOutsideClick: false,
  })
  const [close, setClose] = useState(false)
  const buttonRef = useRef()
  useEffect(() => {
    buttonRef.current.click()
  }, [props])

  const handleClick = e => {
    e.stopPropagation()
    props.setLyrics({
      lyrics: "",
      trackName: "",
    })
    closePortal(e)
  }

  return (
    <>
      <button
        type="button"
        ref={buttonRef}
        onClick={openPortal}
        className="d-none"
      ></button>
      {isOpen && (
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
                    {props.trackName || ""}
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
                  <pre className="lyrics">{props.children}</pre>
                </div>
              </div>
            </Draggable>
          </div>
        </Portal>
      )}
    </>
  )
}

export default LyricsModal
