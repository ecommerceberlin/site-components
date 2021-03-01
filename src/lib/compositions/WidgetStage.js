

import React, {useCallback, useRef, useEffect, useState} from 'react';
// import WidgetSchedule from './WidgetSchedule'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import Youtube from 'react-player/youtube'
import Vimeo from 'react-player/vimeo'
import debounce from "lodash/debounce";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Wrapper from '../components/Wrapper'
import { useTranslate } from '../i18n';
import Link from '../next/MyLink'
import {useUserData} from '../helpers'
import ScheduleItem from '../components/Schedule/ScheduleItem'
import WidgetVisitor from './WidgetVisitor'
const useStyles = makeStyles(theme => ({
     wrapper : {
        position: "relative",
        paddingTop: "56.25%", /* Player ratio: 100 / (1280 / 720) */
        minWidth: 640,
        minHeight: 360
      },
      
      player : {
        position: "absolute",
        top: 0,
        left: 0
      },

      stage: {
          marginTop: 20
      },

      scheduleItem: {
        maxWidth: 500
      }
}))


const fetcher = url => fetch(url).then(r => r.json())

const StageOverview = ({data, stage}) => {

    const [translate] = useTranslate();
    const classes = useStyles();
    const current = getStage(data, stage)
    
    if(!data){
        console.log(data)
        return null
    }

    return (<Box m={1}>
    <ScheduleItem data={current} description={false} first={false} showPresentationDetails={true} showPlaceDetails={false} />
    <DiscordStats />
    </Box>
   )
} 

const OtherStagesOverview = ({data, stage}) => {

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

const DiscordStats = () => {
    return <Box mt={10}>Staty z discorda ... ostatnia wiadomosc</Box>
}

const getStage = (stages, stage) => stages && Array.isArray(stages) && stages.length ? stages.find(item => item.presentation_venue === stage.toUpperCase()) : null



//https://api.eventjuicer.com/proxy?url=https://proxy.eventjuicer.com/api/discord/803929566233231411

const WidgetStageContent = ({stage, data, playerProps}) => {

    const user = useUserData()
    const [translate] = useTranslate()
    const classes = useStyles()

    const stageData = getStage(data, stage)

    if(!data || !stage || !stageData){
        return <div>no data or stage</div>
    }

    if(!user){
       return <WidgetVisitor right={null} label={null} secondaryLabel={null} legend="asd" />
    }

    return (
        <div className={classes.wrapper}><Vimeo 
            className={classes.player}
            {...playerProps}
            url={stageData.video} 
            />
        </div>
    )
}

WidgetStageContent.defaultProps = {
    playerProps: {
        controls: true, 
        playing: true,  
        width: "100%",
        height: "100%"
       },
}


const WidgetStage = ({stage}) => {

    // const [translate] = useTranslate()
    // const classes = useStyles()

    const { data, error } = useSWR('https://proxy.eventjuicer.com/api/schedule', fetcher, { 
        refreshInterval: 10*1000, //pull every 10 seconds
        refreshWhenHidden: true 
    })

    if(error){
        return null;
    }
    
    return (
        <Wrapper>
            <Box mt={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                        <WidgetStageContent data={data} stage={stage} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                        <StageOverview data={data} stage={stage} />
                    </Grid>
                    <Grid item>
                        <OtherStagesOverview data={data} stage={stage} />
                    </Grid>
                </Grid>
            </Box>
        </Wrapper>
    )
   
}

WidgetStage.defaultProps = {
   stage: "",
}


export default WidgetStage