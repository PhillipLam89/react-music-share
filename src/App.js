import React from "react";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid } from "@material-ui/core";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Grid container spacing={3}>
          {/*Grid component from MU and its properties allow us to have a responsive layout set easily*/}
        <Grid item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid item xs={12} md={5}>
          <SongPlayer />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
