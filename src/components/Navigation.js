import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';

function NavigationBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ display: 'flex', flexDirection: "column" }}>
        <IconButton>
          {/* Add icon here */}
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Typography variant="subtitle1">
          Home
        </Typography>
        <Typography variant="subtitle1">
          About
        </Typography>
        <Typography variant="subtitle1">
          Contact
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
