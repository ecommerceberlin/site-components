import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames'
import Avatar from '@material-ui/core/Avatar';

import Presentation from './Presentation';
import Presenter from './Presenter';
import PresentationLabel from './PresentationLabel';

import { dialogShow } from '../redux/actions';
import { 
  getParticipantCdn,
  getSpeakerAvatar,
  // getSpeakerName
 } from '../../helpers';

import ScheduleItemPresenter from './ScheduleItemPresenter';

const styles = theme => ({

  item: {
    cursor: 'pointer',
    
    [theme.breakpoints.down('sm')]: {
      borderWidth : 1,
      borderStyle : 'solid',
      borderColor : '#eaeaea',
      padding: 10
    },

  },

  itemSelected : {
    borderWidth : 2,
    borderStyle : 'solid',
    borderColor : 'gold',
  },

  vertical : {
    display : 'flex',
    flexDirection : 'column'
  },

  horizontal : {
    display : 'flex',
    flexDirection : 'row'
  },

  presentation : {
    flexGrow: 1,
    flexBasis: 0
  },
  presenter : {
    flexGrow: 1,
    flexBasis: 0
  },

  avatar: {
    //backgroundColor: red[500],
    height: 80,
    width: 80
  }

});


const ScheduleItemMinimized = ({ data, selected, classes, first, description, dialogShow }) => {
  return (
    <div
      className={classNames(classes.item,
        {
          [classes.itemSelected] : selected
        }
      )}
      onClick={() =>
        dialogShow({
          title: (
            <PresentationLabel
              time={data.presentation_time}
              venue={data.presentation_venue}
            />
          ),
          content: (
            <div>
              <Presentation
                title={data.presentation_title}
                description={data.presentation_description}
              />
              <Presenter data={data} />
            </div>
          ),
          buttons: []
        })
      }
    >
    

      <div className={description ? classes.horizontal : classes.vertical}>
      <div className={classes.presenter}>
  
  

         <Avatar
            aria-label="Presenter"
            className={classes.avatar}
            src={ getSpeakerAvatar(data, [], 100)}
          />


      </div>
      </div>

    </div>
  );
};

ScheduleItemMinimized.defaultProps = {
  selected: false,
  first: true,
  description : true
};

const enhance = compose(
  withStyles(styles),
  connect(
    null,
    { dialogShow }
  )
);

export default enhance(ScheduleItemMinimized);
