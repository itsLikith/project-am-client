import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/LoginPage.css";
import { useState } from "react";

const LoginPage = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordChange = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-page">
            <form className="border border-2 p-4">
                {
                    (props.userType === "security")
                    ?
                        <p className="h6 text-center m-4">Security Personnel Login</p>
                    :
                    (props.userType === "admin")
                    ?
                        <p className="h6 text-center m-4">Admin Login</p>
                    :
                    null
                }
                <div className="form-floating">
                    <input
                        type="text"
                        value={username}
                        className="form-control"
                        placeholder="Enter Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="username">Enter Username</label>
                </div>
                <div className="form-floating mt-1 mb-1">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="passkey"
                        value={password}
                        className="form-control"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Enter Password</label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        id="showPwd"
                        className="form-check-input"
                        checked={showPassword}
                        onChange={handleShowPasswordChange}
                    />
                    <label htmlFor="showpassword" className="form-check-label">
                        Show Password
                    </label>
                </div>
                <input type="submit" className="btn btn-success mt-2 p-2 w-100" />
            </form>
        </div>
    );
};

export default LoginPage;