import '../App.css';
import { useCopyToClipboard } from 'usehooks-ts'


function Error() {
    const [value, copy] = useCopyToClipboard()
    const exampleText = "http://localhost:3000/?project=PROJECT_ID&flow=FLOW_ID&theme=light"
  
    return (
      <div className='page error fullscreen'>
        <h1 className='gradient'>Hmmmmm</h1>
        <p>Please make sure the URL is correctly formatted with the right <span>project id</span> and <span>flow id</span>.</p>
        <p>Here's an example (for localhost 3000): </p>
        <p className='example' onClick={() => copy(exampleText)}>{exampleText}</p>
        <p className={value && "gradient"}>{value ? "Copied": "Click to Copy"}</p>
      </div>
    )
}


export default Error
