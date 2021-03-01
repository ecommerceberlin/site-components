

import React, {useCallback, useRef, useEffect, useState} from 'react';
// import WidgetSchedule from './WidgetSchedule'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import Youtube from 'react-player/youtube'
import Vimeo from 'react-player/vimeo'
import debounce from "lodash/debounce";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Wrapper from '../components/Wrapper'
import { useTranslate } from '../i18n';
import Link from '../next/MyLink'
import {useUserData} from '../helpers'

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
      }
}))


const fetcher = url => fetch(url).then(r => r.json())

const OtherStages = ({data, stage}) => {

    const [translate] = useTranslate();
    const classes = useStyles();

    const filtered = data && Array.isArray(data) && data.length ? data.filter(item => item.presentation_venue !== stage.toUpperCase()) : null

    return (<Box className={classes.stage}>Other stages{
        filtered && filtered.map(item => <div key={item.id}>{item.presenter} {item.cname2} <Link href={`/stages/${item.presentation_venue}`}>{item.presentation_venue}</Link></div>)
    }</Box>)
} 

const DiscordStats = () => {
    return <div>Staty z discorda ... ostatnia wiadomosc</div>
}

const WidgetStage = ({stage, playerProps}) => {

    const user = useUserData();
    const intervalRef = useRef();
    const playerRef = useRef();
    const [userTweaking, setUserTweaking] = useState(null)
    const [translate] = useTranslate();
    const classes = useStyles();

    const { data, error } = useSWR('https://proxy.eventjuicer.com/api/schedule', fetcher, { 
        refreshInterval: 10*1000, //pull every 10 seconds
        refreshWhenHidden: true 
    })
    
    const video = data && Array.isArray(data) && data.length ? data.find(item => item.presentation_venue === stage.toUpperCase()) : null


    const player = useCallback(node => {
        console.log(node, playerRef)

        if(playerRef.current){
            console.log("current playtime in seconds", playerRef.current.getCurrentTime())

            return playerRef.current
        }
         
    })

    useEffect(()=>{
        
        const id = setInterval(player, 1000 * 30);
        intervalRef.current = id;
        return () => clearInterval(intervalRef.current)
    })


    //case tab re-opened, cmd+r

    useEffect(()=>{
        //read localstorage
    })

    const handleUserInteraction = (timeInfo = {}) => {
        console.log(timeInfo)
        setUserTweaking(true);
    }

    const handleJumpLive = () => {
        const ref = player()

        try{
            ref.seekTo(video.seconds, "seconds")
            setUserTweaking(false);
        }catch{

        }
    }

    // const handleProgress = debounce(({playedSeconds}) => {
    //     console.log("zapisuje co 5 sekund", playedSeconds)
    // }, 1000);


    console.info(stage, video)

    return (<Wrapper>
        {error && <div>failed to load</div>}
        {!data && <div>loading...</div>}
        {video && "id" in video ? ( 
       <Box mt={3}>
       <Grid container spacing={2}>
       <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <div className={classes.wrapper}>
            {user ? <Vimeo 
                className={classes.player}
                {...playerProps}
                ref={playerRef} 
                onSeek={handleUserInteraction}
                onPause={handleUserInteraction}
                url={video.video} 
            />: <div>please register</div>}
            </div>
       </Grid>
      
       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
       <Button variant="contained" onClick={handleJumpLive}>{userTweaking ? "NOT LIVE" : "LIVE"}</Button>
       <OtherStages data={data} stage={stage} />
       <DiscordStats />
       </Grid>
     
        </Grid>
        </Box>) : <Box mt={3} p={10}>szmata standby</Box>}

    </Wrapper>)
   

}

WidgetStage.defaultProps = {
   stage: "",
   placeholder: "",
   playerProps: {
    controls: true, 
    playing: true,  
    width: "100%",
    height: "100%"
   },
}


export default WidgetStage