import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import HelpUsCard from './../../home/components/helpUs/helpUsCard/helpUsCard'
import HelpUsDialog from './../../home/components/helpUs/helpUsCard/helpUsDialog/helpUsDialog';
const SearchPost = ({ searchData }) => {
    
    const [openDialog, setOpenDialog] = useState(false)
    const [currentData, setCurrentData] = useState({})
    const [timeOutState, setTimeOutState] = useState(false)
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
    setTimeout(() => {
        setTimeOutState(true)
    }, 2000);

    return (
        <Grid container justify='center' alignItems='flex-start' >
            {
             timeOutState && searchData.length <= 0 && (<h2>No Match found</h2>)
                
            }
            {
                searchData.map((post)=><HelpUsCard handleClickCard={handleClickCard} data={post} key={post._id} />)
            }
            <HelpUsDialog open={openDialog} handleClose={handleClose} data={currentData}/>
        </Grid>
    )
}

export default SearchPost
