import { useState } from "react"

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import FolderIcon from '@mui/icons-material/Folder';

import Logo from "../logo.png"
import SlackIcon from "../slack-icon.png"

import "../App.css"


function Navbar({ theme, setTheme }) {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } 

    const changeTheme = (mode) => {
        var url = new URL(window.location.href)
        url.searchParams.set('theme', mode)
        window.location.replace(url.toString()) 
        setTheme(mode)
    }

    return (
        <nav className="navbar">
            <a className="logo-link" href="#">
                <img className="logo" src={Logo} alt="" />
            </a>
            <FolderIcon className="hamburger" onClick={() => {setIsNavExpanded(!isNavExpanded)}}/>
            <div className={isNavExpanded ? "navbar-menu expanded" : "navbar-menu"}>
                <ul>
                    <li>
                        <a className="nav-link nav-space" href="#">Docs</a>
                    </li>
                    <li>
                        <a className="nav-link nav-space" href="#">Sign Up</a>
                    </li>
                    <li>
                        <a className="nav-link" href="#">Join Us<img className="slack-icon" src={SlackIcon} alt="slack-icon" /></a>
                    </li>
                    <li>    
                        <a className="nav-link bg-gray curved" href="#"><p className="star">&#9733;</p> Star Us on GitHub</a>
                    </li>
                    <li className="navbar-btn-li">
                        {theme === "light" ? 
                            <button className="navbar-btn" onClick={() => changeTheme("dark")}><LightModeIcon /></button>
                            :
                            <button className="navbar-btn" onClick={() => changeTheme("light")}><DarkModeIcon /></button>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar














