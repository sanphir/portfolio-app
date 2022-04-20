import { borderRadius } from '@mui/system'
import React from 'react'

export const Home = () => {
    return (
        <div style={{
            display: "block",
            justifyContent: "center",
            margin: "40px",
            width: "100%",
            minHeight: "300px"
        }}>
            <h2 style={{ padding: "10px 20px", textAlign: "center", color: "rgb(25, 118, 210)" }}>Welcome!</h2>

            <h3 style={{ padding: "10px 20px", textAlign: "center", color: "rgb(25, 118, 210)" }}>It's just a simple demo app with which I learn react technologies</h3>

        </div>
    )
}
