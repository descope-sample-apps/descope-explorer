import '../App.css'
import { useState, useEffect, useCallback } from 'react'
import { useDescope, useSession } from '@descope/react-sdk'
import { Descope } from '@descope/react-sdk'
import Replay from '@mui/icons-material/Replay'

function AuthFlow({ flow, theme, setNoError }) {
  const { isAuthenticated } = useSession()
  const { logout } = useDescope()

  const [jwt, setJwt] = useState("")
  const [response, setResponse] = useState("")

  const logoutUser = useCallback(async() => {
    await logout()
  }, [logout])

  useEffect(() => {
    if (!jwt) {
      logoutUser() 
    }
  }, [jwt, logoutUser]) 

  const setJWTs = (e) => {
    const response = JSON.stringify(e.detail, null, 2)
    const jwt = decodeJWT(e.detail.sessionJwt)

    setResponse(response)
    setJwt(jwt)
  }

  const decodeJWT = (res) => {
    var tokens = res.split(".");
    return JSON.stringify(JSON.parse(atob(tokens[1])), null, 2)
  }

  return (
    <div className='page authflow'>
      {isAuthenticated &&  
        <button className='logout-btn' onClick={logout}><Replay /></button>
      }
      { isAuthenticated &&
        (
          <>
            {jwt && (
              <div className='row jwt-wrapper'>
                <div className='jwt-box'>
                  <h3 className='jwt-title'>Payload</h3>
                  <pre className='pre1'>{jwt}</pre>
                </div>
                <div className='jwt-box'>
                  <h3 className='jwt-title'>JWT Response</h3>
                  <pre className='pre2'>{response}</pre>
                </div>
              </div>
            )}  
          </>
        )
      }
      {!isAuthenticated && (
        <div className='flow-wrapper'>   
          <div className='flow-shown'>
            <Descope
              flowId={flow} 
              onSuccess = {(e) => setJWTs(e)}
              onError={(e) => setNoError(false)}
              theme={theme}
            /> 
          </div>
        </div>
      )}
    </div>
  )
}


export default AuthFlow
