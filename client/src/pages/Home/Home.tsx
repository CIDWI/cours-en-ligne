import { CoursePill } from "../../components/Home/CoursePill/CoursePill"
import { MoreResources } from "../../components/Home/MoreResources/MoreResources"
import { Page } from "../../components/Page/Page"
import './Home.css'

function Home() {
  return (
    <Page>
      <div className="homepage-container">
        <h1>Mon avancement</h1>
        <CoursePill />
        <CoursePill />
        <CoursePill />
        <MoreResources />
      </div>
    </Page>
  )
}

export default Home