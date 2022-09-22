import { configureStore } from "@reduxjs/toolkit";
import authSpotifyTokenReducer from "./features/authSpotifySlice";
import themesReducer from "./features/themesSlice";
import { spotifyApi } from "./services/spotify";

export const store = configureStore({
  reducer: {
    themes: themesReducer,
    authSpotify: authSpotifyTokenReducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spotifyApi.middleware),
});
