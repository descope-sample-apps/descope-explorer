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
                <a target="_blank" rel="noreferrer" href={sample.link} className="sample-link">{sample.title}</a>
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
    title: "b2c-retail-sample-app",
    des: "Welcome to Tee-Hee-Tees",
    link: "https://github.com/descope-sample-apps/b2c-retail-sample-app"
  },
  {
    title: "b2b-react-sample-app",
    des: "b2b-react-sample-app",
    link: "https://github.com/descope-sample-apps/b2b-react-sample-app"
  },
  {
    title: "passportjs_sample",
    des: "Todo App Sample App",
    link: "https://github.com/descope-sample-apps/passportjs_sample"
  },
  {
    title: "flask-sample-app",
    des: "Flask Sample App + Descope Auth",
    link: "https://github.com/descope-sample-apps/flask-sample-app"
  },
  {
    title: "flask-react-sample-app",
    des: "Flask + Descope Authentication (and a little bit of React)",
    link: "https://github.com/descope-sample-apps/flask-react-sample-app"
  },
  {
    title: "b2b-sample-app",
    des: "B2B Sample app",
    link: "https://github.com/descope-sample-apps/b2b-sample-app"
  },
  {
    title: "react-python-sample-app",
    des: "react-python-sample-app",
    link: "https://github.com/descope-sample-apps/react-python-sample-app"
  },
  {
    title: "zero-to-auth",
    des: "zero-to-auth App",
    link: "https://github.com/descope-sample-apps/zero-to-auth"
  },
  {
    title: "next-js-sample-app",
    des: "Next Descope Example",
    link: "https://github.com/descope-sample-apps/next-js-sample-app"
  },
  {
    title: "descope-escape-room",
    des: "Escape Room App",
    link: "https://github.com/descope-sample-apps/descope-escape-room"
  },
  {
    title: "descope-html-sample-app",
    des: "HTML Sample App",
    link: "https://github.com/descope-sample-apps/descope-html-sample-app"
  },
  {
    title: "swift-sample-app",
    des: "Swift Sample App",
    link: "https://github.com/descope-sample-apps/swift-sample-app"
  },
  {
    title: "django-descope",
    des: "Descope Django App",
    link: "https://github.com/descope/django-descope"
  }
] 


export default Sample