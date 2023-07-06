import '../App.css';
import { useCopyToClipboard } from 'usehooks-ts'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';


function Error() {
    const [value, copy] = useCopyToClipboard()
    const exampleText = `https://descope-explorer.com/?project=${process.env.REACT_APP_DESCOPE_PROJECT_ID}&flow=sign-up-or-in&theme=dark`
  
    return (
      <div className='page error fullscreen'>
        <h1 className='title error-title'>Hmmmmm</h1>
        <p>Why am I seeing this page?</p>
        <p className='error-txt'>Please make sure the URL is correctly formatted with a valid <span>project id</span>, <span>flow id</span>, and <span>theme</span>.</p>
        <p className='error-blue'>Here's an example: </p>
        <p className='example' onClick={() => copy(exampleText)}>{exampleText} 
          {value ? 
          <CheckIcon className='copy-icon' /> 
          : 
          <ContentCopyIcon className='copy-icon'/>
          }
         </p>
      </div>
    )
}


export default Error
