import React from "react";
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({


}))


const EmbedVimeo = ({href}) => {

  const classes = useStyles();

  const matches = href.match(
    /(?:https?:\/\/)?(?:www\.)?vimeo(?:\.com)?\/([0-9]+)$/i
  );
    return (

      <iframe  
        src={`https://player.vimeo.com/video/${matches[1]}`} 
        width="900" 
        height="506" 
        frameBorder="0" 
        allow="autoplay; fullscreen; picture-in-picture" 
        allowfullscreen></iframe>

    )
}

EmbedVimeo.defaultProps = {
  
}

export default EmbedVimeo

