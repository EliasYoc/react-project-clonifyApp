import { createSlice } from "@reduxjs/toolkit";

const storageTheme = JSON.parse(localStorage.getItem("theme-clonify"));
const initialState = {
  darkMode: storageTheme?.mode || "dark",
  colorTheme: storageTheme?.color || "",
};

const themesSlice = createSlice({
  name: "themes",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setColorTheme: (state, action) => {
      state.colorTheme = action.payload;
    },
  },
});

export const { setColorTheme, setDarkMode } = themesSlice.actions;
export const selectThemes = (state) => state.themes;
export default themesSlice.reducer;
