import GitHubIcon from '@mui/icons-material/GitHub';
import "../App.css"


function Sample() {

    return (
      <div className='page sample'>
        <h1 className="title sample-title">Your Next Dream App</h1>
        <p>See what You can Build through 10+ Sample Apps</p>
        <div className="sample-rows">
          {SampleApps.map((sample, i) => (
            <div className="row sample-box" key={i}>
              <GitHubIcon className='github-icon'/>
              <div className='sample-box-text'>
                <a href="#" className="sample-link">{sample.title}</a>
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
    des: "Descope Open ID Connect Sample App"
  },
  {
    title: "auth0-passkey-implementation",
    des: "Descope Open ID Connect Sample App"
  },
  {
    title: "b2c-retail-sample-app",
    des: "Welcome to Tee-Hee-Tees"
  },
  {
    title: "b2b-react-sample-app",
    des: "b2b-react-sample-app"
  },
  {
    title: "passportjs_sample",
    des: "Descope Open ID Connect Sample App"
  },
  {
    title: "Super SSO",
    des: "Todo App Sample App"
  },
  {
    title: "flask-sample-app",
    des: "Flask Sample App + Descope Auth"
  },
  {
    title: "flask-react-sample-app",
    des: "Flask + Descope Authentication (and a little bit of React)"
  },
  {
    title: "zero-to-auth",
    des: "zero-to-auth App"
  },
  {
    title: "next-js-sample-app",
    des: "Next.s + Descope authentication"
  },
  {
    title: "descope-escape-room",
    des: "Escape Room App"
  },
  {
    title: "descope-html-sample-app",
    des: "Descope + HTML sample app"
  },
  {
    title: "swift-sample-app",
    des: "Swift + Descope authentication"
  }
] 


export default Sample