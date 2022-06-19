import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1/",
    prepareHeaders: (headers, { getState }) => {
      const { token_type, access_token } = getState().authSpotify.token;
      if (access_token) {
        headers.set("Authorization", `${token_type} ${access_token}`);
        headers.set("content-type", "application/json");
        return headers;
      }
    },
  }),
  tagTypes: ["Releases"],
  endpoints: (builder) => ({
    //builder has the query and mutation methods
    getSpotifyData: builder.query({
      query: (endpoint) => endpoint,
      providesTags: ["Releases"],
      // provideTags is used to get when state changes i guess
    }),
    // updateblabla: builder.mutation({
    //   query: (id) => {},
    //   //iinvalidateTages is use to Delete,UPDATE, POST
    // }),
  }),
});
export const { useGetSpotifyDataQuery } = spotifyApi;
