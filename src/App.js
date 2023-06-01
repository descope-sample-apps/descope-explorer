import './App.css';
import { AuthProvider } from '@descope/react-sdk'
import Error from './components/Error';
import Home from './components/Home';


function App() {
  const queryParameters = new URLSearchParams(window.location.search)
  const project = queryParameters.get("project")
  const flow = queryParameters.get("flow") || "sign-up-or-in"
  const theme = queryParameters.get("theme") || "light"

  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } 

  return (
    <>
      {project && flow ? 
        <AuthProvider projectId={project}>
          <Home flow={flow} project={project} theme={theme}/>
        </AuthProvider>
        :
        <Error />
      }
    </>
  )
}


export default App;
