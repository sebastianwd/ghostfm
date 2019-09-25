import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Container } from "reactstrap"
import Image from "./image"

const Header = ({ siteTitle }) => (
  <div className="d-flex align-items-center p-3">
    <div
      className="mt-3 ml-4 p-3"
      style={{ maxWidth: `300px`, position: "relative" }}
    >
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
    </div>
    <div className="glitch ml-2" data-text="Ghost FM">
      Ghost FM
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
