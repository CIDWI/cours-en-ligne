import { PropsWithChildren } from "react";
import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"
import './Page.css'

export const Page = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
        <div className="children-container">
          {children}
        </div>
      <Footer />
    </>
  )
}