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
import { useMutation } from "@apollo/client";
import { ADD_SONG } from "../mutations";
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

const DEFAULT_SONG = {
    duration: 0,
    title: '',
    thumbnail: '',
    artist: ''
  }

function AddSong() {
  const classes = useStyles();
  const [addSong, {error}] =  useMutation(ADD_SONG)
  const [url, setUrl] = React.useState('')
  const [playable, setPlayable] = React.useState(false)
  const [dialog, setDialog] = React.useState(false);
  const [song, setSong] = React.useState(DEFAULT_SONG)


  React.useEffect(() => {
    const isPlayable = SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url)  // this method comes from the imnport of SC/YT player
    setPlayable(isPlayable)
  }, [url])

  function handleChangeSong(e) {
    const {name, value} = e.target
    setSong(prevSong => ({
      ...prevSong, [name]: value  // [name] allows us to set the property name of an object
    }))
  }

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
     setSong({...songData, url})
  }

  async function handleAddSong() {
  try {
   const {url, thumbnail, duration, title, artist } = song
   await addSong( {
      variables: {
        url: url.length > 0 ? url : null,
          //this ensures tat our url cant be null/defined/blank
        thumbnail: thumbnail.length > 0 ? thumbnail : null,
        duratiuon: duration > 0 ? duration : null,
        title: title.length > 0 ? title : null,
        artist: artist.length > 0 ? artist : null
      }
    })
    handleCloseDialog()
    setSong(DEFAULT_SONG)
    setUrl('')
    } catch(error) {
      console.error('Error adding song', error)
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

  function handleError(field) {
    return error && error.graphQLErrors[0].extensions.path.includes(field) // ONLY if we have an error, then do we return the boolean from error.graphQLErrors[0].extensions.path.includes(field). Remember that if we dont have an error, this function never runs, it needs an error from backend
  }

  const {thumbnail, title, artist } = song

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
            src={thumbnail}
            alt="Song thumbnail"
            className={classes.thumbnail}
          />
          <TextField value={title} onChange={handleChangeSong} margin="dense" name="title" label="Title" fullWidth error={handleError('title')} helperText={handleError('title') && 'Fill out TITLE field'} />
          <TextField value={artist} onChange={handleChangeSong} margin="dense" name="artist" label="Artist" fullWidth error={handleError('artist')} helperText={handleError('artist') && 'Fill out ARTIST field'} />
          <TextField value={thumbnail} onChange={handleChangeSong} margin="dense" name="thumbnail" label="Thumbnail" fullWidth error={handleError('thumbnail')} helperText={handleError('thumbnail') && 'Fill out THUMBNAIL field'} />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddSong} variant="outlined" color="secondary">
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
