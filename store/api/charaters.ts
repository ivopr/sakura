import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Character = {
  name: string;
};

// Define a service using a base URL and expected endpoints
export const charactersApi = createApi({
  reducerPath: "charactersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/characters/`,
  }),
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getAllCharacters: builder.query<Character[], null>({
      query: () => ({ url: "read" }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllCharactersQuery } = charactersApi;
