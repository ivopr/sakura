import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GuildRank } from "@sword/types/guildRanks";

// Define a service using a base URL and expected endpoints
export const guildRanksApi = createApi({
  reducerPath: "guildRanksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    getGuildRanks: builder.query<{ guildsRank: GuildRank[] }, unknown>({
      query: () => ({ url: `guildRanks/read?type=all` }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetGuildRanksQuery } = guildRanksApi;
