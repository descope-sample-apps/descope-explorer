import '../App.css';
import { useState, useEffect } from 'react'
import DownloadIcon from '@mui/icons-material/Download'

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function FlowDownload() {
    const [flowIDs, setFlowIDs] = useState([])
    const [downloadFlow, setDownloadFlow] = useState(flowIDs[0].id)

    useEffect(() => {
        fetch("/api/getFlows")
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((res) => {
            if (res) {
                console.log(res)
                res.body.loaded = true;
                return setFlowIDs(res.body.data.flows)
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
