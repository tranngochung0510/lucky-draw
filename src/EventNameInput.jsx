import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

export default function CustomerFormInput(props) {
  const [open, setOpen] = React.useState(false);
  const [name,setName] = React.useState("");
  
	
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function getName(e) {
    setName(e.target.value);
  }
 

  return (
    <div>

      <button
        onClick={handleClickOpen}
        style={{
          // backgroundImage:`url(${setting})`,
          height:"60px",
          width:"260px",
          backgroundColor: "transparent",
          border: "none",
          // marginLeft :"26%"
        }}
      >
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Lấy dữ liệu </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên sự kiện" 
            fullWidth
            onChange= {(e)=>{getName(e)}}
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={()=>{
            props.getCustomers(name);
            setOpen(false);
          }} 
          color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
