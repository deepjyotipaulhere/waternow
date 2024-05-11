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
} from "@mui/material";

function WelcomeScreenComponent() {
	return (
		<>
			<AppBar position="static" style={{ backgroundColor: "black" }}>
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
							<img src={logo2} width="50" height="50" alt="Italian Trulli"></img>
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>

						</Box>
						<Box sx={{ display: { xs: "none", md: "flex" } }}>
							<Link to='/login'>
								<Button type="button" color="primary" sx={{ my: 2, color: "white", display: "block" }}>
									Login
								</Button>
							</Link>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>

			<div className="WelcomeScreen">
				<div className="content">
					<img src={img} width="2688" height="1536" alt="Italian Trulli"></img>
				</div>
			</div>
		</>
	);
}

export default WelcomeScreenComponent;
