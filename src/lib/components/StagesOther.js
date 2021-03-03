import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useTranslate } from '../i18n';
import ScheduleItem from '../components/Schedule/ScheduleItem'

const useStyles = makeStyles(theme => ({

      stage: {
          marginTop: 20
      },

      scheduleItem: {
        maxWidth: 500
      }
}))


const StagesOther = ({data, stage}) => {

    const [translate] = useTranslate();
    const classes = useStyles();

    const other = data && Array.isArray(data) && data.length ? data.filter(item => item.presentation_venue !== stage.toUpperCase()) : null
    
    if(!data){
        console.log(data)
        return null
    }

    return (<div className={classes.stage}>Other stages
    <Grid container spacing={1}>{
        other && other.map(item => <Grid item key={item.id} className={classes.scheduleItem}>
        <ScheduleItem data={item} description={false} />
        </Grid>)
    }</Grid></div>)
} 


export default StagesOther