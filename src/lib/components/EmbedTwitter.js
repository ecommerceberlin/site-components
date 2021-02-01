import React from "react";
import {makeStyles} from '@material-ui/core/styles'
import { 
  // TwitterTimelineEmbed, 
  // TwitterShareButton, 
  // TwitterFollowButton, 
  // TwitterHashtagButton, 
  // TwitterMentionButton, 
  TwitterTweetEmbed, 
  // TwitterMomentShare, 
  // TwitterDMButton, 
  // TwitterVideoEmbed, 
  // TwitterOnAirButton 
} from 'react-twitter-embed';

/**
 * https://github.com/saurabhnemade/react-twitter-embed
 */

const useStyles = makeStyles(theme => ({

}))

export const EmbedTwitterRegexp = /(?:https?:\/\/)?(?:www\.)?twitter(?:\.com)?\/(?<handle>[a-zA-Z0-9_]{1,15})\/status\/(?<id>[0-9]+)$/ 

const EmbedTwitter = ({href}) => {

  const classes = useStyles();

  const {groups: {handle, id}} = href.match( EmbedTwitterRegexp );

    return (<TwitterTweetEmbed tweetId={id} />)
}

EmbedTwitter.defaultProps = {
  
}

export default EmbedTwitter

