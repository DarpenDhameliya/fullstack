import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListItemIcon from "@mui/material/ListItemIcon";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import useStyleMainDisplay from "./MainDisplayStyle";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function Sidebardata() {
  const [sublistOpenmaster, setSublistOpenmaster] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const location = useLocation()
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handlemasterList = () => {
    setSelectedIndex(0);
    setSublistOpenmaster(0);
  };

  const hendlesublistmaster = (event, index) => {
    setSublistOpenmaster(!sublistOpenmaster);
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (
      "/app/home" === location.pathname
    ) {
      setSelectedIndex(1);
    }
  });

  const handleOrderClick = (event) => {
    setSelectedIndex(0);
    setSublistOpenmaster(0);
  };

  const classes = useStyleMainDisplay(selectedIndex);
  const username = JSON.parse(localStorage.getItem("username"));
  // const capitaluser = username.toUpperCase();
  // let letter = capitaluser.charAt(0);
  return (
    <>
      <List className={classes.selectedindex}>
        <div className={classes.setviewforweb}>
          <div className={classes.seticonwithname}>
            {/* <Avatar className={classes.setheaderavtarweb}>{letter}</Avatar> */}
            <Typography className={classes.setheadertypoweb}>
              {/* {capitaluser} */}
            </Typography>
          </div>
        </div>
        <div className={classes.setviewforwebdivider}>
          <Divider
            variant="middle"
            style={{ borderColor: "#fff0f045", margin: "5px 5px" }}
          />{" "}
        </div>
        <ListItemButton
          onClick={(event) => hendlesublistmaster(event)}
          className={classes.effectlist}
          selected={selectedIndex === 1}
        >
          <ListItemIcon style={{ minWidth: "45px" }}>
            <LibraryBooksIcon className={classes.setsidebaricon} />
          </ListItemIcon>
          <ListItemText primary="Master" className={classes.setsidebaricon} />
          {sublistOpenmaster ? (
            <ExpandLessIcon className={classes.setsidebaricon} />
          ) : (
            <ExpandMoreIcon className={classes.setsidebaricon} />
          )}
        </ListItemButton>
        <Collapse
          in={sublistOpenmaster}
          timeout="auto"
          unmountOnExit
          sx={{ backgroundColor: "#2c3b41" }}
        >
          <List
            component="div"
            disablePadding
            className={classes.selectedsubindex}
          >
            <ListItemButton
              button
              component={Link}
              to="/app/home"
              selected={"/app/home" === location.pathname}
              onClick={(event) => handleListItemClick(event, 1)}
              className={classes.effectlist}
            >
              <ListItemIcon style={{ minWidth: "45px" }}>
                <PanoramaFishEyeIcon className={classes.setsidebaricon} />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                className={classes.setsidebaricon}
              />
            </ListItemButton>
            <Divider sx={{ paddingTop: 0.1 }} />
            <ListItemButton
              button
              onClick={(event) => handleListItemClick(event, 1)}
              className={classes.effectlist}
            >
              <ListItemIcon style={{ minWidth: "45px" }}>
                <PanoramaFishEyeIcon className={classes.setsidebaricon} />
              </ListItemIcon>
              <ListItemText
                primary="Website"
                className={classes.setsidebaricon}
              />
            </ListItemButton>
            <Divider sx={{ paddingTop: 0.1 }} />
          </List>
        </Collapse>
        {/* master end ------- */}

        {/* order entry */}
        <ListItemButton
          button
          component={Link}
          to="/app/partylist"
          selected={"/app/partylist" === location.pathname}
          onClick={handleOrderClick}
          className={classes.effectlist}
        >
          <ListItemIcon style={{ minWidth: "45px" }}>
            <LibraryBooksIcon className={classes.setsidebaricon} />
          </ListItemIcon>
          <ListItemText

            primary="party master"
            className={classes.setsidebaricon}
          />
        </ListItemButton>

        <ListItemButton
          button
          component={Link}
          to="/app/product"
          selected={"/app/product" === location.pathname}
          onClick={handleOrderClick}
          className={classes.effectlist}
        >
          <ListItemIcon style={{ minWidth: "45px" }}>
            <InsertDriveFileIcon className={classes.setsidebaricon} />
          </ListItemIcon>
          <ListItemText
            primary="product master"
            className={classes.setsidebaricon}
          />
        </ListItemButton>
        <ListItemButton
          button
          component={Link}
          to="/app/sellreport"
          selected={"/app/sellreport" === location.pathname}
          onClick={handleOrderClick}
          className={classes.effectlist}
        >
          <ListItemIcon style={{ minWidth: "45px" }}>
            <InsertDriveFileIcon className={classes.setsidebaricon} />
          </ListItemIcon>
          <ListItemText
            primary="Sell Report"
            className={classes.setsidebaricon}
          />
        </ListItemButton>
      </List>
    </>
  );
}