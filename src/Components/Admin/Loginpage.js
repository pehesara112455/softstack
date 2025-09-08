import React, { useState } from "react";
import '../../Styles/Adminstyles/Adminlogin.css';
import { PiPassword } from "react-icons/pi";
import { loginAdmin } from "../../Backend/Loginpageback"; // Make sure this path is correct

function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginAdmin(email, password);

      
      const allowedAdmins = ["upehesara827@gmail.com"];
      if (allowedAdmins.includes(user.email.trim())) {
        window.location.href = "/About";
      } else {
        setError("Unauthorized access");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="Login">
      <div className="Login-container">
        <p>COMUNITY EDUCATION CENTRE</p>
        <form onSubmit={handleLogin} className="loginlable-and-texbox">
          <div className="username">
            <label className="labale1">User name</label>
            <input
              type="text"
              className="user-textbox"
              placeholder="Enter Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <label className="lable2">Password</label>
            <input
              type="password"
              className="pw-textbox"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="Login-button">Login</button>
          {error && (
              <p style={{
                color: "red",
                fontSize: "12px",
                marginTop: "6px",
                textAlign: "center"
              }}>
                {error}
              </p>
)}
        </form>
      </div>
    </div>
  );
}

export default Loginpage;