import { Link } from "react-router-dom"

export const Header = () => {

    return (
        <header>
            <div>
                <div>
                    /* Ajouter les thèmes sombre et clair */
                </div>
                <div>
                    /* Ajouter la classe ou le rôle de l'utilisateur */
                </div>
            </div>
            <div>
                <Link to='/'>Logo</Link>
            </div>
            <div>
                <div>
                    /* Nom et prénom de l'utilisateur */
                </div>
                <div>
                    /* Photo de l'utilisateur */
                </div>
            </div>   
        </header>
    )
}