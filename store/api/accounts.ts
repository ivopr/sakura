import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type PostResponse = {
  message: string;
};

// Define a service using a base URL and expected endpoints
export const accountsApi = createApi({
  reducerPath: "accountsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/accounts/" }),
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getAccountByName: builder.query<Account, string>({
      query: (name) => ({
        url: `read?type=one&name=${name}&shouldBringRelations=true`,
      }),
    }),
    getAllAccounts: builder.query<Account[], null>({
      query: () => ({ url: `read?type=all&shouldBringRelations=true` }),
    }),
    postCreateAccount: builder.mutation<PostResponse, AccountCreateData>({
      query: (body) => ({
        url: "create",
        body,
        method: "POST",
      }),
    }),
    putUpdateAccount: builder.mutation<PostResponse, AccountUpdateData>({
      query: (body) => ({
        url: "update",
        body,
        method: "PUT",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAccountByNameQuery,
  useGetAllAccountsQuery,
  usePostCreateAccountMutation,
  usePutUpdateAccountMutation,
} = accountsApi;
