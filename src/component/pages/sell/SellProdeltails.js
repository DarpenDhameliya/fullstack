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
import { useDispatch, useSelector } from "react-redux";
import { SellSlice, Sellslicestate, Sellslicestatus } from "./SellSlice";

const SellProdeltails = () => {
  const classes = useMuiStyle()
  const [partyList, setPartyList] = useState([]);
  const [party_nm, setParty_nm] = useState('');
  const [partyyyy, setPartyyyy] = useState([]);
  const [sellReport, setSellReport] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [billrecord, setBillrecord] = useState([]);
  const [sumPrice, setSumPrice] = useState(0);
  const [sumQty, setSumQty] = useState(0);
  const [billId, setBillId] = useState('');
  
  
 
  const dispatch = useDispatch();
  const liststate = useSelector(Sellslicestate);

  const handleChange = (e) => {
    setPartyyyy(Array.isArray(e) ? e.map((x) => x.id) : []);
  };

  useEffect(() => {
    if (liststate.status === "loading") {
    } else if (liststate.status === "succeeded") {
      setPartyList(liststate.response)
      dispatch(Sellslicestatus);
    } else if (liststate.status === "failed") {
      console.log(liststate.error)
      dispatch(Sellslicestatus);
    } else {
    }
  });

  useEffect(() => {
    // fetchlist();
    dispatch(SellSlice())
  }, []);

  const handlesenddata = async () => {
    const response = await fetch(`http://192.168.0.103:4000/api/admin/sellreport/billreport`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `${localStorage.getItem("nodeuser")}`
      },
      body: JSON.stringify({ name: partyyyy })

    });
    const product = await response.json();
    setSellReport(product.result)
    console.log(product.result)
  }

  let handlemodelclose = () => {
    setModelOpen(false)
    setBillrecord([])
    setSumPrice(0)
    setSumQty(0)
  }

  let handlebillreport = (data) => {
    setModelOpen(true)
    setBillId(data.bill_id)
    let sum = 0;
    let qty = 0;
    sellReport.map((e) => {
      const datas = {}
      if(e.bill_id === data.bill_id){
          datas['name'] = e.name;
          datas['qty'] = e.qty;
          datas['price'] = e.price;
          sum += e.price * e.qty;
          qty += e.qty
          setSumPrice(sum)
          setSumQty(qty)
          setBillrecord(oldArray => [...oldArray,datas] );
        } 
      })
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
        sell report
      </Typography>


      <Paper className={classes.setProductpaper} elevation={5}>
        <Select
          isMulti
          value={partyList.filter((obj) =>
            partyyyy.includes(obj.id)
          )}
          onChange={handleChange}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.name}
          options={partyList}
        />
        <Button
          variant="contained"
          size="medium"
          className={classes.setsendbtninside}
          onClick={handlesenddata}
        >
          find
        </Button>
      </Paper>
      <Paper className={classes.setProductpaper} elevation={5}>
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
                  bill no.
                </TableCell>
                <TableCell align="center" className='tableth'>
                  party.
                </TableCell>
                <TableCell align="center" className='tableth'>
                  action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellReport.map((e, index) => {
                return (
                  <TableRow key={e._id}>
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
                      {e.qty}
                    </TableCell>
                    <TableCell
                      className="tabletd"
                      align="center"
                    >
                      {e.bill_id}
                    </TableCell>
                    <TableCell
                      className="tabletd"
                      align="center"
                    >
                      {partyList.map((res) => {
                        if (res.id === e.party_name) {
                          return <p>{res.name}</p>
                        }
                      })}
                    </TableCell>
                    <TableCell
                      className={classes.tabletdicon}
                      align="center"
                    >
                      <div className='flex-center'>
                        <div>
                          <SellIcon
                          onClick={() => handlebillreport(e)}
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
      </Paper>
      <Modal
            open={modelOpen}
            onClose={handlemodelclose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={classes.setmodeldisplay}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                bill
              </Typography>
              <Divider />
              <Typography
                id="modal-modal-title"
                variant="body1"
                component="h2"
                style={{ margin: "19px 10px" }}
              >
              <span>Bill No : </span>
                {billId}
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="body1"
                component="h2"
                style={{ margin: "19px 10px" }}
              >
                {/* {partynm} */}
              </Typography>
              <TableContainer>
          <Table className={classes.settable} aria-label="simple table">
            <TableHead>
              <TableRow>
                
                <TableCell align="center" className='tableth'>
                  Product Name
                </TableCell>
                <TableCell align="center" className='tableth'>
                  qty
                </TableCell>
                <TableCell align="center" className='tableth'>
                  price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billrecord.map((e, index) => {
                return (
                  <TableRow key={e.index}>
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
                      {e.qty}
                    </TableCell>
                    <TableCell
                      className="tabletd"
                      align="center"
                    >
                      {e.price}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
              <TableCell
                      className='tabletd'
                      align="center"
                    >
                    total
                    </TableCell>
                    <TableCell
                      className="tabletd"
                      align="center"
                    >
                      {sumQty}
                    </TableCell>
                    <TableCell
                      className="tabletd"
                      align="center"
                    >
                      {sumPrice}
                    </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
              <Divider />
              <div className={classes.setbtndeldiv}>
                
                <Button
                  variant="contained"
                  className={classes.deletebtn}
                  // onClick={handlefinaldelete}
                >
                  Delete
                </Button>
              </div>
            </Box>
          </Modal>
    </Container>
  </>;
};

export default SellProdeltails;