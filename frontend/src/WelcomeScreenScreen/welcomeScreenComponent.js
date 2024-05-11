import { Link } from "react-router-dom";
import img from "../images/futureImage.jpg";
import logo2 from "../images/logo2.jpg";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  Dialog,
  TextField,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { useState } from "react";

function WelcomeScreenComponent() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [open, setOpen] = useState(false);
  const [registarationOpen, setRegistarationOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const regHandleClickOpen = () => {
    setOpen(false);
    setRegistarationOpen(true);
  };

  const regHandleClose = () => {
    setRegistarationOpen(false);
  };
  return (
    <>
      <AppBar
        position="static"
        style={{ backgroundColor: "black", height: "70px" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                src={logo2}
                width="75"
                height="75"
                alt="Italian Trulli"
              ></img>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                <h2>WaterNow</h2>
              </Button>
            </Box>
            <Button variant="contained" onClick={handleClickOpen}>
              LOGIN
            </Button>{" "}
          </Toolbar>
        </Container>
      </AppBar>

      <div className="WelcomeScreen">
        <div className="content">
          <img src={img} width="2688" height="1536" alt="Italian Trulli"></img>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, mb: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained">
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Button onClick={regHandleClickOpen} variant="body2">
                    Don't have an account? Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Dialog>

      <Dialog
        open={registarationOpen}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            regHandleClose();
          },
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, mb: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button type="submit" fullWidth variant="contained">
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      </Dialog>
    </>
  );
}

export default WelcomeScreenComponent;
