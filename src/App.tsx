import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

import { auth } from "./firebase/firebase";
import { setUser } from "./redux/authSlice";
import AppRouter from "./routes/AppRouter";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        dispatch(setUser(user));
      }
    );

    return () => unsubscribe();
  }, [dispatch]);

  return <AppRouter />;
}

export default App;