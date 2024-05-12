import React, { useEffect, useState } from 'react'
import Master from '../components/Master'
import { Typography } from '@mui/material'
import Post from '../components/Post'
import service from '../service'

export default function Dashboard() {
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        service.get("/posts").then(response => {
            setPosts(response.data)
        })
    }

    useEffect(() => {
        getPosts()
    }, [])
    

    return (
        <Master>
            <Typography variant='h3'>Donation Wall</Typography>
            <br />
            {posts.map(p=><Post key={p.id} society={p.posted_by} water={parseFloat(p.water_needed).toFixed(1)} />)}
        </Master>
    )
}
