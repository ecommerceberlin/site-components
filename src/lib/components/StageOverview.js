import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import { useTranslate } from '../i18n';
import ScheduleItem from '../components/Schedule/ScheduleItem'

const useStyles = makeStyles(theme => ({
    
}))


const getStage = (stages, stage) => stages && Array.isArray(stages) && stages.length ? stages.find(item => item.presentation_venue === stage.toUpperCase()) : null


const StageOverview = ({data, stage}) => {

    const [translate] = useTranslate();
    const classes = useStyles();
    const current = getStage(data, stage)
    
    if(!data){
        return null
    }

    return (<Box m={1}>
    <ScheduleItem data={current} description={false} first={false} showPresentationDetails={true} showPlaceDetails={false} />
    </Box>
   )
} 

export default StageOverview