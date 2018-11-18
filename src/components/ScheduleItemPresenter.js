import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import { DotsVertical } from 'mdi-material-ui';



const styles = theme => ({
  card: {
    //  maxWidth: 400,
  },

  actions: {
    display: 'flex'
  },
  // expand: {
  //   transform: 'rotate(0deg)',
  //   transition: theme.transitions.create('transform', {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  //   marginLeft: 'auto',
  // },
  // expandOpen: {
  //   transform: 'rotate(180deg)',
  // },
  avatar: {
    //backgroundColor: red[500],
    height: 80,
    width: 80
  }
});

const ScheduleItemPresenter = ({ classes, title, text, imageSrc, raised }) => {
  return (
    <Card className={classes.card} raised={raised} elevation={raised ? 1 : 0}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="Presenter"
            className={classes.avatar}
            src={imageSrc}
          />
        }
        // action={
        //   <IconButton>
        //     <DotsVertical />
        //   </IconButton>
        // }
        title={title}
        subheader={text}
      />
    </Card>
  );
};

ScheduleItemPresenter.defaultProps = {
  raised: false
};

ScheduleItemPresenter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScheduleItemPresenter);