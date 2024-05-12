import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Alert, Button, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid, LinearProgress, Snackbar, Typography, useTheme } from '@mui/material'
import Master from '../components/Master'
import Tank from '../components/Tank'
import { Assistant, AssistantTwoTone, VolunteerActivismTwoTone } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import service from '../service'

export default function MyTanks() {
    const { user } = useSelector(store => store.waternowReducer)
    const [waterTanks, setWaterTanks] = useState([])
    const [waterNeeded, setWaterNeeded] = useState(50)
    const [showBtn, setShowBtn] = useState(true)
    const [prediction, setPrediction] = useState(null)

    const getWaterTanks = () => {
        service.post("/userwatertanks/", {
            userid: user.id
        }).then(response => {
            console.log(response.data);
            setWaterTanks(response.data)
        })
    }

    const askForDonation = () => {
        console.log(prediction);
        service.post("/savepost/", {
            posted_by: user.id,
            water_needed: prediction.water_prediction.toFixed(2)
        }).then(() => {
            setShowBtn(false)
            snackHandleClick()
        })
    }

    const getPrediction = () => {
        setPrediction(null)
        service.post("/getprediction/",{
            userid: user.id
        }).then(response => {
            if (Array.isArray(response.data))
                setPrediction(response.data[0])
            else
                setPrediction(response.data)
        })
    }

    const [snackOpen, setSnackOpen] = React.useState(false);

    const snackHandleClick = () => {
        setSnackOpen(true);
    };

    const handleSnackClose = (event, reason) => {
        setSnackOpen(false);
    };

    useEffect(() => {
        getWaterTanks()
        getPrediction()
    }, [])

    const theme = useTheme()


    return (<Master>
        <Typography variant='h3'>{user.name}</Typography>
        <br />
        <Card>
            <CardContent>
                <Typography variant='h5'>Total Remaining Water in {waterTanks.length} Tanks</Typography>
            </CardContent>
            <Divider />
            <CardContent>
                <Grid container>
                    {waterTanks.map(wt => <Grid item lg={4} md={4} sm={6}>
                        <Tank percentage={wt.current_level} />
                    </Grid>)}
                </Grid>
            </CardContent>
            <Typography variant='h6' bgcolor={theme.palette.primary.main} color='white' textAlign='center' p={2}>Overall water availability: {(waterTanks.reduce((a, b) => a + parseFloat(b.current_level), 0) / waterTanks.length).toFixed(2)}%</Typography>
            <CardActions>
                <Typography>* Tank water level data collected from sensors</Typography>
            </CardActions>
        </Card>
        <br />
        <Card>
            <CardHeader style={{backgroundColor: theme.palette.info.main}} titleTypographyProps={{color:'white',fontWeight:'bolder'}} title="Water Requirement Prediction with AI" action={<AssistantTwoTone fontSize='large' color='primary' />} />
            <Divider />
            <CardContent>
                {prediction ? <Typography variant='h5'>You are going to need <b>{parseFloat(prediction.water_prediction).toFixed(2)}</b> litres of water within next {prediction.days} days</Typography> : <LinearProgress />}
            </CardContent>
            <CardActions>
                {showBtn && <Button variant='contained' startIcon={<VolunteerActivismTwoTone />} onClick={askForDonation}>Ask for Water Donation</Button>}
            </CardActions>
        </Card>
        <Snackbar
            open={snackOpen}
            autoHideDuration={6000}
            onClose={handleSnackClose}
            message="Donation requested"
            anchorOrigin={{ horizontal: 'center', 'vertical': 'bottom' }}
        >
            <Alert
                onClose={handleSnackClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                Donation requested!
            </Alert>
        </Snackbar>
    </Master>
    )
}
