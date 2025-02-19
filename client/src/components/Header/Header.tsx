import { Link } from "react-router-dom"
import { useTheme } from "../../ThemeContext";
import './Header.css'
import ProfilePicture from "../../assets/thispersondoesnotexist.jpg"

export const Header = () => {

    const { darkMode, toggleTheme } = useTheme();

    return (
        <header>
            <div className="theme-grade-container">
                <div className="theme-container">
                    <button onClick={toggleTheme} className="px-4 py-2 border rounded">
                        {darkMode ? "🌙" : "☀️"}
                    </button>
                </div>
                <div className="grade-container">
                    Classe
                </div>
            </div>
            <div className="logo-container">
                <Link to='/'>CIDWI</Link>
            </div>
            <div className="user-identity-container">
                <div className="user-name-container">
                    NOM Prénom
                </div>
                <div className="user-photo-container">
                    <Link to='/'><img src={ProfilePicture} alt="Photo de profil"/></Link>
                </div>
            </div>   
        </header>
    )
}