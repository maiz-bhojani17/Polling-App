import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";



const Signup = () => {


  const navigate = useNavigate();


  const [name, setName] = 
    useState("");


  const [email, setEmail] =
    useState("");


  const [password, setPassword] =
    useState("");


const [loading, setLoading] = 
    useState(false);


const handleSignup = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  setLoading(true);

  try {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await updateProfile(
      userCredential.user,
      {
        displayName: name,
      }
    );

    toast.success(
      "Account Created Successfully!"
    );

    navigate("/");

  } catch (error: any) {

    toast.error(error.message);

  } finally {

    setLoading(false);

  }

};



  return (
  <div className="signup-page">

    <div className="signup-left">

      <h1>🗳 Polling App</h1>

      <h2>Create Your Account 🚀</h2>

      <p>
        Join our Polling App and start creating
        polls, voting in real-time and managing
        everything from one dashboard.
      </p>

      <ul>
        <li>✅ Secure Firebase Authentication</li>
        <li>✅ Create Unlimited Polls</li>
        <li>✅ Vote in Real-Time</li>
        <li>✅ Beautiful Dashboard</li>
      </ul>

    </div>

    <div className="signup-card">

      <h2>Create Account</h2>

      <p>
        Create your account to continue
      </p>

      <form onSubmit={handleSignup}>


<div className="input-group">

  <label>Full Name</label>

  <input
    type="text"
    placeholder="Enter your full name"
    value={name}
    onChange={(e) =>
      setName(e.target.value)
    }
    required
  />

</div>


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

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

        </div>

        <button
          className="signup-btn"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "🚀 Create Account"}
        </button>

      </form>

      <div className="login-link">

        Already have an account?

        <Link to="/">
          Login
        </Link>

      </div>

    </div>

  </div>
);


};


export default Signup;