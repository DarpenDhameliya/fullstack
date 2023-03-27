import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useMuiStyle from "../../commonLink/Muistyle";
import { Divider, Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import SellIcon from '@mui/icons-material/Sell';
import TextField from "@mui/material/TextField";

const Productlist = () => {
  const [partyList, setPartyList] = useState([]);
  const [party_nm, setParty_nm] = useState('');
  const [isClearable, setIsClearable] = useState(true);
  const [product_list, setProduct_list] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [sellprice, setSellPrice] = useState('');
  const [sellproduct, setSellproduct] = useState('');
  const [sellQty, setSellQty] = useState('');
  const [skuCart, setSkuCart] = useState('');


  const classes = useMuiStyle()
  const history = useHistory();

  let fetchlist = async () => {
    const response = await fetch('http://localhost:4000/api/party/list', {
      method: "get",
      headers: {
        Authorization: `${localStorage.getItem("nodeuser")}`
      },
    })
    const product = await response.json();
    setPartyList(product.result)
  }

  useEffect(() => {
    fetchlist();
  }, []);

  let fetchProductlist = async () => {
    const response = await fetch(`http://localhost:4000/api/admin/product/list/${party_nm.id}`, {
      method: "get",
      headers: {
        Authorization: `${localStorage.getItem("nodeuser")}`
      },
    })
    const product = await response.json();
    setProduct_list(product.result)
  }

  let handlesenddata = () => {
    history.push('/app/addproduct')
  }

  let handleedit = async (id) => {
    history.push(`/app/productupdate/${id}`)
  }

  let handledelete = async (id) => {
    console.log(id)
    const response = await fetch(`http://localhost:4000/api/admin/product/delete/${id}`, {
      method: "delete",
      headers: {
        Authorization: `${localStorage.getItem("nodeuser")}`
      },
    })
    const product = await response.json();
    console.log(product)
  }

  let localdata = []

  let handlesell = (data) => {
    setSellproduct(data.name)
    setSellPrice(data.price)
    setSkuCart(data.sku)
    setModelOpen(true)
  }

  let handlecart = async () => {
    let storedata = {}
    storedata['name'] = sellproduct;
    storedata['qty'] = sellQty;
    storedata['sku'] = skuCart;
    storedata['price'] = sellprice
    let retString = JSON.parse(localStorage.getItem("productcart"))
    if (retString === null) {
      localdata.push({ ...storedata })
      return localStorage.setItem('productcart', JSON.stringify(localdata))
    } else {
      let count = 0
      retString.map((e) => {
        if (e.sku === storedata.sku) {
          count = 1
          let qty = (Math.floor(e.qty)) + (Math.floor(sellQty))
          e.qty = qty.toString()
          return e
        }
      })
      {
        count === 0 && retString.push({ ...storedata })
        console.log(retString)
        localStorage.setItem('productcart', JSON.stringify(retString))
      }
    }

    setModelOpen(false)
  }
  return <>
    <Container
      component="main"
      maxWidth="xl"
      className="setcontainer"
    >
      <div className="flex-between">
        <Typography
          variant="h4"
          gutterBottom
          className="setheading"
        >
          Product
        </Typography>
        <Button
          variant="contained"
          size="medium"
          className={classes.setsendbtninside}
          onClick={handlesenddata}
        >
          Add Product
        </Button>
      </div>

      <Paper className={classes.setProductpaper} elevation={5}>
        <Typography className={classes.setlabel}>party :</Typography>

        <Select
          value={party_nm}
          onChange={setParty_nm}
          isClearable={isClearable}
          placeholder="Select party"
          classNamePrefix="select"
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.name}
          options={partyList}
        />
        <Button
          variant="contained"
          size="medium"
          onClick={fetchProductlist}
        >
          Add
        </Button>
      </Paper>
      {product_list.length > 0 && <Paper className={classes.setProductpaper} elevation={5}>
        <TableContainer>
          <Table className={classes.settable} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className='tableth'>
                  No.
                </TableCell>
                <TableCell align="center" className='tableth'>
                  Name
                </TableCell>
                <TableCell align="center" className='tableth'>
                  sku
                </TableCell>
                <TableCell align="center" className='tableth'>
                  gst
                </TableCell>
                <TableCell align="center" className='tableth'>
                  qty
                </TableCell>
                <TableCell align="center" className='tableth'>
                  price
                </TableCell>
                <TableCell align="center" className='tableth'>
                  action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product_list.map((e, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      className="tabletd"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      className='tabletd'
                      align="center"
                    >
                      {e.name}
                    </TableCell>
                    <TableCell
                      className='tabletd'
                      align="center"
                    >
                      {e.sku}
                    </TableCell>
                    <TableCell
                      className='tabletd'
                      align="center"
                    >
                      {e.gstid}
                    </TableCell>
                    <TableCell
                      className="tabletd"
                      align="center"
                    >
                      {e.qty}
                    </TableCell>
                    <TableCell
                      className='tabletd'
                      align="center"
                    >
                      {e.price}
                    </TableCell>
                    <TableCell
                      className={classes.tabletdicon}
                      align="center"
                    >
                      <div className='flex-center'>
                        <div>
                          <EditIcon
                            onClick={() => handleedit(e._id)}
                          />
                        </div>
                        <div>
                          <DeleteIcon
                            onClick={() => handledelete(e._id)}
                          />
                        </div>
                        <div>
                          <SellIcon
                            onClick={() => handlesell(e)}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>}

      <Modal
        open={modelOpen}
        onClose={() => setModelOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.setmodeldisplayerr}>
          <div >
            <label className={classes.setlabel}>product :</label>
            <TextField
              value={sellproduct}
              onChange={(e) => setSellproduct(e.target.value)}
              id="outlined-basic"
              size="small"
              type="text"
              placeholder="Amount"
              variant="outlined"
            />
          </div>
          <div>
            <label className={classes.setlabel}>qty :</label>
            <TextField
              value={sellQty}
              onChange={(e) => setSellQty(e.target.value)}
              id="outlined-basic"
              size="small"
              type="text"
              placeholder="Amount"
              variant="outlined"
            />
          </div>
          <label className={classes.setlabel}>price :</label>
          <TextField
            value={sellprice}
            onChange={(e) => setSellPrice(e.target.value)}
            id="outlined-basic"
            size="small"
            type="text"
            placeholder="Amount"
            variant="outlined"
          />

          <Divider />
          <div className={classes.setbtndeldiv}>
            <Button
              variant="contained"
              onClick={handlecart}
            >
              sell
            </Button>
          </div>
        </Box>
      </Modal>
    </Container>
  </>;
};

export default Productlist;
