import '../App.css';
import { useState, useEffect } from 'react';
import { useDescope, useSession } from '@descope/react-sdk'
import { Descope } from '@descope/react-sdk'

import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';


function Home({ flow, project, theme }) {
    const { isAuthenticated } = useSession()
    const { logout } = useDescope()
    const [jwt, setJwt] = useState("")
    const [response, setResponse] = useState("")
  
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
        <h1 className='title'>Descope Explorer 🔑</h1>
        <p>Welcome to Descope Explorer. An easy way to preview and interact with Descope authentication flows</p>
        <div className='label-container'>
          <p className='label light-blue'>{flow}</p>
          <p className='label dark-blue'>{project}</p>
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
              <button className='logout-btn' onClick={logout}>Logout 🔒</button>
            </>
          )
        }

        { !isAuthenticated && (
          <>
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
          </>
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
