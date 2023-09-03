export const datagridSx = {
    "&.MuiDataGrid-root": {
      borderRadius: "10px"
    },
    '& .MuiDataGrid-main': {
      minHeight: 365,
      maxHeight: 365,
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: 'black',
      color: 'white'
    },
    '& .MuiDataGrid-columnHeader:focus': {
      outline: 'none'
    },
    // disable cell selection style
    '.MuiDataGrid-cell:focus': {
      outline: 'none'
    },
    // pointer cursor on ALL rows
    '& .MuiDataGrid-row:hover': {
      cursor: 'pointer'
    },
    "& .MuiDataGrid-sortIcon": {
      opacity: 1,
      color: "white",
    },
    "& .MuiDataGrid-menuIconButton": {
      opacity: 1,
      color: "white"
    }
  };
  export const empHead = { 
    marginBottom: 4, 
    marginTop: 1,
    textAlign: 'center' 
};
export const tableHead = {
    '& .main-header': {
      fontWeight: 'medium',
      fontSize: 18
    },
  };