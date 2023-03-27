import { makeStyles } from "@material-ui/styles";

const useMuiStyle = makeStyles((theme) => ({

setProductpaper: {
  textAlign: "left",
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  margin: "auto",
  maxWidth: "1500px",
  borderRadius: "10px",
  marginTop: "30px",
},
tabletdicon:{
  fontFamily:["Poppins", "sans-serif", "!important"],
  justifyContent: 'center',
  padding:'8px !important',
  color:'#202223 !important'
},
setmodeldisplayerr: {
  position: "absolute",
  height: "auto",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white !important",
  boxShadow: `${theme.shadows[8]}`,
  borderRadius: "9px !important",
  padding: 10,
},
setmodeldisplay: {
  position: "absolute",
  height: "auto",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white !important",
  boxShadow: `${theme.shadows[8]}`,
  borderRadius: "9px !important",
  padding: 10,
},
}))

export default useMuiStyle;