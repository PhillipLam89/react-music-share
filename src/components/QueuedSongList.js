import React from "react";
import {
  Typography,
  Avatar,
  IconButton,
  makeStyles,
  useMediaQuery
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useMutation } from "@apollo/react-hooks";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../mutations";


function QueuedSongList( {queue} ) {
  console.log({queue})
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up("md"));

  // const song = {
  //   title: "Review Vanilla JS Next ",
  //   artist: "Phillip",
  //   thumbnail: "./JS.png"
  // };

  return (
    greaterThanMd && (
      <div style={{ margin: "10px 0" }}>
        <Typography color="textSecondary" variant="button">
          QUEUE ({queue.length})
        </Typography>
        {queue.map((song, i) => (
          <QueuedSong key={i} song={song} />
        ))}
      </div>
    )
  );
}

const useStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44
  },
  text: {
    textOverflow: "ellipsis", //this will put ... at the end of sentence if its cutoff
    overflow: "hidden"
  },
  container: {
    display: "grid",
    gridAutoFlow: "column",
    //css grid-template-columns allows us to set the number and widths of columns when display: grid is in use
    gridTemplateColumns: "50px auto 50px",
    gridGap: 12,
    alignItems: "center",
    marginTop: 10
  },
  songInfoContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap"
  }
});

function QueuedSong({ song }) {

  const classes = useStyles();
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: data => {
       localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
    }
  })
  const { thumbnail, artist, title } = song;
     function handleAddOrRemoveFromQueue(){
      addOrRemoveFromQueue({
      variables: {input: {...song, __typename: 'Song'}} //we are adding a piece of data that corresponds w/ the custom song "type" we declared
    })
  }


  return (
    <div className={classes.container}>
      <Avatar src={thumbnail} alt="Song thumbnail" className={classes.avatar} />
      <div className={classes.songInfoContainer}>
        <Typography variant="subtitle1" className={classes.text}>
          {title}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
          className={classes.text}
        >
          {artist}
        </Typography>
      </div>
      <IconButton onClick={handleAddOrRemoveFromQueue}>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}

export default QueuedSongList;
