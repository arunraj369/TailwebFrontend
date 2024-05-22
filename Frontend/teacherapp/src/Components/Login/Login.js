import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      toast.success(response.data.message);
      navigate("/home");
    } catch (err) {
      toast.error(
        "Error logging in: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div
      className="body"
      style={{ backgroundColor: "#FAFAFA", height: "100vh" }}
    >
      <div className="wrapper d-flex align-items-center justify-content-center h-100">
        <div className="row">
          <div className="" style={{ marginLeft: "25%", color: "red" }}>
            <h3>tailwebs</h3>
          </div>
          <div className="col-12 col-md-auto">
            <div className="card login-form">
              <div className="col-12 col-md-auto card-body">
                <h5 className="card-title text-center">Login Form</h5>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-dark w-100">
                    Login
                  </button>
                  <div className="sign-up mt-4 d-flex justify-content-center">
                    <a href="/signup">Signup</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
