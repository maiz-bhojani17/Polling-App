import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { logoutUser } from "../redux/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menu, setMenu] = useState(false);

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);

      dispatch(logoutUser());

      toast.success("Logout Successful!");

      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserName = () => {
    if (!user?.email) return "Guest";

    return user.email.split("@")[0];
  };

  return (
    <nav className="navbar">
      {/* Logo */}

      <div className="nav-logo">
        🗳 Polling App
      </div>

      {/* Mobile Button */}

      <button
        className="menu-btn"
        onClick={() => setMenu(!menu)}
      >
        {menu ? "✕" : "☰"}
      </button>

      {/* Links */}

      <div
        className={
          menu
            ? "nav-links active"
            : "nav-links"
        }
      >
        <NavLink
          to="/dashboard"
          onClick={() => setMenu(false)}
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/create-poll"
          onClick={() => setMenu(false)}
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          ➕ Create Poll
        </NavLink>

        <NavLink
          to="/profile"
          onClick={() => setMenu(false)}
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          👤 Profile
        </NavLink>

        {/* User */}

        <div className="nav-user">
          <div className="avatar">
            {getUserName()
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="user-info">
            <span className="username">
              {getUserName()}
            </span>

            <span className="email">
              {user?.displayName || user?.email}
            </span>
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;