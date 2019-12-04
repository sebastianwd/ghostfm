import React from "react"
import MicrosoftLogin from "react-microsoft-login-ssr-fix"
import { GoogleLogin } from "react-google-login"
import useApi from "../hooks/useApi"
import useSession from "../hooks/useSession"

export const GoogleButton = () => {
  const { logIn } = useApi()

  const onSubmit = data => {
    console.log(data)
    /*logIn({
      username: data.profileObj.userName,
      name: user.account.userName,
      email: user.account.userName,
    }).then(res => {
      if (res.errors) {
        Snackbar.show({ text: res.errors[0] })
        return
      }
      setSession()
    })*/
  }

  const onFailure = () => {
    /* TODO error handling*/
  }

  return (
    <GoogleLogin
      clientId="1050239333740-5ju5e3kropm25l5fre7emc3d5gl8lrdg.apps.googleusercontent.com"
      buttonText="Google"
      onSuccess={onSubmit}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      className="btn-google mb-3"
    />
  )
}

export const MicrosoftButton = () => {
  const { logIn } = useApi()
  const { setCookies } = useSession()

  const onSubmit = (err, data) => {
    const user = data.authResponseWithAccessToken
    logIn({
      username: user.account.userName,
      name: user.account.userName,
      email: user.account.userName,
    }).then(res => {
      setCookies(res.headers.authorization, res.headers.token)
      console.log("res", res)
    })

    /* TODO handle error */
  }

  return (
    <React.Fragment>
      {typeof window !== "undefined" && (
        <MicrosoftLogin
          redirectUri={window.location.origin}
          clientId={"9ca00ead-090e-4ac6-9096-bbdd9c745c34"}
          authCallback={onSubmit}
          buttonTheme={"dark_short"}
        />
      )}
    </React.Fragment>
  )
}
