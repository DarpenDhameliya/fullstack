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

const Viewcart = () => {
  const [sumPrice, setSumPrice] = useState(0);
  const [sumQty, setSumQty] = useState(0);
  const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem("productcart")));
  const classes = useMuiStyle()

  console.log(cartData)
  let sumqty = 0;
  let sumprice = 0;
  useEffect(() => {
    if (cartData !== null) {
      cartData.map((e) => {
        sumqty += Math.floor(e.qty)
        sumprice += e.price * Math.floor(e.qty)
      })
      setSumQty(sumqty)
      setSumPrice(sumprice)
    }
  });

  const handlecart = async () => {
    const response = await fetch(`http://localhost:4000/api/admin/sell/bill`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `${localStorage.getItem("nodeuser")}`
      },
      body: JSON.stringify({ name: cartData })
    });
    let product = await response.json();
    console.log(product)
    if (product.status === 'done') {
      localStorage.removeItem('productcart');
    }
  }

  let handledelete = (e) => {
    console.log('click delete')

    let indexs = cartData.findIndex(x => x.sku === e.sku);
    console.log(indexs)
    if (indexs > -1) {
      cartData.splice(indexs, 1);
    }
    localStorage.setItem("productcart", JSON.stringify(cartData))
    setCartData(JSON.parse(localStorage.getItem("productcart")))
  }

  let handleAdd = (e) => {
    let record = JSON.parse(localStorage.getItem("productcart"))
    record.map((add) => {
      if (add.sku === e.sku) {
        let qty = (Math.floor(e.qty) + 1)
        add.qty = qty.toString()
        return add
      }
    })
    localStorage.setItem("productcart", JSON.stringify(record))
    setCartData(JSON.parse(localStorage.getItem("productcart")))
  }

  let handleremove = (e) => {
    let count = 0
    let record = JSON.parse(localStorage.getItem("productcart"))
    record.map((remove) => {
      if (remove.sku === e.sku) {
        console.log(remove.qty)
        if (remove.qty > 0) {
          count = 1
          let qty = (Math.floor(e.qty) - 1)
          remove.qty = qty.toString()
          return remove
        } else {
          console.log(remove.qty)
          console.log(e)
          let indexs = cartData.findIndex(x => x.sku === e.sku);
          if (indexs > -1) {
            cartData.splice(indexs, 1);
          }
          console.log(cartData)
          localStorage.setItem("productcart", JSON.stringify(cartData))
          setCartData(JSON.parse(localStorage.getItem("productcart")))
        }
      }
    })
    {
      count === 1 && localStorage.setItem("productcart", JSON.stringify(record))
      setCartData(JSON.parse(localStorage.getItem("productcart")))
    }
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
        Cart
      </Typography>
      {cartData ? <Paper className={classes.setProductpaper} elevation={5}>
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
              {cartData.map((e, index) => {
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
                      className="tabletd"
                      align="center"
                    >
                      <button onClick={() => handleAdd(e)}>+</button>
                      {e.qty}
                      <button onClick={() => handleremove(e)}>-</button>
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
                          <DeleteIcon
                            onClick={() => handledelete(e)}
                          />
                        </div>

                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell align="center" className='tableth'>
                  {sumQty}
                </TableCell>
                <TableCell align="center" className='tableth'>
                  {sumPrice}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
          <Button
            className="mt-5"
            variant="contained"
            onClick={handlecart}
          >
            sell
          </Button>
        </TableContainer>
      </Paper> : <Paper className={classes.setProductpaper} elevation={5}> <h3>Cart Empty</h3></Paper>}
    </Container>
  </>
};

export default Viewcart;
