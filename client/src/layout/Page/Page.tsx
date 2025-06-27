import { Header } from "../../components/Header/Header"
import { Footer } from "../../components/Footer/Footer"
import './Page.css'


const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <main className="children-container">
      {children}
    </main>
    <Footer />
  </>
)

export default Page