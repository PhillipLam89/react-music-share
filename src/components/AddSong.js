import { InputAdornment, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import {AddBoxOutlined, Link} from '@material-ui/icons'
import React from "react";

function AddSong() {
  const [dialog, setDialog] = React.useState(false)

  function handleCloseDialog() {
    setDialog(false)
  }

  return (
    <div>
      <Dialog open={dialog} onClose={handleCloseDialog} />
      <DialogTitle>Edit Song</DialogTitle>
      <DialogContent>
        <img src="https://i1.sndcdn.com/artworks-000670470790-ej1gvb-t500x500.jpg" alt="song thumbnail"></img>
        <TextField margin="dense" name="title" label="title" fullWidth/>
        <TextField margin="dense" name="artist" label="artist" fullWidth/>
        <TextField margin="dense" name="thumbnail" label="thumbnail" fullWidth/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
        <Button variant="outlined" color="primary">Add Song</Button>
      </DialogActions>
      <TextField
        placeholder="Paste URL Here"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <Link />
            </InputAdornment>
          )
        }}
      />
      <Button
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />} //this adds the + icon automatically in the button
      >
      </Button>
    </div>
  )
}

export default AddSong;
