export const Home = () => {
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
                <h2 style={{ padding: "10px 20px", textAlign: "center", color: "rgb(25, 118, 210)" }}>Welcome!</h2>
                <h3 style={{ padding: "10px 20px", textAlign: "center", color: "rgb(25, 118, 210)" }}>This is a simple demo app that I use to learn react.</h3>
            </div>
        </div>
    )
}
