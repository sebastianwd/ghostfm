import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "./image"
import { GoogleLogin } from "react-google-login"

const Header = ({ siteTitle }) => {
  const responseGoogle = response => {
    console.log("google response", response)
  }
  return (
    <div className="d-flex align-items-start  p-3 section-header ">
      <div className="d-flex align-items-center">
        <div
          className="mt-3  p-3"
          style={{ maxWidth: `300px`, position: "relative" }}
        >
          <Link to="/">
            <Image
              alt="Ghostfm Logo"
              filename="logo.png"
              style={{
                position: "absolute",
                left: 0,
                top: "-20px",
                width: "100%",
                height: "150%",
                borderRadius: "10px",
              }}
            />
          </Link>
        </div>
        <Link to="/">
          <div className="glitch ml-2" data-text="GhostFM">
            GhostFM
          </div>
        </Link>
      </div>
      <div className="d-flex ">
        <GoogleLogin
          clientId="1050239333740-5ju5e3kropm25l5fre7emc3d5gl8lrdg.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
