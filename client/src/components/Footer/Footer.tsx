import "./Footer.css"

export const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} CIDWI. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

