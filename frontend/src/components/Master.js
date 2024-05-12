import { Container } from '@mui/material'
import React from 'react'
import Header from './Header'

export default function Master({ children }) {
    return (<>
        <Header />
        <Container maxWidth='md' sx={{ my: 5 }}>
            {children}
        </Container>
    </>
    )
}
