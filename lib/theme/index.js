import { createTheme } from "@mui/material/styles";
import { orange, grey } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    primary: {
      main: "rgb(229, 221, 191)",
      // contrastText: grey[900],
    },
    secondary: {
      main: "rgb(59, 73, 111)",
      contrastText: grey[900],
    },
  },
});

export default theme;
