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
import FlowDownload from './components/FlowDownload';
import NavbarModal from './components/NavbarModal';
import Loading from './components/Loading';


const contentUrlLocalStorageKey = 'base.content.url'


const setContentUrl = (baseUrl) => {
  if (baseUrl?.includes('descope.org')) {
    localStorage.setItem(contentUrlLocalStorageKey, 'https://static.descope.org/pages')
    return
  }
  localStorage.removeItem(contentUrlLocalStorageKey);
}


const setURL = (theme, project, flow) => {
  var url = new URL(window.location.href);
  var search_params = url.searchParams;

  search_params = checkSetParam('theme', search_params, theme)
  search_params = checkSetParam('project', search_params, project)
  search_params = checkSetParam('flow', search_params, flow)

  url.search = search_params.toString();
  const new_url = url.toString();
  window.location.replace(new_url) 
}


const checkSetParam = (param, search_params, val) => {
  let new_search = search_params
  console.log(new_search)
  if (val) { new_search.set(param, val) }
  return new_search
}


function App() {
  const defaultProjectId = process.env.REACT_APP_DESCOPE_PROJECT_ID

  const queryParameters = new URLSearchParams(window.location.search)
  const project = queryParameters.get("project") || defaultProjectId
  const currTheme = queryParameters.get("theme") || "light"
  const [flow, setFlow] = useState(queryParameters.get("flow")) 

  const [isLoading, setIsLoading] = useState(true)
  const [flowIDs, setFlowIDs] = useState([])

  useEffect(() => {
    fetch("/api/getFlows")
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            if (res) {
                res.body.loaded = true;
                const flowRes = res.body
                setFlowIDs(flowRes)
                setFlow(flowRes[0].id)
                setIsLoading(false)
                return
            }
        })
        .catch((err) => console.log('err => ', err));
  }, [])

  const baseUrl = queryParameters.get("base-url")
  setContentUrl(baseUrl)

  const [noError, setNoError] = useState(currTheme === "light" || currTheme === "dark" || !currTheme)
  const [openModal, setOpenModal] = useState({open: false, modalType: ""});

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {project && flow && noError ? 
        <>
          <Navbar 
            theme={currTheme} 
            setURL={setURL} 
            setOpenModal={setOpenModal} 
          />
          <NavbarModal 
            openModal={openModal} 
            defaultFlow={flow} 
            defaultProjectId={project} 
            defaultTheme={currTheme} 
            setOpenModal={setOpenModal} 
            setURL={setURL}
          />
          <Introduction theme={currTheme} />
          <AuthProvider projectId={project} baseUrl={baseUrl}>
            {(project === defaultProjectId && flowIDs) && 
              <FlowDownload 
                defaultFlow={flow} 
                flowIDs={flowIDs} 
                isLoading={isLoading}
                setURL={setURL} />
            }
            <AuthFlow 
              flow={flow} 
              theme={currTheme} 
              setNoError={setNoError} 
            />
          </AuthProvider>
          <SDKShow theme={currTheme} />
          <Sample theme={currTheme} />
          <BottomNav />
        </>
        :
        <Error />
      }
    </>
  )
}


export default App;
