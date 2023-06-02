import './App.css';
import { useState } from 'react';
import { AuthProvider } from '@descope/react-sdk'
import Error from './components/Error';
import Home from './components/Home';
import Navbar from './components/Navbar';


function App() {
  const queryParameters = new URLSearchParams(window.location.search)
  const project = queryParameters.get("project")
  const flow = queryParameters.get("flow") || "sign-up-or-in"
  const [theme, setTheme] = useState(queryParameters.get("theme") || "light")

  return (
    <>
      {project && flow ? 
        <>
          <Navbar theme={theme} setTheme={setTheme} />
          <AuthProvider projectId={project}>
            <Home flow={flow} project={project} theme={theme} />
          </AuthProvider>
        </>
        :
        <Error />
      }
    </>
  )
}


export default App;
