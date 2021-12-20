import "../styles/globals.css";
import { UserProvider } from "../contexts/userContext";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { auth } from "../lib/fbInstance";
import Modal from "react-modal";

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
  }, []);

  Modal.setAppElement("#__next");

  return (
    <UserProvider value={user}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
