import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import "../styles/common.css";
interface StateFrom {
  from: string;
}

const DeniedPage = () => {
  const location = useLocation();
  let locationFrom = (location.state as StateFrom)?.from;

  return (
    <div style={{
      display: "block",
      justifyContent: "center",
      width: "100%",
      height: window.innerHeight - 60,
    }}>
      <div className="darkHeadersContainer" style={{
        position: "relative",
        top: "30%",
        backgroundColor: "aliceblue",
        width: "220px",
        height: "220px",
        margin: "auto",
        padding: "100px",
        borderRadius: "50%"
      }}>

        <h1 style={{ textAlign: "center" }}>Access denied</h1>
        <br />
        <h3 style={{ textAlign: "center" }}>You don't have enough privileges for perform this action!</h3>
        <br />
        {locationFrom &&
          (
            <div style={{
              display: "flex",
              justifyContent: "center"
            }}>
              <Link to="/home" className="bacLink"
                style={{
                  fontWeight: "bold",
                  fontSize: "large",
                  color: "cadetblue",
                  textDecorationColor: "cadetblue",
                }}> Back to "Home"</Link>
            </div>
          )}
      </div>
    </div>
  )
}

export default DeniedPage