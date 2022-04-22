import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

const NotFound = () => {
  const location = useLocation();
  console.log(`location=${JSON.stringify(location)}`);
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

        <h1 style={{ padding: "10px 20px", textAlign: "center", color: "rgb(25, 118, 210)" }}>404</h1>
        <h2 style={{ padding: "10px 20px", textAlign: "center", color: "rgb(25, 118, 210)" }}>Page not found!</h2>

        <h3 style={{ padding: "10px 20px", textAlign: "center", color: "rgb(25, 118, 210)" }}>Ooops! We can't find the page.</h3>
        <div style={{
          display: "flex",
          justifyContent: "center"
        }}>
        <Link to={location?.pathname ?? "/home"} className="bacLink"
        style={{
          fontWeight: "bold",
          color: "rgb(25, 118, 210)",
          textDecorationColor: "rgb(25, 118, 210)",
        }}> Back to {location?.pathname ?? "/home"}</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound