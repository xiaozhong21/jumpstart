import { green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import "@fontsource/open-sans";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans",
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
