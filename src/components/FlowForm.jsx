import '../App.css';
import DownloadIcon from '@mui/icons-material/Download'


function FlowForm({ flowIDs }) {
    console.log(flowIDs)
    return (
        <div className='row download-container'>
            <p className='download-txt'>Download</p> 
            <select className='select-container'>
                {flowIDs.map((flow, i) => (
                    <option id={i} value={flow.id}>{flow.name}</option>
                ))}
            </select>
            <button className='download-btn'><DownloadIcon /></button>   
        </div>
    )
}


export default FlowForm
