import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Divider, Grid, Paper } from "@material-ui/core";
import useMuiStyle from "../../commonLink/Muistyle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Document, Page } from 'pdfjs-dist/webpack';
import * as XLSX from 'xlsx';

// import axios from "../../commonLink/Axios"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pdfstate, PdfSlice, Pdfstatus } from "./PdfSlice";
const PdfRead = () => {
  const [file, setFile] = useState("");
  const classes = useMuiStyle();
  const dispatch = useDispatch();
  const state = useSelector(Pdfstate);


  // const handleimage = (e) => {
  //   let data = e.target.files[0]
  //   setFile(e.target.files[0]);
  //   console.log(data)
  //   const reader = new FileReader();
  //   reader.onloadend = async () => {
  //     const arrayBuffer = reader.result;
  //     const pdf = await Document.load(arrayBuffer);
  //     console.log(pdf);
  //     const page = await pdf.getPage(1); // Read the first page
  //     console.log(page);

  //     const textContent = await page.getTextContent();
  //     const text = textContent.items.map((item) => item.str).join(" ");
  //     console.log(text);
  //     // setPdfData(text);
  //   };

  //   reader.readAsArrayBuffer(data);
  // };
  const handleimage = async (e) => {

    const files = e.target.files[0];
    console.log(files)
    setFile(files);

    // for excel read start
  // const arrayBuffer = await files.arrayBuffer();
  // const data = new Uint8Array(arrayBuffer);
  // const workbook = XLSX.read(data, { type: 'array' });
  // const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  // const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // console.log(jsonData);

  // ==excel end =========
  };

  const fetchProductlist = () => {
    dispatch(PdfSlice({file}))
  };

  return (
    <>
      <Container component="main" maxWidth="xl" className="setcontainer">
        <div className="flex-between">
          <Typography variant="h4" gutterBottom className="setheading">
            Product
          </Typography>
        </div>

        <Paper className={classes.setProductpaper} elevation={5}>
          <TextField
            fullWidth
            id="handleimagetext"
            size="small"
            type="file"
            name="sendimage"
            variant="outlined"
            onChange={handleimage}
            className={classes.settextfield}
          />

          <button className="btnsub" onClick={fetchProductlist}>
            Add<span></span>
          </button>
        </Paper>
      </Container>
    </>
  );
};

export default PdfRead;
