import '../App.css';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


function Navbar({ theme, setTheme }) {
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
        <div className="navbar">
            {theme === "dark" ? 
                <button onClick={() => changeTheme("light")}><DarkModeIcon fontSize="large"/></button>
                :
                <button onClick={() => changeTheme("dark")}><LightModeIcon fontSize="large"/></button>
            }
        </div>
    )
}


export default Navbar

