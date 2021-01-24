// https://material-ui.com/customization/default-theme

/* Global */
const globalStyle = {
  maxContentWidth: "1160px",
};

/* Breakpoints */
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1025,
    xl: 1920,
  },
};

/* Palette */
const colors = {
  primary: "#0092FF",
  secondary: "#FF6B90",
  darkRed: "#6c201f",
  pink: "#f8aaaa",
  lightPink: "#f7eaeb",
  palePink: "#fdfafa",
  orange: "#f18f01",
  yellow: "#fcba03",
  green: "#00d500",
  blue: "#2196f3",
  black: "#000000",
  grey: "#eee",
  white: "#ffffff",
  textPrimary: "#666",
  textDisabled: "#acacac",
  red: "#d50000",
};

const palette = {
  common: colors,
  primary: {
    main: colors.primary,
    contrastText: colors.white,
  },
  secondary: {
    main: colors.secondary,
    contrastText: colors.white,
  },
  error: {
    main: colors.red,
    contrastText: colors.white,
  },
  text: {
    primary: colors.textPrimary,
  },
  background: {
    default: colors.white,
  },
};

export default {
  globalStyle,
  breakpoints,
  palette,
};
