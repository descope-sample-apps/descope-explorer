import '../App.css';
import React from 'react'
import DownloadIcon from '@mui/icons-material/Download'
import { saveAs } from "file-saver";


function FlowDownload({ defaultFlow, flowIDs, setURL }) {
    const downloadFlow = flowIDs.find(obj => obj.id === defaultFlow);

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
        </div>
    )
}


export default FlowDownload
