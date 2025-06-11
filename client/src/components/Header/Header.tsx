import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { useTheme } from "../../ThemeContext";
import './Header.css'
import Logo from "../../assets/Logo_cidwi.png"

export const Header = () => {

    const { darkMode, toggleTheme } = useTheme();
    const navbarRef = useRef<HTMLElement | null>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header ref={navbarRef} className={`navbar ${scrolled ? "scrolled" : ""} ${darkMode === true ? "dark" : "   "}`}>
            <div className="logo-theme-container">
                <div className="logo-container">
                    <Link to='/'>
                        <img src={Logo} alt="Logo Cidwi" />
                        <p>CIDWI</p>
                    </Link>
                </div>
                <div className="theme-container">
                    <div className="theme-container">
                        <button onClick={toggleTheme} className="px-4 py-2 border rounded">
                            {darkMode ? "🌙" : "☀️"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="user-identity-container">
                <div className="grade-container">
                    Classe
                </div>
                <div className="user-name-container">
                    NOM Prénom
                </div>
            </div>   
        </header>
    )
}