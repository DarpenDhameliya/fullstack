import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useMuiStyle from "../../commonLink/Muistyle";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";

const EditProduct = () => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [gstid, setGstid] = useState('');
  const skuidparam = useParams();

  const classes = useMuiStyle()
  let fetchlist = async () => {
    const response = await fetch(`http://localhost:4000/api/admin/product/update/${skuidparam.id}`, {
      method: 'post',
      headers: {
        Authorization: `${localStorage.getItem("nodeuser")}`
      },
    })
    const product = await response.json();
    console.log(product.result)
    setName(product.result.name)
    setSku(product.result.sku)
    setGstid(product.result.gstid)
    setPrice(product.result.price)
    setQty(product.result.qty)
  }
  // console.log(party_nm.party_name);
  useEffect(() => {
    fetchlist();
    // console.log(skuidparam.id)
  }, []);

  const handlesenddata = async () => {
    const response = await fetch(`http://localhost:4000/api/admin/product/finalupdate`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `${localStorage.getItem("nodeuser")}`
      },
      body: JSON.stringify({ name: name, gstid: gstid, qty: qty, price: price , skuid:skuidparam.id })
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
        Edit Product
      </Typography>

      <Paper className={classes.setProductpaper} elevation={5}>
        {/* <div className="flex-start"> */}
        <div className="flex-between">
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
          update
        </Button>
      </Paper>
    </Container>
  </>;
};

export default EditProduct;
