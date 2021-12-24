import { useContext } from "react";
import Layout from "../../components/layout";
import UserContext from "../../contexts/userContext";
import LoginPage from "../../components/LoginPage";
import CartPage from "../../components/CartPage";
import SpinnerFullScreen from "../../components/SpinnerFullScreen";

export default function Cart() {
  const { user, isLoading } = useContext(UserContext);

  return (
    <Layout>
      {isLoading ? <SpinnerFullScreen /> : null}
      {user ? <CartPage user={user} /> : <LoginPage />}
    </Layout>
  );
}
