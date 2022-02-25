import { Heading, Spinner } from "@chakra-ui/react";
import { Layout } from "@sword/components/layout";
import { AdminDashboardTabs } from "@sword/components/tabs/admin";
import { useGetAllAccountsQuery } from "@sword/store/apis/account";
import type { GetServerSideProps, NextPage } from "next";

const AdminDashboard: NextPage = () => {
  const { data } = useGetAllAccountsQuery(null);

  if (!data) {
    return (
      <Layout pageTitle="Admin Panel" maxWidth="full" maxHeight="full">
        <Spinner />
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Admin Panel" maxWidth="full" maxHeight="full">
      <Heading textAlign="center">Admin Panel</Heading>
      <AdminDashboardTabs accounts={data.accounts} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default AdminDashboard;
