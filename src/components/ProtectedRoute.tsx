import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../firebase/firebase";
import {
  setUser,
  setLoading,
} from "../redux/authSlice";
import type { RootState } from "../redux/store";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe =
      onAuthStateChanged(auth, (firebaseUser) => {
        dispatch(setUser(firebaseUser));
      });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;