import './App.css';
import { useState, useEffect } from 'react'
import { AuthProvider } from '@descope/react-sdk'
import Error from './components/Error';
import AuthFlow from './components/AuthFlow';
import Navbar from './components/Navbar';
import Introduction from './components/Introduction';
import BottomNav from './components/BottomNav';
import Sample from './components/Sample';
import SDKShow from './components/SDKs';

function App() {
  const defaultProjectId = "P2QZZJhnbALQo5FSNKRi0KAHHRz6"
  const queryParameters = new URLSearchParams(window.location.search)
  const project = queryParameters.get("project")

  const currTheme = queryParameters.get("theme")
  const flow = queryParameters.get("flow") || "sign-up-or-in"

  const [noError, setNoError] = useState(currTheme === "light" || currTheme === "dark")
  const [theme, setTheme] = useState(currTheme || "light")
 
  return (
    <>
      {project && flow && noError ? 
        <>
          <Navbar theme={theme} setTheme={setTheme} />
          <Introduction theme={theme}/>
          <AuthProvider projectId={project}>
            <AuthFlow flow={flow} theme={theme} setNoError={setNoError} />
          </AuthProvider>
          <SDKShow theme={theme}/>
          <Sample theme={theme}/>
          <BottomNav />
        </>
        :
        <Error defaultProjectId={defaultProjectId} flow={flow} />
      }
    </>
  )
}


export default App;
