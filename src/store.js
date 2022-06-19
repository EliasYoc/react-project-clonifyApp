import { configureStore } from "@reduxjs/toolkit";
import authSpotifyTokenReducer from "./features/authSpotifySlice";
import { spotifyApi } from "./services/spotify";

export const store = configureStore({
  reducer: {
    authSpotify: authSpotifyTokenReducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spotifyApi.middleware),
});
