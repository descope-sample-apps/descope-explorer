import { useState } from "react"

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SettingsIcon from '@mui/icons-material/Settings';
import Modal from '@mui/material/Modal';

import Logo from "../assets/logo.png"

import "../App.css"


function Navbar({ theme, setTheme, defaultProjectId, flow }) {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const [openQuestion, setOpenQuestion] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);

    const [settings, setSettings] = useState({
        thisTheme: "",
        thisProject: "",
        thisFlow: ""
    });

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        setSettings({
          ...settings,
          [e.target.name]: e.target.value
        });
    };

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

    const checkSetParam = (param, search_params, val) => {
        let new_search = search_params
        if (val) {
            new_search.set(param, val)
        }
        console.log(new_search)
        return new_search
    }

    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } 

    const changeTheme = (theme) => {
        var url = new URL(window.location.href)
        url.searchParams.set("theme", theme)
        window.location.replace(url.toString()) 
        setTheme(theme)
    }

    return (
        <nav className="navbar">
            <a className="logo-link" target="_blank" rel="noreferrer" href="https://www.descope.com/">
                <img className="logo" src={Logo} alt="" />
            </a>
            {isNavExpanded ? 
                <CloseIcon className="hamburger" onClick={() => {setIsNavExpanded(!isNavExpanded)}}/>
                :
                <MenuIcon className="hamburger" onClick={() => {setIsNavExpanded(!isNavExpanded)}}/>
            }
            <div className={isNavExpanded ? "navbar-menu expanded" : "navbar-menu"}>
                <ul>
                    <li>
                        <a target="_blank" rel="noreferrer" className="nav-link nav-space" href="https://docs.descope.com/">Docs</a>
                    </li>
                    <li>
                        <a target="_blank" rel="noreferrer" className="nav-link nav-space" href="https://www.descope.com/sign-up">Sign Up</a>
                    </li>
                    <li>
                        <a target="_blank" rel="noreferrer" className="nav-link" href="https://authtown.slack.com/">Join the Slack</a>
                    </li>
                    <li>    
                        <a target="_blank" rel="noreferrer" className={theme==="light" ? "nav-link bg-gray curved light-hover": "nav-link bg-gray curved gradient-border"} href="https://github.com/descope-sample-apps/descope-explorer/"><p className="star">&#9733;</p> Star Us on GitHub</a>
                    </li>
                    <li className="navbar-btn-li">
                        {theme === "light" ? 
                            <button className="navbar-btn round-btn question-icon" onClick={() => setOpenQuestion(true)}><QuestionMarkIcon /></button>
                            :
                            <button className="navbar-btn round-btn question-icon" onClick={() => setOpenQuestion(true)}><QuestionMarkIcon /></button>
                        }
                        <Modal
                            open={openQuestion}
                            onClose={() => setOpenQuestion(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            className="page"
                        >
                            <div className="page question-modal">
                                <h1 className="questions-modal-title">Info</h1>
                                <div className="inner-question-container">
                                    <p className="question">What is Descope Explorer?</p>
                                    <p>Descope Explorer is an easy way to demo your own project authentication flows.</p>
                                    <p className="question">How can I add my own project id, flow id, and theme?</p>
                                    <p>1. Add it to the URL and format it like this: <br /> <br /><span className="question-ans-break">https://descope-explorer.com/?project={defaultProjectId}&flow=sign-up-or-in&theme=dark</span></p>
                                    <p className="question">OR</p>
                                    <p>2. Click on the settings icon on the top right navbar to modify all the parameters through input fields.</p>
                                </div>
                            </div>
                        </Modal>
                    </li>
                    <li className="navbar-btn-li">
                        {theme === "light" ? 
                            <button className="navbar-btn round-btn settings-icon" onClick={() => setOpenSettings(true)}><SettingsIcon /></button>
                            :
                            <button className="navbar-btn round-btn settings-icon" onClick={() => setOpenSettings(true)}><SettingsIcon /></button>
                        }
                        <Modal
                            open={openSettings}
                            onClose={() => setOpenSettings(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            className="page"
                        >
                            <div className="page question-modal">
                                <h1 className="questions-modal-title">Settings</h1>
                                <p className="settings-tagline">Try modifying the default values with your own project info!</p>
                                <div className="settings-form">
                                    <label className="settings-label">Project ID:</label>
                                    <input type="text" name="thisProject" placeholder={defaultProjectId} onChange={(e) => handleChange(e)} />
                                    <label className="settings-label">Flow ID:</label>
                                    <input type="text" name="thisFlow" placeholder={flow} onChange={(e) => handleChange(e)} />
                                    <label className="settings-label">Theme:</label>
                                    <input type="text" name="thisTheme" placeholder={theme} onChange={(e) => handleChange(e)} />
                                </div>
                                <button className="update-btn" onClick={() => handleSubmit()}>Update</button>
                            </div>
                        </Modal>
                    </li>
                    <li className="navbar-btn-li">
                        {theme === "light" ? 
                            <button className="navbar-btn round-btn" onClick={() => changeTheme("dark")}><DarkModeIcon /></button>
                            :
                            <button className="navbar-btn round-btn" onClick={() => changeTheme("light")}><LightModeIcon /></button>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar














