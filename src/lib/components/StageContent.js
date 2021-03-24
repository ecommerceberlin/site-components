
import React from 'react';
import Player from 'react-player'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from '../i18n';
import { useUserData, useSettings } from '../helpers'
import WidgetRegForm from '../compositions/WidgetRegForm'

const useStyles = makeStyles(theme => ({
     wrapper : {
        position: "relative",
        paddingTop: "56.25%", /* Player ratio: 100 / (1280 / 720) */
      },
      
      player : {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      },

}))

const defaultProps = {
    regform: "streaming_registration",
    playerProps: {
        controls: true, 
        playing: true,  
        loop: true,
        width: "100%",
        height: "100%"
    },
}

const StageContent = ({stage, setting, ...props }) => {

    const [translate] = useTranslate()
    const classes = useStyles()
    const user = useUserData();
    const settings = useSettings(setting)
    
    stage = stage.toUpperCase()

    const {regform, playerProps, stages} = Object.assign({}, defaultProps, settings, props)

    const {url, restricted, placeholder, embed="player"} = stages && stage in stages? stages[stage]: {}

    if(!url || !url.startsWith("http") ){
        return (<div className={classes.wrapper}><img src={placeholder} alt="" className={classes.player} /></div>)
    }

    if(restricted && !user){
       return <WidgetRegForm setting={regform} />
    }

    if(embed=="player"){
        return ( <div className={classes.wrapper}>
            <Player 
            {...playerProps}
            className={classes.player}
            url={url} 
            style={{
                position: "absolute",
                top: 0,
                left: 0
            }}
        />
        </div>)
    }

    return (
        <div className={classes.wrapper}>
            <iframe className={classes.player} width="100%" height="100%" src={`${url}?loop=1&autoplay=1&modestbranding=1&showinfo=0`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    )
}



export default StageContent;