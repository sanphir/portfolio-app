import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

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
      <div style={{
        position: "relative",
        top: "30%",
      }}>

        <h1 style={{ padding: "10px 20px", textAlign: "center", color: "rgb(25, 118, 210)" }}>Access denied</h1>
        <h2 style={{ padding: "10px 20px", textAlign: "center", color: "rgb(25, 118, 210)" }}>You don't have enough privileges for perform this action!</h2>
        {locationFrom &&
          (
            <div style={{
              display: "flex",
              justifyContent: "center"
            }}>
              <Link to="/home" className="bacLink"
                style={{
                  fontWeight: "bold",
                  color: "rgb(25, 118, 210)",
                  textDecorationColor: "rgb(25, 118, 210)",
                }}> Back to "Home"</Link>
            </div>
          )}
      </div>
    </div>
  )
}

export default DeniedPage