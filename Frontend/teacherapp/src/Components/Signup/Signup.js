import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/signup", {
        username,
        password,
      });
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error("Error signing up: " + err.message);
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
              <div className="card-body">
                <h5 className="card-title text-center">Signup Form</h5>
                <form onSubmit={handleSubmit}>
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
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-dark w-100">
                    Signup
                  </button>
                  <div className="sign-up mt-4 d-flex justify-content-center">
                    <a href="/login">Already have account </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
