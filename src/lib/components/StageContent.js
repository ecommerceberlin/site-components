
import React from 'react';
import Player from 'react-player'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from '../i18n';
import { useUserData } from '../helpers'
import WidgetVisitor from '../compositions/WidgetVisitor'

const useStyles = makeStyles(theme => ({
     wrapper : {
        position: "relative",
        paddingTop: "56.25%", /* Player ratio: 100 / (1280 / 720) */
      },
      
      player : {
        position: "absolute",
        top: 0,
        left: 0
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
       return <WidgetVisitor setting={regform} />
    }

    return (
        <div className={classes.wrapper}>
        <Player 
            {...playerProps}
            className={classes.player}
            url={embed} 
            style={{
                position: "absolute",
                top: 0,
                left: 0
            }}
        />
        </div>
    )
}

StageContent.defaultProps = {
    embed: "",
    regform: "streaming_registration",
    playerProps: {
        controls: true, 
        playing: true,  
        width: "100%",
        height: "100%"
    },
}

export default StageContent;