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
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Item>Email</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>{deleteEmpDetail?.email}</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Skillset</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>{deleteEmpDetail?.primarySkills ? deleteEmpDetail?.primarySkills?.join(",") : "Not Available"}</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Pool Joining Date</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>{deleteEmpDetail?.poolJoinedDate}</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Pool End Date</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>{deleteEmpDetail?.poolEndDate ? deleteEmpDetail?.poolEndDate : "---"}</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Status</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>{deleteEmpDetail?.isActive ? 'Active' : 'Inactive'}</Item>
                    </Grid>
                </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setOpenDeletePopup(false) }} >Cancel</Button>
                <Button onClick={handleDeleteClick}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}