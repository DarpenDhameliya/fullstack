/* eslint-disable no-redeclare */
import * as React from "react";
import { Grid, Paper } from "@material-ui/core";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Pagination from "@mui/material/Pagination";
import useMuiStyle from "../../commonLink/Muistyle";
import about from "../../../asset/about.jpg";
import about1 from "../../../asset/deskimg.jpg";
import about2 from "../../../asset/digiimg.jpg";
import about3 from "../../../asset/entimg.jpg";
import { useState, useEffect } from "react";

const Home = () => {
  const [workdata, setWorkdata] = useState([]);
  const [serchval, setSerchval] = useState('')
  const [page, setPage] = useState(1);
  const classes = useMuiStyle();
  var totalpages;
  useEffect(() => {
    let data = [
      { image: about, title: "IOS", no: 1 },
      { image: about1, title: "Android", no: 2 },
      { image: about2, title: "Flutter", no: 3 },
      { image: about, title: "Java", no: 4 },
      { image: about3, title: "React", no: 5 },
      { image: about, title: "IOS", no: 6 },
      { image: about1, title: "Android", no: 7 },
      { image: about, title: "Flutter", no: 8 },
      { image: about2, title: "Java", no: 9 },
      { image: about3, title: "React", no: 10 },
      { image: about, title: "IOS", no: 11 },
      { image: about, title: "Android", no: 12 },
      { image: about1, title: "Flutter", no: 13 },
      { image: about2, title: "Java", no: 14 },
      { image: about, title: "React", no: 15 },
      { image: about, title: "IOS", no: 16 },
      { image: about3, title: "Android", no: 17 },
      { image: about, title: "Flutter", no: 18 },
      { image: about, title: "Java", no: 19 },
      { image: about1, title: "React", no: 20 },
      { image: about3, title: "IOS", no: 21 },
      { image: about2, title: "Android", no: 22 },
      { image: about, title: "Flutter", no: 23 },
      { image: about1, title: "Java", no: 24 },
      { image: about3, title: "React", no: 25 },
      { image: about, title: "IOS", no: 26 },
      { image: about3, title: "Android", no: 27 },
    ];
    setWorkdata(data);
  }, []);

  var perpage = 20;
  var totalpages = Math.ceil(workdata.length / perpage);
  // console.log(workdata.length)
  var startIndex = (page - 1) * perpage;
  var endIndex = page * perpage;
  var currentCards = workdata.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  return (
    <>
      <Container component="main" maxWidth="xl" className="setcontainer">
        <div className="flex-between">
          <div>
            <Typography variant="h4" gutterBottom className="setheading">
              sstpl
            </Typography>
          </div>
          <div className="input-wrapper">
            <button className="icon" >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                height="25px"
                width="25px"
              >
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="1.5"
                  stroke="#fff"
                  d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                 />                 
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="1.5"
                  stroke="#fff"
                  d="M22 22L20 20"
                />
              </svg>
            </button>
            <input
              placeholder="search.."
              className="input"
              name="text"
              type="text"
              value={serchval}
              onChange={(e) => setSerchval(e.target.value) }
            />
          </div>
        </div>

        <Paper className={classes.setProductpaper} elevation={5}>
          <Grid container className={classes.setGridcard}>
            {currentCards.map((e) => {
              console.log(e)
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className={classes.setonegried}
                >
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      sx={{ height: 140 }}
                      image={e.image}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {e.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Pagination
            count={totalpages}
            page={page}
            onChange={handleChangePage}
            size="small"
          />
        </Paper>
      </Container>
    </>
  );
};

export default Home;
