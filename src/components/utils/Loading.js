import React from "react"
import loadingIcon from "../../images/loading.svg"

const Loading = () => {
  return (
    <div className="loading-container ">
      <div className="loading-container__inner">
        <img className="loading-image" src={loadingIcon} alt="" />
      </div>
    </div>
  )
}

export default Loading
