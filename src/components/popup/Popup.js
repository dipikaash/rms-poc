import {  Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

export default function Popup (props){
    const {children, openPopup, setOpenPopup,email} =props;
    let title = email ? 'Edit' : 'Add'
    return (
        <Dialog open={openPopup}>
            <DialogTitle>
             <Typography className="popupHead" >
             {title} Employee 
            <CloseIcon className="addEmp" variant="contained" color="error" onClick={()=>{setOpenPopup(false)}} />
          </Typography>
            </DialogTitle>
            <DialogContent  dividers>
               {children}
            </DialogContent>
        </Dialog>
    )
}