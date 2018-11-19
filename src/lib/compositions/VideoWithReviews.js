import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Reviews from '../components/Reviews'
import FsVideo from '../components/FsVideo'

import items from './reviews'

const styles = {
  container: {
    marginTop: -30,
  }
};

const VideoWithReviews = ({ classes }) => (

  <FsVideo
    videoSrc="https://res.cloudinary.com/eventjuicer/video/upload/v1534461948/video_quicktour1.mp4"
    background="https://res.cloudinary.com/eventjuicer/image/upload/v1534544020/poster_quicktour1.jpg"
    >

    <div className={classes.container}>
    <Reviews items={items} />
    </div>

  </FsVideo>
);


export default withStyles(styles)(VideoWithReviews);
