import { Link, useNavigate, useNavigation } from "react-router-dom";
import img from "./images/futureImage.jpg";
import logo2 from "./images/logo2.jpg";
import { BarChart } from '@mui/x-charts/BarChart';
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
	useTheme,
} from "@mui/material";
import { useState } from "react";
import service from "./service";
import { useDispatch } from "react-redux";
import { waternowActions } from "./store";

function WelcomeScreenComponent() {
	const navigate = useNavigate()
	const theme = useTheme()
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

	const dispatch = useDispatch()
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
					<img src={img} width="2688" height="1536" alt="Italian Trulli" style={{ position: 'absolute', zIndex: -10 }}></img>
					<Typography variant="h1" pt={15} bgcolor={theme.palette.primary.main} fontWeight={900}><span style={{ color: 'deepskyblue' }}>Water</span><span style={{ backgroundColor: theme.palette.primary.main, color: 'white', }}>Now</span></Typography>
					<Typography variant="h6" bgcolor='lightskyblue' py={1}>Solving Bangalore's Water Crisis...responsibly</Typography>
				</div>
			</div>

			<div style={{ marginTop: '75vh', marginBottom: '10vh' }}>
				<Typography variant="h3" component='h3' textAlign='center'>Dashboard for Investors</Typography>
				<center>
				<Typography variant="body1" textAlign='center' component='h6' width={500}>These housing societies are facing water shortages, but some are having excess water storage. Investors can approach the societies for investing in their infrastructure, logistics and pipeline maintenance.</Typography>
					<BarChart colors={[theme.palette.primary.main]}
						xAxis={[
							{
								id: 'barCategories',
								data: ['Galaxy Housing Society', 'Royal Supreme Housing Society'],
								scaleType: 'band',
							},
						]}
						series={[
							{
								data: [9, 2],
							},
						]}
						width={500}
						height={300}
					/>
				</center>
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
						const password = formJson.password;
						service.post("/login/", { email, password }).then(response => {
							handleClose();
							console.log(response.data)
							dispatch(waternowActions.setUser(response.data))
							navigate("/home/mytanks")
						})
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
				</Container>
			</Dialog>
		</>
	);
}

export default WelcomeScreenComponent;
