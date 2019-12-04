import React from "react"
import { Link } from "gatsby"
import Image from "./image"
import useSession from "../components/hooks/useSession"
import { useStoreState } from "easy-peasy"

const Nav = ({ onChange }) => {
  const { signOut } = useSession()
  const userState = useStoreState(state => state.user)

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="logo mr-4">
          <Link to="/" className="logo__image">
            <Image
              alt="Ghostfm Logo"
              filename="logo.png"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                zIndex: "-99",
              }}
            />
          </Link>
          <Link to="/" className="logo__brand">
            <div className="glitch ml-2" data-text="GhostFM">
              GhostFM
            </div>
          </Link>
        </div>
        <div className="d-flex align-items-center ">
          <div className="burger-container">
            <input type="checkbox" className="burger" onChange={onChange} />
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {userState.userId && (
          <div className="d-flex align-items-center ml-auto">
            <button className="button button--nav" onClick={signOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav
