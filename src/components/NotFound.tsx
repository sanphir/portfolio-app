const NotFound = () => {
  return (
    <div style={{
      display: "block",
      justifyContent: "center",
      margin: "40px",
      width: "100%",
      minHeight: "300px"
    }}>

      <h1 style={{ padding: "10px 20px", textAlign: "center", color: "rgb(25, 118, 210)" }}>404</h1>
      <h2 style={{ padding: "10px 20px", textAlign: "center", color: "rgb(25, 118, 210)" }}>Page not found!</h2>

      <h3 style={{ padding: "10px 20px", textAlign: "center", color: "rgb(25, 118, 210)" }}>Ooops! We can't find thepage.</h3>

    </div>
  )
}

export default NotFound