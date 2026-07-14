import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();

  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);

    toast.success("Logout Successfully");

    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">

        <div className="profile-card fade-in">

          <div className="profile-header">

            <div className="profile-avatar">

              {user?.email?.charAt(0).toUpperCase()}

            </div>

            <h1>
              👋 Welcome Back
            </h1>

            <h2 className="profile-name">

              {user?.email?.split("@")[0]}

            </h2>

            <p>
              View your account details and manage your profile securely.
            </p>

          </div>

          <div className="profile-info-grid">



            <div className="info-card">

              <span>
                🆔 User ID
              </span>

              <h3>

                {user?.uid?.slice(0, 20)}...

              </h3>

            </div>

            <div className="info-card">

              <span>
                ✔ Email Verification
              </span>

              <h3>

                {user?.emailVerified
                  ? "Verified"
                  : "Not Verified"}

              </h3>

            </div>

            <div className="info-card">

              <span>

                📅 Account Created

              </span>

              <h3>

                {user?.metadata.creationTime}

              </h3>

            </div>

            <div className="info-card">

              <span>

                ⏰ Last Login

              </span>

              <h3>

                {user?.metadata.lastSignInTime}

              </h3>

            </div>

          </div>

          <div className="profile-actions">

            <button
              className="profile-logout-btn"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default Profile;