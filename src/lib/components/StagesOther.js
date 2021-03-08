import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useTranslate } from '../i18n';
import ScheduleItem from '../components/Schedule/ScheduleItem'
import MyButton from '../components/MyButton'
import Typography from '@material-ui/core/Typography';
import {useRouter} from 'next/router'
import isEmpty from 'lodash/isEmpty'

const useStyles = makeStyles(theme => ({

      stage: {
          marginTop: 20
      },

      scheduleItem: {
        maxWidth: 500
      },
   
}))


const StagesOther = ({data, stage}) => {

    const [translate] = useTranslate();
    const classes = useStyles();
    const router = useRouter();

    const other = data && Array.isArray(data) && data.length ? data.filter(item => item.presentation_venue !== stage.toUpperCase()) : null
    
    if(isEmpty(data)){
        return null
    }

    return (<div className={classes.stage}>
    <Typography variant="h6" gutterBottom>{translate("streaming.stages.other")}</Typography>
    <Grid container spacing={1}>{
        other && other.map(item => {

            const _venue = (item.presentation_venue || "").toLowerCase()

            return (<Grid item key={item.id} className={classes.scheduleItem}>
            <ScheduleItem data={item} description={false} buttons={[
                <MyButton variant="contained" color="primary" label="common.join" onClick={() => router.push(`/stages/${_venue}`)}/>
            ]}/>
          
          </Grid>)
        })
    }</Grid></div>)
} 


export default StagesOther