import '../App.css';
import { useState, useEffect } from 'react';
import { useDescope, useSession } from '@descope/react-sdk'
import { Descope } from '@descope/react-sdk'
import Replay from '@mui/icons-material/Replay';
import DownloadIcon from '@mui/icons-material/Download';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


function AuthFlow({ flow, theme, setNoError }) {
  const { isAuthenticated } = useSession()
  const { logout } = useDescope()
  const [jwt, setJwt] = useState("")
  const [response, setResponse] = useState("")

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
        <div>
          <div className='row download-container'>
            <p className='download-txt'>Download</p> 
            <FormControl className='form-control' size="small">
              <InputLabel id="demo-select-small-label">Age</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <button className='download-btn'><DownloadIcon /></button>   
          </div>      
          <div className='flow-shown'>
            {theme === "light" ?
              <Descope
                flowId={flow} 
                onSuccess = {(e) => setJWTs(e)}
                onError={(e) => setNoError(false)}
                theme="light"
              /> 
              :
              <Descope
                flowId={flow} 
                onSuccess = {(e) => setJWTs(e)}
                onError={(e) => setNoError(false)}
                theme="dark"
              /> 
            }
          </div>
        </div>
      )}
    </div>
  )
}


export default AuthFlow
