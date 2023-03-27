import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useMuiStyle from "../../commonLink/Muistyle";
import { Divider, Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import axios from 'axios';
import TextField from "@mui/material/TextField";

const Addproduct = () => {
  const [partyList, setPartyList] = useState([]);
  const [party_nm, setParty_nm] = useState('');
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [gstid, setGstid] = useState('');


  const [isClearable, setIsClearable] = useState(true);

  const classes = useMuiStyle()

  let fetchlist = () => {
    const response = axios.get('http://localhost:4000/api/party/list', {
      headers: {
        Authorization: `${localStorage.getItem("nodeuser")}`
      },
    }).then((result) => {
      setPartyList(result.data.result)
    }).catch((error) => {
      console.log(error.response.data.message);
    })
  }
  // console.log(party_nm.party_name);
  useEffect(() => {
    fetchlist();
  }, []);

  console.log(party_nm)
  const handlesenddata = async () => {
    const response = await fetch(`http://localhost:4000/api/admin/product/add`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `${localStorage.getItem("nodeuser")}`
      },
      body: JSON.stringify({ name: name, sku: sku, gstid: gstid, qty: qty, price: price , party_id :party_nm.id})
    });
    const product = await response.json();
    console.log(product)
  }

  return <>
    <Container
      component="main"
      maxWidth="xl"
      className="setcontainer"
    >
      <Typography
        variant="h4"
        gutterBottom
        className="setheading"
      >
        Add Product
      </Typography>

      <Paper className={classes.setProductpaper} elevation={5}>
        {/* <div className="flex-start"> */}
        <div className="flex-between">
          <div className="firstsite flex-start">
            <Typography className={classes.setlabel}>Unit :</Typography>
            <Select
              value={party_nm}
              onChange={setParty_nm}
              isClearable={isClearable}
              placeholder="Select party"
              classNamePrefix="select"
              getOptionValue={(option) => option._id}
              getOptionLabel={(option) => option.name}
              options={partyList}
            />
          </div>
          <div className="secondsite flex-start">
            <label className={classes.setlabel}>name :</label>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="outlined-basic"
              size="small"
              type="text"
              placeholder="name"
              variant="outlined"
            />
          </div>
        </div>
        <div className="flex-between">
          <div className="firstsite flex-start">
            <label className={classes.setlabel}>sku :</label>
            <TextField
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              id="outlined-basic"
              size="small"
              type="email"
              placeholder="email"
              variant="outlined"
            />
          </div>
          <div className="secondsite flex-start">
            <label className={classes.setlabel}>gstid :</label>
            <TextField
              value={gstid}
              onChange={(e) => setGstid(e.target.value)}
              id="outlined-basic"
              size="small"
              type="text"
              placeholder="gst"
              variant="outlined"
            />
          </div>
        </div>
        <div className="flex-between">
          <div className="firstsite flex-start">
            <label className={classes.setlabel}>qty :</label>
            <TextField
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              id="outlined-basic"
              size="small"
              type="text"
              placeholder="qty"
              variant="outlined"
            />
          </div>
          <div className="secondsite flex-start">
            <label className={classes.setlabel}>price :</label>
            <TextField
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="outlined-basic"
              size="small"
              type="text"
              placeholder="Amount"
              variant="outlined"
            />
          </div>
        </div>
        <Button
          variant="contained"
          size="medium"
          onClick={handlesenddata}
        >
          Add
        </Button>
      </Paper>
    </Container>
  </>;
};

export default Addproduct;
