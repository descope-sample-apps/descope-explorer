import '../App.css';
import { useState, useEffect } from 'react'
import DownloadIcon from '@mui/icons-material/Download'
import {saveAs} from "file-saver";
import { Skeleton } from '@mui/material';


function FlowDownload() {
    const [flowIDs, setFlowIDs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [downloadFlow, setDownloadFlow] = useState({})
    
    useEffect(() => {
        fetch("/api/getFlows")
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                if (res) {
                    res.body.loaded = true;
                    const flowRes = res.body
                    setFlowIDs(flowRes)
                    setDownloadFlow(flowRes[0])
                    setIsLoading(false);
                    return
                }
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
                            <select onChange={e => setDownloadFlow(flowIDs[e.target.value])} className='select-container'>
                                {flowIDs.map((flow, i) => (
                                    <option key={i} value={i}>
                                        {flow.name}
                                    </option>
                                ))}
                            </select>
                        <button className='download-btn' onClick={(e) => handleDownload(e)}><DownloadIcon /></button>   
                    </div>
                    <p className='download-des'>{downloadFlow["description"]}</p>
                </>
            :
                <>
                    <Skeleton sx={{ borderRadius: "6px", bgcolor: "grey.200" }} className='row download-container' variant="rectangular"/>
                    <Skeleton sx={{ borderRadius: "6px", bgcolor: "grey.200" }} className='download-des' variant="rectangular"/>
                </>
            }
        </div>
    )
}


export default FlowDownload
