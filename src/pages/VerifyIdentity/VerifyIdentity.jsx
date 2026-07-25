import "./VerifyIdentity.css";
import hero from "../../assets/images/hero.png";

function VerifyIdentity() {
  return (
    <div className="verify-container">
      <div className="left-section">
        <img src={hero} alt="Hero" className="hero-image" />
      </div>

      <div className="right-section">
        <h1>Verify your identity</h1>
      </div>
    </div>
  );
}

export default VerifyIdentity;