import React from "react";
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({


}))

const EmbedYouTube = ({href}) => {

    const classes = useStyles();

    const matches = href.match(
        /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_-]{11})$/i
    );

    return (
        <iframe
        //className={this.props.isSelected ? "ProseMirror-selectednode" : ""}
        src={`https://www.youtube.com/embed/${matches[1]}?modestbranding=1`}
      />
    )
} 

EmbedYouTube.defaultProps = {
    
}

export default EmbedYouTube;
