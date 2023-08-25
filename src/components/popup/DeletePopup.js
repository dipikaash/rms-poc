import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from "@material-ui/core";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { handleDelete } from "../../Store/UserSlice";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function DeletePopup(props) {
    const { openDeletePopup, setOpenDeletePopup, deleteEmpDetail } = props;
    const dispatch = useDispatch();
    const handleDeleteClick = () => {
        dispatch(handleDelete(deleteEmpDetail.email));
        setOpenDeletePopup(false);
    }
    return (
        <Dialog open={openDeletePopup}>
            <DialogTitle>
                <Typography className="popupHead" color="error" >
                    Deletion Confirmation
                    <CloseIcon className="addEmp" variant="contained" color="error" onClick={() => { setOpenDeletePopup(false) }} />
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    Are you sure to delete the record of {deleteEmpDetail?.firstName} {deleteEmpDetail?.lastName}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => { setOpenDeletePopup(false) }} >Cancel</Button>
                <Button variant="contained" color="error" onClick={handleDeleteClick}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}