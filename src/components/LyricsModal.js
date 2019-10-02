import React from "react"

const LyricsModal = props => {
  return (
    <div class="modal">
      <label class="modal__bg"></label>
      <div class="modal__inner">
        <label class="modal__close"></label>
        <p>{props.children}</p>
      </div>
    </div>
  )
}

export default LyricsModal
