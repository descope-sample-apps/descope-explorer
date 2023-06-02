import '../App.css';
import { useState, useEffect } from 'react';
import { useDescope, useSession } from '@descope/react-sdk'
import { Descope } from '@descope/react-sdk'

import Theme from "./Theme"

import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import LockIcon from '@mui/icons-material/Lock';


function Home({ flow }) {
    const queryParameters = new URLSearchParams(window.location.search)
    const { isAuthenticated } = useSession()
    const { logout } = useDescope()
    const [jwt, setJwt] = useState("")
    const [response, setResponse] = useState("")
    const [theme, setTheme] = useState(queryParameters.get("theme") || "light")

    useEffect(() => {
      if (!jwt) {
        logoutUser() 
      }
    }, [jwt]) 
  
    const logoutUser = async() => {
      await logout()
    }

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
      <div className="flex-col">
        <h1 className='title'>Descope Explorer</h1>
        <p>Welcome to Descope Explorer. An easy way to preview and interact with Descope authentication flows</p>
        <div className='flex-col flex-row label-container'>
          <Theme theme={theme} setTheme={setTheme} />
          <div>
            <p className='label dark-blue'>flow id: </p>
            <p className='label light-blue'>{flow}</p>
          </div>
          {isAuthenticated &&  <button className='theme-btn logout-btn' onClick={logout}><LockIcon /></button>}
        </div>

        { isAuthenticated &&
          (
            <>
              {jwt && (
                <div className='jwt-border flex-col flex-row'>
                  <div className='jwt-container'><pre>{jwt}</pre></div>
                  <div className='right-jwt jwt-container'><pre>{response}</pre></div>
                </div>
              )}  
            </>
          )
        }

        { !isAuthenticated && (
          <div className='flex-col descope-widget'>
            <p className='descope-p'>Descope Component in your app: </p>
            {theme === "light" ?
              <Descope
                flowId={flow} 
                onSuccess = {(e) => setJWTs(e)}
                onError={(e) => console.log('Could not log in!')}
                theme="light"
              /> 
              :
              <Descope
                flowId={flow} 
                onSuccess = {(e) => setJWTs(e)}
                onError={(e) => console.log('Could not log in!')}
                theme="dark"
              /> 
            }
          </div>
          )
        }
        <div className="flex-col flex-row doc-space">
          <div className='doc-box'>
            <div className='flex-row title-container'>
              <SchoolOutlinedIcon/>
              <a href='https://docs.descope.com/' target="_blank" rel="noreferrer" className='doc-title'>Documentation</a>
            </div>
            <p className='doc-txt'>Everything you need to know, including APIs, SDKs and sample codes</p>
          </div>
          <div className='doc-box'>
            <div className='flex-row title-container'>
              <LocalLibraryOutlinedIcon/>
              <a href="https://www.descope.com/community" target="_blank" rel="noreferrer" className='doc-title'>Community</a>
            </div>
            <p className='doc-txt'>Collaborate and chat with other Descopers about passwordless experiences</p>
          </div>
          <div className='doc-box'>
            <div className='flex-row title-container'>
              <LiveHelpOutlinedIcon/>
              <a href="https://docs.descope.com/support/" target="_blank" rel="noreferrer" className='doc-title'>Get Help</a>
            </div>
            <p className='doc-txt'>Contact our Developer Success team to accelerate your passwordless journey</p>
          </div>
        </div>
      </div>
    )
}


export default Home
