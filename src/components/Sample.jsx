import GitHubIcon from '@mui/icons-material/GitHub';
import "../App.css"


function Sample({ theme }) {

    return (
      <div className='page sample'>
        <h1 className={theme==="light" ? "title sample-title": "title sample-title second-title"}>Your Next Dream App</h1>
        <p className='sample-tagline'>See what You can Build through 10+ Sample Apps</p>
        <div className="sample-rows">
          {SampleApps.map((sample, i) => (
            <div className="row sample-box" key={i}>
              <GitHubIcon className='github-icon'/>
              <div className='sample-box-text'>
                <a href={sample.link} className="sample-link">{sample.title}</a>
                <p className="sample-des">{sample.des}</p>
              </div>
            </div>
          ))}          
        </div>
      </div>
    )
}


const SampleApps = [
  {
    title: "super-sso",
    des: "Descope Open ID Connect Sample App",
    link: ""
  },
  {
    title: "auth0-passkey-implementation",
    des: "Descope Open ID Connect Sample App",
    link: ""
  },
  {
    title: "b2c-retail-sample-app",
    des: "Welcome to Tee-Hee-Tees",
    link: ""
  },
  {
    title: "b2b-react-sample-app",
    des: "b2b-react-sample-app",
    link: ""
  },
  {
    title: "passportjs_sample",
    des: "Descope Open ID Connect Sample App",
    link: ""
  },
  {
    title: "Super SSO",
    des: "Todo App Sample App",
    link: ""
  },
  {
    title: "flask-sample-app",
    des: "Flask Sample App + Descope Auth",
    link: ""
  },
  {
    title: "flask-react-sample-app",
    des: "Flask + Descope Authentication (and a little bit of React)",
    link: ""
  },
  {
    title: "zero-to-auth",
    des: "zero-to-auth App",
    link: ""
  },
  {
    title: "next-js-sample-app",
    des: "Next.s + Descope authentication",
    link: ""
  },
  {
    title: "descope-escape-room",
    des: "Escape Room App",
    link: ""
  },
  {
    title: "descope-html-sample-app",
    des: "Descope + HTML sample app",
    link: ""
  },
  {
    title: "swift-sample-app",
    des: "Swift + Descope authentication",
    link: ""
  }
] 


export default Sample