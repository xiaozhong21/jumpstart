import { green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
// import "@fontsource/open-sans";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
      lineHeight: "25px",
    },
    body1: {
      fontWeight: 600,
      lineHeight: "20px",
    },
  },
  palette: {
    primary: {
      light: "#00b1ac",
      main: "#00807b",
    },
    secondary: {
      main: green[500],
    },
  },
});

export default theme;
