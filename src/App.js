import './App.css';
import { useState } from 'react';
import { AuthProvider, useDescope, useSession } from '@descope/react-sdk'
import { Descope } from '@descope/react-sdk'


function AppRoot () {
  const queryParameters = new URLSearchParams(window.location.search)
  const project = queryParameters.get("project")
  const flow = queryParameters.get("flow") || "sign-up-or-in"

  return (
    <div className='flex-col'>
      {project && flow ? 
        <AuthProvider projectId={project}>
          <App flow={flow} />
        </AuthProvider>
        :
        <Error />
      }
    </div>
  )
}


function Error() {
  return (
    <div className='flex-col'>
      <h1>Hmmmmm 🤔</h1>
      <p>Please make sure the URL is correctly formatted with the right <span className='underlined'>project id</span> and <span className='underlined'>flow id</span>.</p>
      <p>Here's an example (for localhost 3000): </p>
      <p className='example'>http://localhost:3000/?project=PROJECT_ID&flow=FLOW_ID</p>
    </div>
  )
}


function App({ flow }) {
  // isAuthenticated: boolean - is the user authenticated?
  // isSessionLoading: boolean - Use this for showing loading screens while objects are being loaded
  const { isAuthenticated } = useSession()

  // logout - call logout to logout the user (deletes all session state)
  const { logout } = useDescope()

  // our jwt 
  const [jwt, setJwt] = useState("")

  const decodeJWT = (jwt) => {
    var tokens = jwt.split(".");
    const payloadJSON = JSON.stringify(JSON.parse(atob(tokens[1])), null, 2)
    setJwt(payloadJSON)
  }

  return (
    <div className='flex-col'>
      <h1>Descope Explorer 🔑</h1>
      <p className='explorer'>Welcome to Descope Explorer. A quick and easy way to view Descope project authentication flows.</p>

      { isAuthenticated &&
        (
          <>
            {jwt ? 
              <div className='jwt-container'><pre>{jwt}</pre></div>
              :
              <div className='jwt-container'>Logout and Relogin</div>
            }  
            <button className='logout-btn' onClick={logout}>Try Again 🔒</button>
          </>
        )
      }

      { !isAuthenticated &&
        (
          <Descope
            flowId={flow} // If you wish to use another flow, flow-id is shown in the console
            onSuccess = {(e) => decodeJWT(e.detail.sessionJwt)}
            onError={(e) => console.log('Could not log in!')}
            theme="light" // "light" or "dark", default is "light"
            //    debug=boolean // Shows a debug widget if true. Can be true or false, default is false.
            //    tenant="<tenantId>" // Which tenant the auth flow will sign the user into
          />
        )
      }
    </div>
  )
}


export default AppRoot;
