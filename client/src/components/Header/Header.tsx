import { Link } from "react-router-dom"

export const Header = () => {

    return (
        <header>
            <div className="theme-grade-container">
                <div className="theme-container">
                    {/* Ajouter le bouton pour thèmes sombre et clair */}
                </div>
                <div className="grade-container">
                    {/* Ajouter la classe ou le rôle de l'utilisateur */}
                </div>
            </div>
            <div className="logo-container">
                <Link to='/'>Logo</Link>
            </div>
            <div className="user-identity-container">
                <div className="user-name-container">
                    {/* Nom et prénom de l'utilisateur */}
                </div>
                <div className="user-photo-container">
                    <img src="" alt="Photo de profil"/>
                </div>
            </div>   
        </header>
    )
}