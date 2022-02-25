import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const newsImagesApi = createApi({
  reducerPath: "newsImagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    getNewsImages: builder.query<{ images: string[] }, unknown>({
      query: () => ({ url: `newsImages/read?type=all` }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNewsImagesQuery } = newsImagesApi;
