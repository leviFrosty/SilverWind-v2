import React, { useContext } from "react";
import Layout from "../../components/layout";
import LoginPage from "../../components/LoginPage";
import UserContext from "../../contexts/userContext";
import SpinnerFullScreen from '../../components/SpinnerFullScreen';
import AdminDashboard from "../../components/AdminDashboard";

export default function Admin() {
  const { user, isLoading } = useContext(UserContext);
  // REFACTOR START

  // REFACTOR END

  // TODO: Refactor to server side render.
  const handlePageSelection = () => {
    if (user.uid == "bTgRT75RGXMxZZFWnAySPVvVh5t2") {
      return <AdminDashboard/>
    } else {
      return <LoginPage/>
    }
  }

  return (
    <Layout>
      {isLoading ? <SpinnerFullScreen/> : handlePageSelection()}
    </Layout>
  );
}
