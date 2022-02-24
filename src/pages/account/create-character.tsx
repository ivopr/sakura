import { Layout } from "@sword/components/layout";
import { GetServerSideProps, NextPage } from "next";
import { useTranslations } from "next-intl";

const CreateCharacter: NextPage = () => {
  const translate = useTranslations("account.create-character");

  return (
    <Layout pageTitle={translate("title")}>
      <h1>alo</h1>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`@sword/locales/${locale}.json`)).default,
    },
  };
};

export default CreateCharacter;
