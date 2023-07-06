import { useState } from "react"
import Modal from '@mui/material/Modal';
import "../App.css"


function NavbarModal ({ openModal, defaultTheme, defaultProjectId, defaultFlow, setOpenModal, setURL }) {
    const [settings, setSettings] = useState({
        settingTheme: "",
        settingProject: "",
        settingFlow: ""
    });

    const handleChange = (e) => {
        setSettings({
          ...settings,
          [e.target.name]: e.target.value
        });
    };

    return (
        <Modal
            open={openModal.open}
            onClose={() => setOpenModal({open: false, modalType: ""})}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="page"
        >
            <div className="page question-modal">
                <h1 className="questions-modal-title">{openModal.modalType}</h1>
                {openModal.modalType === "Questions" ? 
                    <div className="inner-question-container">
                        <p className="question">What is Descope Explorer?</p>
                        <p>Descope Explorer is an easy way to demo your own project authentication flows.</p>
                        <p className="question">How can I add my own project id, flow id, and theme?</p>
                        <p>1. Add it to the URL and format it like this: <br /> <br /><span className="question-ans-break">https://descope-explorer.com/?project={defaultProjectId}&flow=sign-up-or-in&theme=dark</span></p>
                        <p className="question">OR</p>
                        <p>2. Click on the settings icon on the top right navbar to modify all the parameters through input fields.</p>
                    </div>
                    :
                    <>
                        <p className="settings-tagline">Try modifying the default values with your own project info!</p>
                        <div className="settings-form">
                            <label className="settings-label">Project ID:</label>
                            <input type="text" name="settingProject" placeholder={defaultProjectId} onChange={(e) => handleChange(e)} />
                            <label className="settings-label">Flow ID:</label>
                            <input type="text" name="settingFlow" placeholder={defaultFlow} onChange={(e) => handleChange(e)} />
                            <label className="settings-label">Theme:</label>
                            <input type="text" name="settingTheme" placeholder={defaultTheme} onChange={(e) => handleChange(e)} />
                        </div>
                        <button className="update-btn" onClick={() => setURL(settings.settingTheme, settings.settingProject, settings.settingFlow)}>Update</button>
                    </>
                }
            </div>
        </Modal>
    )
}


export default NavbarModal