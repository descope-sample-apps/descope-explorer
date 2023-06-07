import '../App.css';
import { useCopyToClipboard } from 'usehooks-ts'


function Error() {
    const [value, copy] = useCopyToClipboard()
    const exampleText = "https://descope-explorer.com/?project=<projectid>&flow=<flowid>&theme=dark"
  
    return (
      <div className='page error fullscreen'>
        <h1 className='title'>Hmmmmm</h1>
        <p className='error-txt'>Please make sure the URL is correctly formatted with the right <span>project id</span> and <span>flow id</span>.</p>
        <p className='error-txt'>If you don't have one with you, no problem! Descope Explorer has a default project for you to see! Just refresh to browser!</p>
        <p className='error-blue'>Here's an example: </p>
        <p className='example' onClick={() => copy(exampleText)}>{exampleText}</p>
        <p className={value && "copied"}>{value ? "Copied": "Click to Copy"}</p>
      </div>
    )
}


export default Error
