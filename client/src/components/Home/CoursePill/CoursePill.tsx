import { Link } from "react-router-dom"
import "./CoursePill.css"

export const CoursePill = () => {
    return (
        <Link to="/" className="course-pill-container">
            <div className="course-pill-informations">
                <div className="course-pill-level-time">
                    <div className="course-pill-level">
                        <button>HMTL</button>
                        <button>FACILE</button>
                    </div>
                    <div className="course-pill-time">
                        <p>2H</p>
                    </div>
                </div>
                <div className="course-pill-name">
                    <p>INTRODUCTION AU HTML</p>
                </div>
            </div>
            <div className="course-pill-progress">
                <p>25%</p>
            </div>
        </Link>
    )
}
