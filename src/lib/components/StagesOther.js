import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';



import { useTranslate } from '../i18n';
import ScheduleItem from '../components/Schedule/ScheduleItem'
import MyButton from '../components/MyButton'
import {useRouter} from 'next/router'
import isEmpty from 'lodash/isEmpty'
import {useSettings} from '../helpers'

const useStyles = makeStyles(theme => ({

      stage: {
          marginTop: 20
      },

      title: {

      },

      scheduleItem: {
      
      },

      button:{
          marginLeft: 25
      }
   
}))


const defaultProps = {

}

const StagesOther = ({setting, data, stage, ...props}) => {

    const [translate] = useTranslate();
    const classes = useStyles();
    const router = useRouter();
    const settings = useSettings(setting)
    const {ekhm} = Object.assign({}, defaultProps, settings, props)

    stage = stage.toUpperCase();

    const other = data && Array.isArray(data) && data.length ? data.filter(item => !isEmpty(item.presentation_venue) && item.presentation_venue !== stage) : null
    
    if(isEmpty(stage) || isEmpty(data) || isEmpty(other)){
        return null
    }

    return (<div className={classes.stage}>
    <Typography className={classes.title} variant="h5" gutterBottom={true}>{translate("streaming.stages.other")}</Typography>
    <Grid container spacing={2}>{(other || []).map(item => {

            const _venue = (item.presentation_venue || "").toLowerCase()

            return (<Grid key={item.id} className={classes.scheduleItem}>
            <ScheduleItem data={item} description={false} buttons={[
                <MyButton className={classes.button} variant="contained" color="primary" startIcon={<ExitToAppIcon />} label={null} onClick={() => router.push(`/stages/${_venue}`)}/>
            ]}/>
          
          </Grid>)
        })
    }</Grid></div>)
} 


export default StagesOther