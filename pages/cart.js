import { useContext, useEffect } from "react";
import CenterTitle from "../components/CenterTitle";
import Layout from "../components/layout";
import { useRouter } from 'next/router';
import UserContext from "../contexts/userContext";


export default function Cart() {
  const user = useContext(UserContext);
  const router = useRouter();
  
  useEffect(() => {
    if (!user) return router.push("/login");
  }, [])



  return (
    <Layout>
      <CenterTitle>Cart</CenterTitle>
    </Layout>
  )
}
