import '../App.css';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


function Theme({ theme, setTheme }) {
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
        <>
            {theme === "light" ? 
                <button className='theme-btn' onClick={() => changeTheme("dark")}><DarkModeIcon /></button>
                :
                <button className='theme-btn' onClick={() => changeTheme("light")}><LightModeIcon /></button>
            }
        </>
    )
}


export default Theme

