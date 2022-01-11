import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Container from "../../components/Container";
import SpinnerFullScreen from "../../components/SpinnerFullScreen";
import Layout, { siteTitlePrefix } from "../../components/layout";
import SuccessPage from "../../components/SuccessPage";
import UserContext from "../../contexts/userContext";

export default function Success() {
  const { user, isLoading } = useContext(UserContext);
  const {
    query: { session_id },
  } = useRouter();

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} Thank you!</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Container>
        {user ? <SuccessPage user={user} session_id={session_id} /> : null}
        {isLoading ? <SpinnerFullScreen /> : null}
      </Container>
    </Layout>
  );
}
