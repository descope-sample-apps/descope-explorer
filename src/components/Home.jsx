import '../App.css';
import { useState, useEffect } from 'react';
import { useDescope, useSession } from '@descope/react-sdk'
import { Descope } from '@descope/react-sdk'

import Theme from "./Theme"

import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import Replay from '@mui/icons-material/Replay';


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
        <Theme theme={theme} setTheme={setTheme}/>
        <h1 className='title'>Descope Explorer </h1>
        <p>Welcome to Descope Explorer.<br/>
          An easy way to preview and interact with Descope authentication flows.</p>
        
        
          {isAuthenticated &&  <div><div className='flex-col flex-row label-container'><button className='theme-btn logout-btn' onClick={logout}><Replay /></button></div></div>}
        

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
          <div>
            <p className='descope-p'>Descope component in your app</p>
            <div className='flex-col descope-widget'>
              
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
            </div>
          )
        }
        <div className="flex-col flex-row doc-space">
          <div className='doc-box'>
            <div className='flex-row title-container'>
              <HowToRegOutlinedIcon/>
              <a href="https://www.descope.com/sign-up/" target="_blank" rel="noreferrer" className='doc-title'>Sign Up</a>
            </div>
            <p className='doc-txt'>See for yourself how Descope can help you Drag & Drop your auth</p>
          </div>
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
        </div>
      </div>
    )
}


export default Home
