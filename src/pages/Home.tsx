import "../styles/common.css";
import avatar from '../images/avatar.jpg';

export const Home = () => {
    return (
        <div style={{
            display: "block",
            justifyContent: "center",
            height: window.innerHeight - 60,
        }}>
            <div style={{
                position: "relative",
                paddingTop: "100px"
            }}>
                <div className="contentCenterBlock">
                    <img src={avatar} style={{
                        borderRadius: "50%",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "50%"
                    }} alt="avatar" />
                </div>
                <div style={{
                    width: "700px",
                    margin: "auto",
                    color: "gainsboro",
                    fontSize: "larger",
                    padding: "0 20px"
                }}>
                    <h2 style={{ padding: "10px 20px", textAlign: "center" }}>Welcome to my portfolio!</h2>
                    <br />
                    <p>Hi, I'm Nikolai and I'm a full-stack developer with over 10 years of experience.</p>
                    <p>My main tech stack is C#, .Net, React, SQL.</p>
                    <br />
                    <p>This website is not a real business application, it's just a small portfolio showing different ways to implement application elements such as login, navigation, data manipulation, validation, pagination, search, etc.</p>
                    <p>You can use <b>admin/admin</b> credentials to test the application.</p>
                    <br />
                    <p>Frontend implemented in React 18 using Material UI components, Redux, TypeScript, React router and etc</p>
                    <p>Backend implemented on .net 6.0 platform using EF Core.</p>
                    <br />
                    <p>The source code of the projects can be found on github:</p>
                    <p>Backend part at <a href="https://github.com/sanphir/StudyWebApp" target="_blank" rel="noopener noreferrer">github.com/sanphir/StudyWebApp</a></p>
                    <p>And frontend part at <a href="https://github.com/sanphir/study-app" target="_blank" rel="noopener noreferrer">github.com/sanphir/study-app</a></p>
                    <br />

                </div>
            </div>
        </div>
    )
}
