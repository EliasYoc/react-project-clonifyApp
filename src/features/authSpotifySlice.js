import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const RESPONSE_TYPE = "code";

const SCOPE = [
  "user-library-modify",
  "user-library-read",
  "user-modify-playback-state",
  "user-read-recently-played",
  "user-read-email",
  "user-top-read",
  "playlist-modify-public",
];
export const scopeString = encodeURIComponent(SCOPE.join(" "));

const initialState = {
  loading: "idle", //succeeded, pending, rejected, idle
  isAuth: false,
  needRefreshToken: false,
  token: {
    access_token: "",
    refresh_token: "",
    token_type: "",
    scope: "",
    expires_in: null,
  },
};
export const accessToken = createAsyncThunk(
  "authSpotify/accessToken",
  async (authOptions, { rejectWithValue, getState }) => {
    try {
      const res = await fetch("https://accounts.spotify.com/api/token", {
        ...authOptions,
      });
      const data = await res.json();
      const { authSpotify } = getState();
      const tokenInfo = {
        ...data,
        refresh_token: data.refresh_token || authSpotify.token.refresh_token,
      };
      // console.log("tokenInfo", tokenInfo);
      sessionStorage.setItem("clonify-req-token", JSON.stringify(tokenInfo));
      return tokenInfo;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const authSpotifySlice = createSlice({
  name: "authSpotify",
  initialState,
  reducers: {
    isAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    addToken: (state, action) => {
      state.token = action.payload;
    },
    setNeedRefreshToken: (state, action) => {
      state.needRefreshToken = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(accessToken.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(accessToken.fulfilled, (state, action) => {
        state.loading = "fullfilled";
        state.isAuth = true;
        state.token = action.payload;
      })
      .addCase(accessToken.rejected, (state) => {
        state.loading = "rejected";
        state.isAuth = false;
      });
  },
});

export const { isAuth, addToken, setNeedRefreshToken } =
  authSpotifySlice.actions;
export const selectAuth = (state) => state.authSpotify.isAuth;
export const selectLoading = (state) => state.authSpotify.loading;
export const selectRequestToken = (state) => state.authSpotify.token;
export const selectNeedRefreshToken = (state) =>
  state.authSpotify.needRefreshToken;
export default authSpotifySlice.reducer;
