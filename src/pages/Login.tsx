import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { auth } from "../firebase/firebase";
import { setUser } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      dispatch(
        setUser(userCredential.user)
      );

      toast.success(
        "Login Successful!"
      );

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-left">

        <h1>
          🗳 Polling App
        </h1>

        <h2>
          Welcome Back 👋
        </h2>

        <p>
          Sign in to create polls, vote in real-time,
          and manage your dashboard with ease.
        </p>

        <ul>
          <li>✅ Secure Authentication</li>
          <li>✅ Real-Time Voting</li>
          <li>✅ Analytics Dashboard</li>
          <li>✅ Responsive Design</li>
        </ul>

      </div>

      <div className="login-card">

        <h2>
          Login
        </h2>

        <p>
          Access your account
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <div className="password-box">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <span
                className="eye-btn"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? "🙈" : "👁"}
              </span>

            </div>

          </div>

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "🚀 Login"}
          </button>

        </form>

        <div className="signup-link">

          Don't have an account?

          <Link to="/signup">

            Sign Up

          </Link>

        </div>
      </div>

    </div>
  );
};

export default Login;