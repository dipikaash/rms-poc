export const datagridSx = {
    '& .main-header': {
        fontWeight: 'medium',
        fontSize: 18
      },
    "&.MuiDataGrid-root": {
      borderRadius: "8px"
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: 'black',
      color: 'white',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px'
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
    '& .MuiDataGrid-main': {
        minHeight: 365,
        maxHeight: 365
      },
  };
  export const statusHead = {
    '& .MuiDataGrid-main': {
        minHeight: 260,
        maxHeight: 260
      },
  };