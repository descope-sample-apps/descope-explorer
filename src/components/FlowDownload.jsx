import '../App.css';
import { useState, useEffect } from 'react'
import DownloadIcon from '@mui/icons-material/Download'

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function FlowDownload() {
    const [flowIDs, setFlowIDs] = useState([])
    const [downloadFlow, setDownloadFlow] = useState()

    useEffect(() => {
        fetch("/api/getFlows")
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((res) => {
            if (res) {
                res.body.loaded = true;
                const flowData = res.body.data.flows
                setFlowIDs(flowData)
                setDownloadFlow(flowData[0].id)
                return
            }
        })
        .catch((err) => console.log('err => ', err));
    }, [])

    const handleSelect = (e) => {
        setDownloadFlow(e.target.value);
    };

    const handleDownload = (e) => {
        e.preventDefault();
        console.log("download")
    }

    return (
        <div className='row download-container'>
            <p className='download-txt'>Download</p>
            <Select
                value={downloadFlow}
                onChange={handleSelect}
            >
                {flowIDs.map((flow, i) => (
                    <MenuItem
                        key={i}
                        value={flow.id}
                    >
                        {flow.name}
                    </MenuItem>
                ))}
            </Select>
            <button className='download-btn' onClick={(e) => handleDownload(e)}><DownloadIcon /></button>   
        </div>
    )
}


export default FlowDownload
