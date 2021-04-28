import { InputAdornment, TextField, Button, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import {AddBoxOutlined, Link} from '@material-ui/icons'
import React from "react";

function AddSong() {
  const [dialog, setDialog] = React.useState(false)

  function handleSetDialog() {
    setDialog(false)
  }

  return (
    <div>
      <Dialog open={dialog} onClose={handleSetDialog} />
      <DialogTitle>Edit Song</DialogTitle>
      <DialogContent>
        <img src="https://i1.sndcdn.com/artworks-000670470790-ej1gvb-t500x500.jpg" alt="song thumbnail"></img>
        <TextField margin="dense" name="title" label="artist" fullWidth/>
      </DialogContent>
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
