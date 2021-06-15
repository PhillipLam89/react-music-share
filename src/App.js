import React from "react";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";
import songReducer from './reducer'

export const SongContext = React.createContext({
  song: {
    id: '59b69e6d-f033-4540-916f-fdb2155bcc83',
    title: 'Quantum Reality: Space, Time, and Entanglement',
    artist: 'Scientists',
    thumbnail: 'http://img.youtube.com/vi/BFrBr8oUVXU/0.jpg',
    url: 'https://www.youtube.com/watch?v=BFrBr8oUVXU&t=4s',
    duration: 5569
  },
  isPlaying: false
})

function App() {
  const initialSongState = React.useContext(SongContext)
  const [state, dispatch] = React.useReducer(songReducer, initialSongState)
  const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up("sm"));
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up("md"));

  return (
    <SongContext.Provider value={{state, dispatch}}>
      {/*hidden component allows us to hide the header CONDITIONALLY, when the browser width is Xtra-small (mobile)*/}
      <Hidden only="xs">
        <Header />
      </Hidden>
      {/*Grid component from MU and its properties allow us to have a responsive layout set easily*/}
      <Grid container spacing={3}>
        <Grid
          style={{
            paddingTop: greaterThanSm ? 80 : 10 //ternary operators are also able to be used as a value in an objects key/value pair
          }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            //here we apply CSS styles conditionally. If the browser width is > "medium" or not
            greaterThanMd
              ? {
                  position: "fixed",
                  width: "100%",
                  right: 0,
                  top: 70
                }
              : {
                  position: "fixed",
                  width: "100%",
                  left: 0,
                  bottom: 0
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
