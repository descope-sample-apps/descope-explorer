import '../App.css';
import { useCopyToClipboard } from 'usehooks-ts'


function Error() {
    const [value, copy] = useCopyToClipboard()
    const exampleText = "http://localhost:3000/?project=PROJECT_ID&flow=FLOW_ID&theme=light"
  
    return (
      <div className='flex-col'>
        <h1 className='title'>Hmmmmm 🤔</h1>
        <p>Please make sure the URL is correctly formatted with the right <span className='underlined'>project id</span> and <span className='underlined'>flow id</span>.</p>
        <p>Here's an example (for localhost 3000): </p>
        <p onClick={() => copy(exampleText)} className='example'>{exampleText}</p>
        <p>{value ? "Copied": "Click to Copy"}</p>
      </div>
    )
}


export default Error
