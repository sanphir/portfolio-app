import "../styles/common.css";

const NotFound = () => {
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

        <h1 style={{ padding: "10px 20px", textAlign: "center" }}>404</h1>
        <h2 style={{ padding: "10px 0", textAlign: "center" }}>Page not found!</h2>

        <h3 style={{ padding: "10px 10px", textAlign: "center" }}>Ooops! We can't find the page.</h3>
      </div>
    </div>
  )
}

export default NotFound