import { createTheme } from "@material-ui/core";

export let theme = createTheme({
  palette: {
    primary: {
      main: "#3c8dbc",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 992,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),


  },


});
