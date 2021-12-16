import "../styles/globals.css";
import { UserProvider } from "../contexts/userContext";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { auth } from "../lib/fbInstance";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <UserProvider value={user}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
