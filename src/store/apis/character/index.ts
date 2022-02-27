import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SingleAccount } from "@mantis/types/account";

type CharacterCreateData = {
  name: string;
};

type PostResponse = {
  message: string;
};

// Define a service using a base URL and expected endpoints
export const characterApi = createApi({
  reducerPath: "characterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/character/" }),
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getCharacterByName: builder.query<{ account: SingleAccount }, string>({
      query: (name) => ({ url: `read?type=one&name=${name}&shouldBringRelations=true` }),
    }),
    postCreateCharacter: builder.mutation<PostResponse, CharacterCreateData>({
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
export const { useGetCharacterByNameQuery, usePostCreateCharacterMutation } = characterApi;
