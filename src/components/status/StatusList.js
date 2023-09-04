import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StatusList = (props) => {
  return (
    <TableContainer sx={{ minWidth: "lg", borderRadius: 1 }}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align='center'>Skills Learning</StyledTableCell>
            <StyledTableCell align='right'>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.empStatus?.sort((a, b) => a.date < b.date ? 1 : -1)
          .map((row) => (
            <StyledTableRow key={row?.skillLearning}>
              <StyledTableCell component="th" scope="row">
                {row?.date}
              </StyledTableCell>
              <StyledTableCell align='center'>{row?.skillLearning}</StyledTableCell>
              <StyledTableCell align="right">{row?.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StatusList;