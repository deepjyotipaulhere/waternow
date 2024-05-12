import { Typography } from '@mui/material'
import React from 'react'

export default function Tank({ percentage }) {
    return (
        <div style={{ padding: 8 }}>
            <div style={{ width: '100%', height: 300, display: 'flex', flexDirection: 'column', border: '1px solid black', borderTop: 'none', borderRadius: '0 0 8px 8px' }}>
                <Typography sx={{ display: 'inline-block', height: (100 - percentage) + '%' }} zIndex={100} variant='h4' textAlign='center'>{percentage}%</Typography>
                <div style={{ width: '100%', height: percentage + '%', backgroundColor: percentage >= 50 ? 'dodgerblue' : percentage < 50 && percentage > 20 ? 'orange' : 'red', alignSelf: 'flex-end', borderRadius: '0 0 8px 8px' }}></div>
            </div>
        </div>
    )
}
