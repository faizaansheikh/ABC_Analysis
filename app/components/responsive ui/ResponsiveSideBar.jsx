'use client'

import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from "@mui/material/List";
// import logo from "../Dashboard/logo.png";
import CloseIcon from "@mui/icons-material/Close";
import GridOnIcon from "@mui/icons-material/GridOn";
import SettingsIcon from "@mui/icons-material/Settings";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Setup from "../../setup/page";
import Results from '../../results/page';

import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import ReorderIcon from '@mui/icons-material/Reorder';
const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "5px 15px 5px 0px",
    color: "white",
  },
}));

function ResponsiveDrawer(props) {
  const classes = useStyles();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [menuData, setMenuData] = React.useState("setup");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const setupHandler = () => {
    setMenuData("setup")
    setMobileOpen(false)
  }

  const resultHandler = () => {
    setMenuData("result")
    setMobileOpen(false)
  }

  const drawer = (
    <div>
      <div className={classes.container}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          display='end'
          onClick={handleDrawerToggle}
          className={classes.container}
        // sx={{ display:'flex',justifyContent:'end',alignItems:'end' }}
        >
          <CloseIcon onClick={() => setMobileOpen(false)} />
        </IconButton>
      </div>

      {/* <Toolbar /> */}
      <Divider />
      <List>
        <Box sx={{ overflow: "auto", bgcolor: "#398585" }}>
          <List>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: "10px",
                }}
              >
                <SettingsIcon sx={{ fontSize: "20px", color: "white" }} />

                <Button
                  sx={{ color: "white" }}
                  onClick={setupHandler}
                >
                  Segmentation Setups
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: "10px",
                }}
              >
                {/* <InboxIcon /> */}
                <GridOnIcon sx={{ fontSize: "18px", color: "white" }} />
                <Button
                  sx={{ color: "white" }}
                  onClick={resultHandler}
                >
                  Segmentation Results
                </Button>
              </Box>
            </Box>
          </List>
          <Divider />
        </Box>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ bgcolor: "#398585" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <ReorderIcon />
          </IconButton>
          <Image
            src="/logo.png"
            // alt="Picture of the author"
            style={{ paddingRight: '10px' }}
            width={68}
            height={40}
            quality={100}
          >
          </Image>
          <Typography
            variant="h6"
            sx={{ fontSize: "15px" }}
            noWrap
            component="div"
          >
            ISCP Integrated Supply Chain Planning
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "#398585 !important",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#398585 !important"
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {menuData == "setup" && <Setup />}
        {menuData == "result" && <Results />}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
