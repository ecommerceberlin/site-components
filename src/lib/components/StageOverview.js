import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import { useTranslate } from '../i18n';
import Grid from '@material-ui/core/Grid'
import ScheduleItem from './Schedule/ScheduleItem';



const useStyles = makeStyles(theme => ({
    
}))


const StageOverview = ({data, stage}) => {

    const [translate] = useTranslate();
    const classes = useStyles();
    
    if(!data){
        return null
    }

    return (<Box m={1}>

    <Grid container spacing={2}>
        <Grid item>
        
        <ScheduleItem data={data} description={true} showPlaceDetails={false} first={false} buttons={[
            //<MyButton variant="contained" color="primary" label="common.join" onClick={() => router.push(`/stages/${_venue}`)}/>
        ]}/>

        </Grid>
        <Grid item></Grid>
        <Grid item></Grid>
    </Grid>

    </Box>
   )
} 

export default StageOverview
