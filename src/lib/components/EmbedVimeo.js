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
    //  className={this.props.isSelected ? "ProseMirror-selectednode" : ""}
      src={`https://player.vimeo.com/video/${matches[1]}`}
    />
    )
}

EmbedVimeo.defaultProps = {
  
}

export default EmbedVimeo

