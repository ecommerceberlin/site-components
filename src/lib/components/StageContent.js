
import React, {useCallback, useRef, useEffect, useState} from 'react';
// import WidgetSchedule from './WidgetSchedule'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import Player from 'react-player'


import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Wrapper from '../components/Wrapper'
import Link from '../next/MyLink'


import { useTranslate } from '../i18n';
import {useUserData} from '../helpers'
import WidgetVisitor from '../compositions/WidgetVisitor'


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

const getStage = (stages, stage) => stages && Array.isArray(stages) && stages.length ? stages.find(item => item.presentation_venue === stage.toUpperCase()) : null


const StageContent = ({stage, data, playerProps, placeholder}) => {

    const [translate] = useTranslate()
    const classes = useStyles()
    const user = useUserData();

    const stageData = getStage(data, stage)

    if(!data || !stage || !stageData){
        return <img src={placeholder} alt="" style={{width: "100%"}} />
    }

    if(!user){
       return <WidgetVisitor right={null} label={null} secondaryLabel={null} legend="asd" />
    }

    return (
        <div className={classes.wrapper}>
        <Player 
            className={classes.player}
            {...playerProps}
            url={stageData.video} 
        />
        </div>
    )
}

StageContent.defaultProps = {
    playerProps: {
        controls: true, 
        playing: true,  
        width: "100%",
        height: "100%"
       },
}

export default StageContent;