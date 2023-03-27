import './App.css';
// import { useState } from 'react';
import { theme } from './component/commonLink/theme'
import { ThemeProvider } from "@material-ui/styles";
import Index from './component/Index';
import Usestate from './component/pages/Usestate';
// import { Provider, useDispatch, useSelector} from "react-redux";
// import { addnumbers , removenumbers ,datastate} from './component/dataSlice';

function App() {
  // const [count, setCount] = useState(0);
  // const data = useSelector(datastate)
  // const dispatch = useDispatch()
  // let addnumber = () => {
  //   dispatch(addnumbers())
  // }
  // let removenumber = () => {
  //   dispatch(removenumbers())
  // }
  return (
    <>
    <ThemeProvider theme={theme}>
    <Index />
    {/* <Usestate /> */}
    </ThemeProvider>
   
    </>
  );
}

export default App;
