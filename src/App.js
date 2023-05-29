import "./App.css";
// import { useState } from 'react';
import { theme } from "./component/commonLink/theme";
import { ThemeProvider } from "@material-ui/styles";
import Index from "./component/Index";
import Usestate from "./component/pages/Usestate";
import {  useState ,useEffect} from "react";


function App() {

useEffect(() => {
// let name = 'darpen'
// let capi = name.charAt(0).toUpperCase() + name.slice(1)
// console.log(capi)
}, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <Index />
      </ThemeProvider>
    </>
  );
}

export default App;
