import './App.css';
import { AuthProvider } from '@descope/react-sdk'
import Error from './components/Error';
import Home from './components/Home';

function App() {
  const queryParameters = new URLSearchParams(window.location.search)
  const project = queryParameters.get("project")
  const flow = queryParameters.get("flow") || "sign-up-or-in"

  return (
    <>
      {project && flow ? 
        <>
          <AuthProvider projectId={project}>
            <Home flow={flow} project={project} />
          </AuthProvider>
        </>
        :
        <Error />
      }
    </>
  )
}


export default App;
