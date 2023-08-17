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
import style from "./SummaryDialog.module.css";
import {
  getModalData,
  getSummaryModal,
} from "../setup/Services/SegmentationServices";
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
    <DialogTitle sx={{ m: 0, p: 2, position: "relative" }} {...other}>
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

export default function SummaryDialog({ setOpen, open,modalVals,pointVals }) {
  const handleClose = () => {
    setOpen(false);
  };

  let dataM = [
    // { ABC: "A", XYZ: "X", Brand: "Max Bar Regular", Grammage: "190-285 GM" },
    {'Not data found': ''}
  ];
  // console.log(Object.keys(dataM[0]));
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
            Product in {pointVals.y + pointVals.x} Category
          </BootstrapDialogTitle>
        </div>
        <div style={{ overflow: "auto", height: "250px" }}>
          <DialogContent>
            <table style={{ width: "500px" }}>
              <thead>
                <tr>
                {Object.keys(modalVals[0] ? modalVals[0] : dataM[0]).map((elem,i)=>(

                  <th key={i} className={style.heading}>{elem}</th>
                ))}
                 
                </tr>
              </thead>
              <tbody className={style.bodyT}>
                {modalVals?.map((elem,i) => (
                  <tr className={style.trData} key={i}>
                    <td className={style.theading}>{elem.ABC}</td>
                    <td className={style.theading}>{elem.XYZ}</td>
                    <td className={style.theading}>{elem.Brand}</td>
                    <td className={style.theading}>{elem.Grammage}</td>
                    {/* {!elem && <td className={style.theading}>{elem.message}</td>} */}
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </DialogContent>
        </div>
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
