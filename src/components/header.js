import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import Image from "./image"
import { GoogleLogin } from "react-google-login"

const Header = ({ sidebarRef }) => {
  const [isOpen, setIsOpen] = useState(false)

  const responseGoogle = response => {
    //console.log("google response", response)
  }

  useEffect(() => {
    let shouldOpen =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 992px)").matches
    if (shouldOpen) {
      setIsOpen(!isOpen)
    }
  }, [])

  return (
    <React.Fragment>
      <div
        className={`py-3 px-2 section-header ${isOpen ? `--is-open` : ``}`}
        ref={sidebarRef}
      >
        <div className="section-header__inner">
          <p className="text-center mb-3">
            Ingresa para poder guardar playlists y más
          </p>
          <GoogleLogin
            clientId="1050239333740-5ju5e3kropm25l5fre7emc3d5gl8lrdg.apps.googleusercontent.com"
            buttonText="Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            className="btn-google"
          />
        </div>
      </div>
    </React.Fragment>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
