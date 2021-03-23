
import React from 'react';
import Player from 'react-player'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from '../i18n';
import { useUserData } from '../helpers'
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

const StageContent = ({embed, stage, playerProps, placeholder, regform}) => {

    const [translate] = useTranslate()
    const classes = useStyles()
    const user = useUserData();

    if(!embed){
        return <img src={placeholder} alt="" style={{width: "100%"}} />
    }

    if(!user){
       return <WidgetRegForm setting={regform} />
    }

    return (
        <div className={classes.wrapper}>

        <img className={classes.player} src="https://res.cloudinary.com/eventjuicer/image/upload/v1616511215/tehonline_fpeventcover_start.png" />
        {/* <iframe className={classes.player} width="100%" height="100%" src={`${embed}?loop=1&autoplay=1&modestbranding=1&showinfo=0`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

        {/* <Player 
            {...playerProps}
            className={classes.player}
            url={embed} 
            style={{
                position: "absolute",
                top: 0,
                left: 0
            }}
        /> */}
        </div>
    )
}

StageContent.defaultProps = {
    embed: "",
    regform: "streaming_registration",
    playerProps: {
        controls: true, 
        playing: true,  
        loop: true,
        width: "100%",
        height: "100%"
    },
}

export default StageContent;