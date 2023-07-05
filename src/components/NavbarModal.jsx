import { useState } from "react"
import Modal from '@mui/material/Modal';
import "../App.css"


function NavbarModal ({ openModal, setOpenModal, defaultTheme, defaultProjectId, defaultFlow }) {
    const [settings, setSettings] = useState({
        thisTheme: "",
        thisProject: "",
        thisFlow: ""
    });

    const handleSubmit = () => {
        var url = new URL(window.location.href);
        var search_params = url.searchParams;

        search_params = checkSetParam('theme', search_params, settings.thisTheme)
        search_params = checkSetParam('project', search_params, settings.thisProject)
        search_params = checkSetParam('flow', search_params, settings.thisFlow)

        url.search = search_params.toString();
        const new_url = url.toString();
        window.location.replace(new_url) 
    }

    const handleChange = (e) => {
        setSettings({
          ...settings,
          [e.target.name]: e.target.value
        });
    };

    const checkSetParam = (param, search_params, val) => {
        let new_search = search_params
        if (val) { new_search.set(param, val) }
        return new_search
    }

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
                            <input type="text" name="thisProject" placeholder={defaultProjectId} onChange={(e) => handleChange(e)} />
                            <label className="settings-label">Flow ID:</label>
                            <input type="text" name="thisFlow" placeholder={defaultFlow} onChange={(e) => handleChange(e)} />
                            <label className="settings-label">Theme:</label>
                            <input type="text" name="thisTheme" placeholder={defaultTheme} onChange={(e) => handleChange(e)} />
                        </div>
                        <button className="update-btn" onClick={() => handleSubmit()}>Update</button>
                    </>
                }
            </div>
        </Modal>
    )
}


export default NavbarModal