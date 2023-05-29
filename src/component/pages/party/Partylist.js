import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useMuiStyle from "../../commonLink/Muistyle";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import {  Grid, Paper } from "@material-ui/core";
import { PartySlice, Partyslicestate, Partyslicestatus } from "./PartySlice";
import { useDispatch, useSelector } from "react-redux";

const Partylist = () => {
  const [partyList, setPartyList] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [upname, setUpname] = useState("");
  const [upmobile, setUpmobile] = useState("");
  const [image, setImage] = useState("");
  const [upid, setUpid] = useState("");

  const dispatch = useDispatch();
  const liststate = useSelector(Partyslicestate);
  const classes = useMuiStyle();

  const handleadd = (e) => {
    setName(e.target.value);
  };
  const handleeditname = (e) => {
    setUpname(e.target.value);
  };
  const handleaddmobile = (e) => {
    setMobile(e.target.value);
  };
  const handleeditmobile = (e) => {
    setUpmobile(e.target.value);
  };
  console.log(upname);
  let fetchlist = () => {
    const response = axios
      .get("http://localhost:4000/api/party/list", {
        headers: {
          Authorization: `${localStorage.getItem("nodeuser")}`,
        },
      })
      .then((result) => {
        console.log(result.data.result)
        setPartyList(result.data.result);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  useEffect(() => {
    fetchlist();
  }, []);

  useEffect(() => {
    if (liststate.status === "loading") {
    } else if (liststate.status === "succeeded") {
      console.log(liststate.response)
      dispatch(Partyslicestatus);
    } else if (liststate.status === "failed") {
      console.log(liststate.error)
      dispatch(Partyslicestatus);
    } else {
    }
  });
  // update id
  let handleedit = async (id) => {
    setUpid(id.id);
    // const response = await fetch(`http://localhost:4000/api/party/editdata/${id}`, {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     "Authorization": `${localStorage.getItem("nodeuser")}`
    //   },
    // });
    // const noteee = await response.json();
    // console.log(noteee)
    setUpname(id.name);
    setUpmobile(id.mobile);
  };
  var imagedata;
  const handleimage = (e) => {
    imagedata = e.target.files[0];
    setImage(imagedata);
  };
  const data = {
    party_name: name,
    mobile: mobile,
    file: image,
  };
  const headers = {
    Authorization: `${localStorage.getItem("nodeuser")}`,
    "Content-Type": "multipart/form-data",
  };
  let handlesenddata = async () => {
    console.log(image);
    console.log(imagedata);
    if (upid) {
      const response = await fetch(
        `http://localhost:4000/api/party/edit/${upid}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("nodeuser")}`,
          },
          body: JSON.stringify({ party_name: upname, mobile: upmobile }),
        }
      );
      const noteee = await response.json();
      fetchlist();
      console.log(noteee);
    } else {
      // const response = await fetch(`http://localhost:4000/api/party/add`, {
      //   method: "post",
      //   headers: {
      //     // 'Content-Type': 'multipart/form-data',
      //     "Content-Type": "application/json",
      //     Authorization: `${localStorage.getItem("nodeuser")}`,
      //   },
      //   body: JSON.stringify({ party_name: name, mobile: mobile }),
      // });
      // const noteee = await response.json();
      // fetchlist();
      // console.log(noteee);

      dispatch(PartySlice({ party_name: name, mobile: mobile, file: image }));
    }
  };

  let handledelete = async (id) => {
    console.log(id);
    const response = await fetch(
      `http://localhost:4000/api/party/delete/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("nodeuser")}`,
        },
      }
    );
    const noteee = await response.json();
    fetchlist();
    console.log(noteee);
  };

  return (
    <>
      <Container component="main" maxWidth="xl" className="setcontainer">
        <Typography variant="h4" gutterBottom className="setheading">
          party
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} className={classes.setinputlayout}>
            <Paper className={classes.setProductpaper} elevation={5}>
              <Typography className={classes.setlabel}>Name :</Typography>
              <TextField
                id="outlined-basic"
                size="small"
                variant="outlined"
                className={classes.settextfield}
                placeholder="name"
                InputLabelProps={{ shrink: false }}
                value={upid ? upname : name}
                onChange={upid ? handleeditname : handleadd}
              />
              <Typography className={classes.setlabel}>mobile :</Typography>
              <TextField
                id="outlined-basic"
                size="small"
                variant="outlined"
                className={classes.settextfield}
                placeholder="name"
                InputLabelProps={{ shrink: false }}
                value={upid ? upmobile : mobile}
                onChange={upid ? handleeditmobile : handleaddmobile}
              />
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
              <div className={classes.setsendbutton}>
                {upid ? (
                  <Button
                    variant="contained"
                    size="medium"
                    className={classes.setsendbtninside}
                    onClick={handlesenddata}
                  >
                    update
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="medium"
                    className={classes.setsendbtninside}
                    onClick={handlesenddata}
                  >
                    Add
                  </Button>
                )}
              </div>
            </Paper>
          </Grid>
          {partyList.length > 0 && (
            <Grid item xs={12} sm={7} className={classes.setinputlayout}>
              <Paper className="setProductpaper" elevation={5}>
                <TableContainer>
                  <Table className={classes.settable} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" className="tableth">
                          No.
                        </TableCell>
                        <TableCell align="center" className="tableth">
                          image
                        </TableCell>
                        <TableCell align="center" className="tableth">
                          Name
                        </TableCell>
                        <TableCell align="center" className="tableth">
                          mobile
                        </TableCell>
                        <TableCell align="center" className="tableth">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {partyList.map((e, index) => {
                        return (
                          <TableRow key={e.id}>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                              className="tabletd"
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell className="tabletd" align="center">
                              <img src={e.image} alt="ss" style={{maxWidth:"50px"}} />
                            </TableCell>
                            <TableCell className="tabletd" align="center">
                              {e.name}
                            </TableCell>
                            <TableCell className="tabletd" align="center">
                              {e.mobile}
                            </TableCell>
                            <TableCell
                              className={classes.tabletdicon}
                              align="center"
                            >
                              <div className="flex-center">
                                <div>
                                  <EditIcon onClick={() => handleedit(e)} />
                                </div>
                                <div>
                                  <DeleteIcon
                                    onClick={() => handledelete(e.id)}
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
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Partylist;
