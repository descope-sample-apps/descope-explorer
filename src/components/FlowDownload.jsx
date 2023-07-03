import '../App.css';
import { useState, useEffect } from 'react'
import DownloadIcon from '@mui/icons-material/Download'


function FlowDownload() {
    const [flowIDs, setFlowIDs] = useState([])
    const [downloadFlow, setDownloadFlow] = useState("")

    useEffect(() => {
        fetch("/api/getFlows")
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            if (res) {
                res.body.loaded = true;
                const flowData = res.body.data.flows
                console.log(res)
                setFlowIDs(flowData)
                setDownloadFlow(flowData[0].id)
                return
            }
        })
        .catch((err) => console.log('err => ', err));
    }, [])

    const handleDownload = (e) => {
        e.preventDefault();
        console.log("download")
    }

    return (
        <div className='page'>
            <div className='row download-container'>
                <select onChange={(e) => setDownloadFlow(e.target.value)} className='select-container'>
                    {flowIDs.map((flow, i) => (
                        <option key={i} value={flow.id}>
                            {flow.name}
                        </option>
                    ))}
                </select>
                <button className='download-btn' onClick={(e) => handleDownload(e)}><DownloadIcon /></button>   
            </div>
        </div>
    )
}


export default FlowDownload
