import { green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
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
