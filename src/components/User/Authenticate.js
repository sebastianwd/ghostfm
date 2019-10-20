import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import useSession from "../hooks/useSession"

const Authenticate = ({ children }) => {
  const { setSession } = useSession()

  useEffect(() => {
    setSession()
  }, [])

  return children
}

export default Authenticate
