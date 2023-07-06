import '../App.css';
import { useState, useEffect } from 'react'
import DownloadIcon from '@mui/icons-material/Download'
import { saveAs } from "file-saver";


function FlowDownload({ defaultFlow, setURL, setNoError }) {
    const [isLoading, setIsLoading] = useState(true)
    const [flowIDs, setFlowIDs] = useState([])
    const downloadFlow = flowIDs.find(obj => obj.id === defaultFlow);

    useEffect(() => {
        fetch("/api/getFlows")
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                if (res.body) {
                    res.body.loaded = true;
                    const flowRes = res.body
                    setFlowIDs(flowRes)
                    setIsLoading(false)
                    return
                }
                return setNoError(true)
            })
            .catch((err) => console.log('err => ', err));
    }, [])

    const handleDownload = (e) => {
        e.preventDefault();
        fetch("/api/downloadFlow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "flowid": downloadFlow.id
            },
        })
        .then((response) => {
            return response.json()
        })
        .then((jsonData) => {
            const exportData = jsonData.exportData
            const exportBlob = new Blob([JSON.stringify(exportData, null, 2)], {
                type: "application/json",
            }); 

            const fileName = `${downloadFlow.id}.json`
            saveAs(exportBlob, fileName);
        })
        .catch((err) => console.log('err => ', err));
    }

    return (
        <div className='page'>
            {!isLoading ? 
                <>
                    <div className='row download-container'>
                            <select value={defaultFlow} onChange={e => setURL("", "", e.target.value)} className='select-container'>
                                {flowIDs.map((flow, i) => (
                                    <option key={i} value={flow.id}>
                                        {flow.name}
                                    </option>
                                ))}
                            </select>
                        <button className='download-btn' onClick={(e) => handleDownload(e)}><DownloadIcon /></button>   
                    </div>
                    {downloadFlow.description && <p className='download-des'>{downloadFlow.description}</p>}
                </>
            :
                <>
                    <p>Loading...</p>
                </>
            }
        </div>
    )
}


export default FlowDownload
