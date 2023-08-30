import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from "@material-ui/core";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { handleDelete } from "../../Store/EmployeeSlice";
import Button from '@mui/material/Button';

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