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
import { getModalData, getSummaryModal } from "../setup/Services/SegmentationServices";
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

export default function SummaryDialog({ setOpen, open,profileData }) {
  const handleClose = () => {
    setOpen(false);
  };

  const fetchSummaryModal = async () => {
    const res = await getSummaryModal();
    console.log(res);
  };

  useEffect(() => {
    fetchSummaryModal();
  }, []);
  const fetchData = async()=>{
    const res = await getModalData()
    console.log(res);
  }
  useEffect(()=>{
    fetchData()
  },[])
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
            Product in CY Category
          </BootstrapDialogTitle>
        </div>
        <div style={{ overflow: "auto", height: "250px" }}>
          <DialogContent dividers>
            <table style={{ width: "500px" }}>
              <thead>
                <tr>
                  <th className={style.heading}>ABC</th>
                  <th className={style.heading}>XYZ</th>
                  <th className={style.heading}>Brand</th>
                  <th className={style.heading}>Grammage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                </tr>
                <tr>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                </tr>
                <tr>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                </tr>
                <tr>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                </tr>

                <tr>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                </tr>
                <tr>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                </tr>
                <tr>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                </tr>

                <tr>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                </tr>
                <tr>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                </tr>
                <tr>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                  <td className={style.theading}>124</td>
                </tr>
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
