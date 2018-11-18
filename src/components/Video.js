import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';


import Typography from './MyTypography';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { translate } from '../i18n';

import {
  dialogShow as dialogShowAction,
  resourceFetchRequest as resourceFetchRequestAction
} from './redux/actions';

const styles = theme => ({
  container: {
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: '5vh',
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  },

  card: {
    width: 400
  },

  media: {
    height: 250,
    cursor: 'pointer'
  },

  video: {
    width: '100%',
    height: '90vh',
    minHeight: 200
  }
});

const VideoEmbed = ({ src, classes }) => (
  <iframe
    src={`${src}?autoplay=1`}
    className={classes.video}
    frameborder="0"
    webkitallowfullscreen
    mozallowfullscreen
    allowfullscreen
  />
);

const StyledVideoEmbed = withStyles(styles)(VideoEmbed);

class Video extends React.PureComponent {
  render() {
    const { classes, dialogShow, videoSrc } = this.props;

    return (
      <div className={classes.container}>
        <Card className={classes.card} elevation={2}>
          <CardHeader
            title="Video / 13 edycja"
            //  subheader="September 14, 2016"
          />

          <CardMedia
            className={classes.media}
            image="/static/vimeo.jpg"
            title="relacja video"
            onClick={() =>
              dialogShow({
                title: 'Video',
                content: <StyledVideoEmbed src={videoSrc} />,
                forcefs: true
              })
            }
          />

          {/* <CardContent>
            <Typography component="p">
              This impressive paella is a perfect party dish and a fun meal to cook together with
              your guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
          </CardContent> */}
        </Card>
      </div>
    );
  }
}

Video.defaultProps = {
  videoSrc: 'https://player.vimeo.com/video/249778819'
};

Video.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  translate,
  withStyles(styles),
  connect(
    null,
    {
      dialogShow: dialogShowAction,
      resourceFetchRequest: resourceFetchRequestAction
    }
  )
);

export default enhance(Video);
