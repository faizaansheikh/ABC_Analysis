"use client";

import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import Image from "next/image";
import SettingsIcon from "@mui/icons-material/Settings";
import GridOnIcon from "@mui/icons-material/GridOn";
import Setup from "../../setup/page";
import Results from '../../results/page'

const drawerWidth = 255;

export default function ClippedDrawer() {
  const [menuData, setMenuData] = React.useState("setup");
  return (
    <Box sx={{ display: "flex", bgcolor: "#398585 !imporant" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // 0A5F59 398585
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "#398585",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          p: "0px 20px",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          {/* <img src={logo}  style={{paddingRight:'5px',width:'60px'}}  alt="" /> */}
          <Image
            src="/logo.png"
            // alt="Picture of the author"
            style={{paddingRight:'10px'}}
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
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#398585 !important",
            color: "white !important",
          },
        }}
      >
        <Toolbar />
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
                {/* <InboxIcon /> */}
                <SettingsIcon sx={{ fontSize: "20px" }} />
                <Button
                  sx={{ color: "white" }}
                  onClick={() => setMenuData("setup")}
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
                <GridOnIcon sx={{ fontSize: "18px" }} />
                <Button
                  sx={{ color: "white" }}
                  onClick={() => setMenuData("result")}
                >
                  Segmentation Results
                </Button>
              </Box>
            </Box>
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {menuData === "setup" && <Setup />}
        {menuData === "result" && <Results />}
      </Box>
    </Box>
  );
}
