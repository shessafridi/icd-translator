import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import Translator from './components/Translator';

function App() {
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5'>Translator</Typography>
        </Toolbar>
      </AppBar>
      <Translator />
    </>
  );
}

export default App;
