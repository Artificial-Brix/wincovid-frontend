import React, { useState,useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import HelpUsCard from './../../home/components/helpUs/helpUsCard/helpUsCard'
import HelpUsDialog from './../../home/components/helpUs/helpUsCard/helpUsDialog/helpUsDialog';
const HelpUsPost = ({ getHelpPosts ,limit=false}) => {
    
    const [openDialog, setOpenDialog] = useState(false)
    const [currentData, setCurrentData] = useState({})
    const [requiredData, setRequiredData] = useState([])

    useEffect(() => {
        if(limit){
            setRequiredData(getHelpPosts.slice(0,limit) || [])
        }else{
            setRequiredData(getHelpPosts || [])
        }
        return () => {
            
        }
    }, [getHelpPosts, limit])
    

    const handleClose = () => {
        setOpenDialog(false)
    }
    const handleOpen = () => {
        setOpenDialog(true)
    }
    const handleClickCard = (post) => {
        console.log(post)
        setCurrentData(post)
        handleOpen()
    }

    return (
        <Grid container justify='center' alignItems='center' >
            {
                requiredData.map((post)=><HelpUsCard handleClickCard={handleClickCard} data={post} key={post._id} />)
            }
            <HelpUsDialog open={openDialog} handleClose={handleClose} data={currentData}/>
        </Grid>
    )
}

export default HelpUsPost
