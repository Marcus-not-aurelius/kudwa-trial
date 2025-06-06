import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <>
      <div className="landing-header">
        <h1>Kudwa-ish</h1>
        <Link to="/dashboard" className="landing-button">
          Go to App
        </Link>
      </div>
      <div className="landing-container">
        <div className="landing-content">
          <h1 className="landing-title">Welcome to <span className="title-highlighted">Kudwa</span></h1>
          <p className="landing-subtitle">Your data, visualized beautifully.</p>
          <Link to="/dashboard" className="landing-button">
            Go to App
          </Link>
        </div>
      </div>
    </>
  );
}