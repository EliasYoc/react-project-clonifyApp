import { createSlice } from "@reduxjs/toolkit";

const storageTheme = JSON.parse(localStorage.getItem("theme-clonify"));
const initialState = {
  darkMode: storageTheme?.mode || "dark",
  colorTheme: storageTheme?.color || "",
  cssCustomProperties: {},
  cssCustomPropertiesAlpha: {},
  customThemeConfiguration: {
    isCustom: false,
    isOpenCustomThemeBox: false,
  },
  randomRgbOfUpperImg: {},
  elementsTransition: {
    outgoingElementBounding: null,
    incomingElementBounding: null,
  },
  // alphaHexNum: "ff",
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
    setIsCustom: (state, action) => {
      state.customThemeConfiguration.isCustom = action.payload;
    },
    setIsOpenCustomThemeBox: (state, action) => {
      state.customThemeConfiguration.isOpenCustomThemeBox = action.payload;
    },
    editCustomProperty: (state, { payload }) => {
      state.cssCustomProperties[payload.variable] = payload.colorHex;
    },
    addCustomProperties: (state, { payload }) => {
      state.cssCustomProperties = payload;
    },
    resetCustomProperties: (state) => {
      state.cssCustomProperties = {};
      state.cssCustomPropertiesAlpha = {};
    },
    addCustomPropertiesAlpha: (state, { payload }) => {
      state.cssCustomPropertiesAlpha = payload;
    },
    addCustomPropertyAlpha: (state, { payload }) => {
      state.cssCustomPropertiesAlpha[payload.variable] = payload.alpha;
      // debe ser como editCustomProperties, o tal vez modificar el mismo edit custom
    },
    editCustomPropertyAlpha: (state, { payload }) => {
      state.cssCustomProperties[
        payload.variable
      ] = `${state.cssCustomProperties[payload.variable].substring(0, 7)}${
        payload.alpha
      }`;
    },
    setRandomRgbColor: (state, { payload }) => {
      state.randomRgbOfUpperImg[payload.info] = payload.color;
    },

    setOutgoingElement: (state, { payload }) => {
      state.elementsTransition.outgoingElementBounding = payload;
    },
    setIncomingElement: (state, { payload }) => {
      state.elementsTransition.incomingElementBounding = payload;
    },
    resetElementTransition: (state) => {
      state.elementsTransition = initialState.elementsTransition;
    },
  },
});

export const {
  setColorTheme,
  setDarkMode,
  setIsCustom,
  setIsOpenCustomThemeBox,
  editCustomProperty,
  addCustomProperties,
  resetCustomProperties,
  addCustomPropertyAlpha,
  editCustomPropertyAlpha,
  addCustomPropertiesAlpha,
  setRandomRgbColor,
  setOutgoingElement,
  setIncomingElement,
  resetElementTransition,
} = themesSlice.actions;
export const selectThemes = (state) => state.themes;
export const selectCustomThemeConfig = (state) =>
  state.themes.customThemeConfiguration;
export const selectRandomRgb = (state) => state.themes.randomRgbOfUpperImg;
export const selectElementTransition = (state) =>
  state.themes.elementsTransition;
export default themesSlice.reducer;
