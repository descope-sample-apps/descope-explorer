import "../App.css"


function Introduction({ theme }) {

    return (
      <div className="page">
        <h1 className={theme==="light" ? "title": "title gradient"}>Descope Explorer </h1>
        <p className="tagline">An easy way to preview and interact with Descope authentication flows</p>
      </div>
    )
}


export default Introduction
