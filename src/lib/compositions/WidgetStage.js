

import React, {useCallback, useRef, useEffect} from 'react';
// import WidgetSchedule from './WidgetSchedule'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import Youtube from 'react-player/youtube'
import Vimeo from 'react-player/vimeo'
import debounce from "lodash/debounce";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Wrapper from '../components/Wrapper'
import { useTranslate } from '../i18n';

const useStyles = makeStyles(theme => ({
     wrapper : {
        position: "relative",
        paddingTop: "56.25%" /* Player ratio: 100 / (1280 / 720) */
      },
      
      player : {
        position: "absolute",
        top: 0,
        left: 0
      }
}))


const fetcher = url => fetch(url).then(r => r.json())

const WidgetStage = ({stage}) => {

    const { data, error } = useSWR('https://proxy.eventjuicer.com/api/schedule', fetcher, { 
        refreshInterval: 10*1000, 
        refreshWhenHidden: true 
    })
    const player = useCallback(node => {
        console.log("zapisuje co 5 sekund", node) 
    })
    const [translate] = useTranslate();
    const classes = useStyles();

    console.log(stage, data)

    useEffect(()=>{
        let interval = setInterval(player(), 5000);
        return () => clearInterval(interval)
    })

    // const handleProgress = debounce(({playedSeconds}) => {
    //     console.log("zapisuje co 5 sekund", playedSeconds)
    // }, 1000);

    const filtered = data ? data.filter(item => item.presentation_venue === stage.toUpperCase()) : null

    return (<Wrapper>
        {error && <div>failed to load</div>}
        {!data && <div>loading...</div>}
        {filtered && filtered.map(item => 
       <Box key={item.id} mt={3} className={classes.wrapper}>
            <Vimeo 
                className={classes.player}
                ref={player} 
                //onProgress={handleProgress} 
                controls={true} 
                playing={true} 
                url={item.video} 
            />
        </Box>)}
        {!filtered && <Box mt={3} p={10}>szmata standby</Box> }
    </Wrapper>)
   

}

WidgetStage.defaultProps = {
   stage: ""
}


export default WidgetStage