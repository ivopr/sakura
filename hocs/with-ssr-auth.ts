import dayjs from "dayjs";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession } from "next-auth/react";

export function withSSRAuth<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const session = await getSession(context);

    if (dayjs().isBefore(dayjs(session?.expires))) {
      try {
        return await fn(context);
      } catch (err) {
        return {
          props: {} as P,
        };
      }
    }

    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  };
}
