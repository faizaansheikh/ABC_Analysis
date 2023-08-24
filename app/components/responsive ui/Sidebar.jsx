"use client";

import React from "react";
import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import { Button } from "@mui/material";
import Image from "next/image";
import SettingsIcon from "@mui/icons-material/Settings";
import GridOnIcon from "@mui/icons-material/GridOn";
import Setup from "../../setup/page";
import Results from '../../results/page'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import { useState } from "react";
import style from "./Sidebar.module.css"
export default function ClippedDrawer() {
  const [menuData, setMenuData] = React.useState("result");
  const [collap, setCollap] = useState(false)
  const [activeMenu, setActiveMenu] = useState("result");

  const getSidebarStyles = () => {
    if (collap) {
      return {
        width: '65px',
      };
    } else {
      return {
        width: '250px',
      };
    }
  };
  return (
    <Box sx={{ display: "flex", bgcolor: "#398585 !imporant" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "#398585",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          p: "0px 27px 0px 17px",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <IconButton onClick={() => {
            setCollap(!collap)
          }}>
            <MenuIcon style={{ color: 'white' }} />
          </IconButton>
          <Image
            src="/logo.png"
            alt="Picture of the author"
            style={{ paddingRight: '10px', marginLeft: '15px' }}
            width={68}
            height={40}
            quality={100}
          >
          </Image>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ pt: "17px", pb: "17px" }}
          >
            ISCP - Integrated Supply Chain Planning
          </Typography>
        </Box>

        {menuData === "result" ? (
          <p style={{ fontSize: "18px", margin: "0px" }}>ABC/XYZ Analysis</p>
        ) : (
          <p style={{ fontSize: "18px", margin: "0px" }}>Segmentation Setup</p>
        )}
      </AppBar>
      {/* <div> */}
      <Sidebar
        className={`${style.sidebar} ${collap ? style.collapsed : ''}`}
        style={{ ...getSidebarStyles(), top: '65px', color: "white", position: 'fixed', left: '0px', bottom: '0px' }} backgroundColor="#398585 !important" collapsed={collap} >
        <Menu className={style.nav}>
          <MenuItem
            className={`${style.menu1} ${activeMenu === 'setup' ? style.active : ''}`}
            icon={<SettingsIcon />} onClick={() => {
              setMenuData("setup")
              setActiveMenu('setup')
            }}> Setup </MenuItem>
          <MenuItem
            className={`${style.menu1} ${activeMenu === 'result' ? style.active : ''}`}
            icon={<GridOnIcon />}
            onClick={() => {
              setMenuData("result")
              setActiveMenu('result')
            }}> Results </MenuItem>
        </Menu>
      </Sidebar>
      <Box component="main" overflow='hidden'
        className={`${style.mainContent} ${collap ? style.collapsed : ''}`}
        sx={{ flexGrow: 1, p: 3, marginLeft: collap ? '65px' : '250px', }}>
        <Toolbar />
        {menuData === "setup" && <Setup />}
        {menuData === "result" && <Results />}
      </Box>
      {/* </div> */}
    </Box>
  )
}