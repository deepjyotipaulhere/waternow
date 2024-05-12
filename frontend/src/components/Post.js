import { WaterDrop } from '@mui/icons-material'
import { Alert, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField, Typography } from '@mui/material'
import React from 'react'

export default function Post({ society, water }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        // handleSnackClose()
    };

    const [snackOpen, setSnackOpen] = React.useState(false);

    const snackHandleClick = () => {
        handleClose()
        setSnackOpen(true);
    };

    const handleSnackClose = (event, reason) => {

        setSnackOpen(false);
    };
    return (<>
        <Card sx={{ mb: 2 }}>
            <CardHeader subheader="2 minutes ago" subheaderTypographyProps={{ color: 'lightgrey' }} />
            <CardContent sx={{ pt: 0 }}>
                <Typography variant='h5'><b>{society}</b> needs <b>{water} litres</b> of water in 10 days</Typography>
            </CardContent>
            <CardActions>
                <Button variant='contained' disableElevation endIcon={<WaterDrop />} onClick={handleClickOpen}>Donate Water</Button>
            </CardActions>
        </Card>
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData).entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                },
            }}
        >
            <DialogTitle>Water Donation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You have <b>80 litres</b> of excess water
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="email"
                    label="Enter dontaion in litres"
                    fullWidth
                    itemProp={{ max: water }}
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={snackHandleClick}>Donate</Button>
            </DialogActions>
        </Dialog>
        <Snackbar
            open={snackOpen}
            autoHideDuration={6000}
            onClose={handleSnackClose}
            message="Donation Successfull"
            anchorOrigin={{ horizontal: 'center', 'vertical': 'bottom' }}
        >
            <Alert
                onClose={handleSnackClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                Donation Successfull!
            </Alert>
        </Snackbar>
    </>
    )
}
