import './App.css';
import { useState } from 'react'
import { AuthProvider } from '@descope/react-sdk'
import Error from './components/Error';
import AuthFlow from './components/AuthFlow';
import Navbar from './components/Navbar';
import Introduction from './components/Introduction';
import BottomNav from './components/BottomNav';
import Sample from './components/Sample';

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
          <Introduction theme={theme}/>
          <AuthProvider projectId={project}>
            <AuthFlow flow={flow} theme={theme} />
          </AuthProvider>
          <Sample theme={theme}/>
          <BottomNav />
        </>
        :
        <Error />
      }
    </>
  )
}


export default App;
