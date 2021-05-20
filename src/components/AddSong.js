import React from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles
} from "@material-ui/core";
import { Link, AddBoxOutlined } from "@material-ui/icons";
import ReactPlayer from 'react-player'
// the 2 soundcloud/youtube imports below allows us to check if user input links are valid soundcloud/Youtube songs
import SoundcloudPlayer from 'react-player/lib/players/SoundCloud'
import YoutubePlayer from 'react-player/lib/players/YouTube'
//--------------------------------------------------------------------------------------------------------
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "center"
  },
  urlInput: {
    margin: theme.spacing(1)
  },
  addSongButton: {
    margin: theme.spacing(1)
  },
  dialog: {
    textAlign: "center"
  },
  thumbnail: {
    width: "90%"
  }
}));

function AddSong() {
  const classes = useStyles();
  const [url, setUrl] = React.useState('')
  const [playable, setPlayable] = React.useState(false)
  const [dialog, setDialog] = React.useState(false);

  React.useEffect(() => {
    const isPlayable = SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url)  // this method comes from the imnport of SC/YT player
    setPlayable(isPlayable)
  }, [url])

  function handleCloseDialog() {
    setDialog(false);
  }
  // most methods below are provided thru React-Player. Refer to their documentation for more info
  async function handleEditSong({player}) {
    const nestedPlayer = player.player.player
    let songData;
    if (nestedPlayer.getVideoData) {
       songData =  getYoutubeInfo(nestedPlayer)
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer)
    }
  }

  function getYoutubeInfo(player) {
    const duration =  player.getDuration()
    const {title, video_id, author} = player.getVideoData()
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg` //this will provide us with a small thumbnail depending on the YT video id
    return {
      duration,
      title,
      artist: author,
      thumbnail
    }
  }

  function getSoundCloudInfo(player) {
    return new Promise(resolve => {
      player.getCurrentSound(songData => {
        if (songData) {
          resolve ({
            duration: Number(songData.duration * 0.001),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace('-large', '-t500x500') //this will resize the thumbnail to 500x500
          })
        }
      })
    })

  }

  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            src="http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg"
            alt="Song thumbnail"
            className={classes.thumbnail}
          />
          <TextField margin="dense" name="title" label="Title" fullWidth />
          <TextField margin="dense" name="artist" label="Artist" fullWidth />
          <TextField
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button variant="outlined" color="secondary">
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        className={classes.urlInput}
        onChange={e => setUrl(e.target.value)}
        value={url}
        placeholder="Add Youtube or Soundcloud Url"
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          )
        }}
      />
      <Button
        disabled={!playable} //this will disable the add button if the user adds in invalid  Youtube/SC url. It is also disabled by default until a valid url is added
        className={classes.addSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
      <ReactPlayer url={url} onReady={handleEditSong} hidden/>
    </div>
  );
}

export default AddSong;
