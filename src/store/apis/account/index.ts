import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SingleAccount } from "@sword/types/account";

type AccountCreateData = {
  email: string;
  name: string;
  password: string;
};

type CharacterCreateData = {
  name: string;
};

type PostResponse = {
  message: string;
};

// Define a service using a base URL and expected endpoints
export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  refetchOnMountOrArgChange: 60,
  endpoints: (builder) => ({
    getAccountByName: builder.query<{ account: SingleAccount }, string>({
      query: (name) => ({ url: `account/read?type=one&name=${name}&shouldBringRelations=true` }),
    }),
    postCreateAccount: builder.mutation<PostResponse, AccountCreateData>({
      query: (body) => ({
        url: "account/create",
        body,
        method: "POST",
      }),
    }),
    postCreateCharacter: builder.mutation<PostResponse, CharacterCreateData>({
      query: (body) => ({
        url: "character/create",
        body,
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAccountByNameQuery,
  usePostCreateAccountMutation,
  usePostCreateCharacterMutation,
} = accountApi;
