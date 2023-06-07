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
  const queryParameters = new URLSearchParams(window.location.search)

  const flow = queryParameters.get("flow") || "sign-up-or-in"
  const [theme, setTheme] = useState(queryParameters.get("theme") || "light")

  const defaultProjectId = "P2QZZJhnbALQo5FSNKRi0KAHHRz6"
  const project_param = queryParameters.get("project")
  const project = project_param || queryParameters.get("default-project")
  const url = new URL(window.location.href)

  if(!project_param) {
    url.searchParams.set('default-project', defaultProjectId)
  } else {
    url.searchParams.delete('default-project')
  }

  const search_params = url.searchParams.toString();
  window.history.pushState(search_params, "Explorer", url.toString()); // adds an entry to the browser's session history stack.

  return (
    <>
      {project && flow ? 
        <>
          <Navbar theme={theme} setTheme={setTheme} />
          <Introduction theme={theme}/>
          <AuthProvider projectId={project}>
            <AuthFlow flow={flow} theme={theme} />
          </AuthProvider>
          <SDKShow theme={theme}/>
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
