import { Link } from "react-router-dom"
import './Header.css'
import ProfilePicture from "../../assets/thispersondoesnotexist.jpg"

export const Header = () => {

    return (
        <header>
            <div className="theme-grade-container">
                <div className="theme-container">
                    Bouton thème
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