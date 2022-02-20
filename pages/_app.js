import "../styles/globals.css";
import { UserProvider } from "../contexts/userContext";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { app, auth } from "../lib/fbInstance";
import Modal from "react-modal";
import { getPerformance } from "firebase/performance";
import { getAnalytics } from "firebase/analytics";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({ user: null, isLoading: true });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ user, isLoading: false });
      } else {
        setUser({ user: null, isLoading: false });
      }
    });
    const analytics = getAnalytics();
    const performance = getPerformance(app);
  }, []);

  Modal.setAppElement("#__next");

  return (
    <UserProvider value={user}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
