"use client";

import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import style from "./ViewDialog.module.css";
import { Typography } from "@mui/material";
import { getTable } from "../setup/Services/SegmentationServices";
import { useEffect } from "react";

const ColorButton = styled(Button)(() => ({
  color: "white",
  backgroundColor: "#398585",
  "&:hover": {
    backgroundColor: "#398585",
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ViewDialog({ setOpen, open, profileData }) {
  const [abcData, setAbcData] = React.useState({ abc: [], xyz: [] });
  const handleClose = () => {
    setOpen(false);
  };

  const fetchTable = async (query) => {
    const res = await getTable(query);
    setAbcData({ abc: res?.data.abcp, xyz: res?.data.xyzp });
  };
  //console.log(abcData.xyz);
  useEffect(() => {
    fetchTable({ profile: profileData });
  }, []);

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div
          style={{
            backgroundColor: "#71807a",
            color: "white",
          }}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Selected settings
          </BootstrapDialogTitle>
        </div>
        <DialogContent>
          <Typography variant="h5">ABC Parameters</Typography>
          <div style={{ overflowY: "auto", height: "200px" }}>
            <table style={{ width: "468px" }}>
              <tbody>
                <tr>
                  <td className={style.theading}>Params</td>
                  <td className={style.theading}>Profile</td>
                </tr>
                {abcData.abc.map((elem, index) => {
                  return (
                    <tr key={index}>
                      <td className={style.theading}>{elem.Params}</td>
                      <td className={style.theading}>{elem.VALUES}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Typography variant="h5" sx={{ marginTop: "20px" }}>
            XYZ Parameters
          </Typography>
          <div>
            <table style={{ width: "468px" }}>
              <tbody>
                {abcData.xyz.map((elem, index) => {
                  return (
                    <tr key={index}>
                      <td className={style.theading}>{elem.Params}</td>
                      <td className={style.theading}>{elem.VALUES}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p>
              XYZ Classes are automatically assigned using past history of the{" "}
              <br /> products.
            </p>
          </div>
        </DialogContent>
        <DialogActions
          style={{ backgroundColor: "#71807a", padding: "15px 10px" }}
        >
          <ColorButton
            autoFocus
            onClick={handleClose}
            style={{ width: "100px" }}
          >
            Close
          </ColorButton>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
