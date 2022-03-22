import { players, Prisma } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type PostResponse = {
  message: string;
};

// Define a service using a base URL and expected endpoints
export const charactersApi = createApi({
  reducerPath: "charactersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/characters/" }),
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getCharacterByName: builder.query<{ account: players }, string>({
      query: (name) => ({ url: `read?type=one&name=${name}&shouldBringRelations=true` }),
    }),
    postCreateCharacter: builder.mutation<
      PostResponse,
      Omit<Prisma.playersCreateInput, "conditions">
    >({
      query: (body) => ({
        url: "create",
        body,
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCharacterByNameQuery, usePostCreateCharacterMutation } = charactersApi;
