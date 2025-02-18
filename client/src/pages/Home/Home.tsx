import { CoursePill } from "../../components/CoursePill/CoursePill"
import { Page } from "../../components/Page/Page"
import './Home.css'

export const Home = () => {
  return (
    <Page>
      <div className="homepage-container">
        <h1>Mon avancement</h1>
        <div>
          <CoursePill />
          <CoursePill />
          <CoursePill />
        </div>
      </div>
    </Page>
  )
}
