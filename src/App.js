import './App.css';
import { useState } from 'react'
import { AuthProvider } from '@descope/react-sdk'
import Error from './components/Error';
import AuthFlow from './components/AuthFlow';
import Navbar from './components/Navbar';
import Introduction from './components/Introduction';
import BottomNav from './components/BottomNav';
import Sample from './components/Sample';
import SDKShow from './components/SDKs';
import FlowDownload from './components/FlowDownload';

const contentUrlLocalStorageKey = 'base.content.url'

const setContentUrl = (baseUrl) => {
  if (baseUrl?.includes('descope.org')) {
    localStorage.setItem(contentUrlLocalStorageKey, 'https://static.descope.org/pages')
    return
  }

  localStorage.removeItem(contentUrlLocalStorageKey);
}

function App() {
  const defaultProjectId = process.env.REACT_APP_DESCOPE_PROJECT_ID
  const queryParameters = new URLSearchParams(window.location.search)
  const project = queryParameters.get("project") || defaultProjectId

  const currTheme = queryParameters.get("theme")
  const flow = queryParameters.get("flow") || "sign-up-or-in"
  const baseUrl = queryParameters.get("base-url")

  setContentUrl(baseUrl)

  const [noError, setNoError] = useState(currTheme === "light" || currTheme === "dark" || !currTheme)
  const [theme, setTheme] = useState(currTheme || "light")
 
  return (
    <>
      {project && flow && noError ? 
        <>
          <Navbar theme={theme} setTheme={setTheme} project={project} flow={flow} />
          <Introduction theme={theme} />
          <AuthProvider projectId={project} baseUrl={baseUrl}>
            {project === defaultProjectId && <FlowDownload />}
            <AuthFlow flow={flow} theme={theme} setNoError={setNoError} />
          </AuthProvider>
          <SDKShow theme={theme} />
          <Sample theme={theme} />
          <BottomNav />
        </>
        :
        <Error />
      }
    </>
  )
}


export default App;
