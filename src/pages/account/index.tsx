import { Spinner } from "@chakra-ui/react";
import { Layout } from "@sword/components/layout";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

const AccountRedirect: NextPage = () => {
  return (
    <Layout pageTitle="redirecting...">
      <Spinner color="primary.500" emptyColor="gray.600" size="xl" />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx });

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
    redirect: {
      destination: `/account/${session.user?.name}`,
      permanent: false,
    },
  };
};

export default AccountRedirect;
