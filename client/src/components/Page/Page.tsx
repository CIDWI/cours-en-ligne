import { PropsWithChildren } from "react";
import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"

export const Page = ({ children }: PropsWithChildren<PageProps>) => {
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