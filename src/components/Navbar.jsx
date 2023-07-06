import { useState } from "react"

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SettingsIcon from '@mui/icons-material/Settings';
import Logo from "../assets/logo.png"

import "../App.css"



function Navbar({ theme, setURL, setOpenModal }) {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
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
                        <button className="navbar-btn question-icon" onClick={() => setOpenModal({open: true, modalType: "Questions"})}><QuestionMarkIcon /></button>
                    </li>
                    <li className="navbar-btn-li">
                        <button className="navbar-btn settings-icon" onClick={() => setOpenModal({open: true, modalType: "Settings"})}><SettingsIcon /></button>
                    </li>
                    <li className="navbar-btn-li">
                        {theme === "light" ? 
                            <button className="navbar-btn" onClick={() => setURL("dark")}><DarkModeIcon /></button>
                            :
                            <button className="navbar-btn" onClick={() => setURL("light")}><LightModeIcon /></button>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar














