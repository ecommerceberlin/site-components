import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from '../i18n';
// import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';
import YouTube from 'react-player/youtube'
import Vimeo from 'react-player/vimeo'


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

const regexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

const EmbedSection = ({label, data, playerProps}) => {

    const [translate] = useTranslate();
    const classes = useStyles();

    if(!regexp.test(data)){
        return null;
    }
   
    if(data.indexOf("vimeo")!==-1){

        return <Box mt={3} className={classes.wrapper}><Vimeo className={classes.player} url={data} {...playerProps} /></Box>
    }

    if(data.indexOf("youtu")!==-1){
        return <Box mt={3} className={classes.wrapper}><YouTube  className={classes.player} url={data} {...playerProps} /></Box>

    }
    
    return null
    
}

EmbedSection.defaultProps = {
    playerProps: {
        controls: true,
        light: true,
        playing: true,
        loop: true,
        width: "100%",
        height: "100%"
    }
}

export default EmbedSection;



