import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Presentation from './Presentation';
import Presenter from './Presenter';
import PresentationLabel from './PresentationLabel';

import { dialogShow } from '../redux/actions';
import { getParticipantCdn } from '../../helpers';

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
  }
});

const getFullName = data => `${data.fname} ${data.lname}`;
const getFullJobInfo = data => `${data.position} @ ${data.cname2}`;

const ScheduleItem = ({ data, selected, classes, first, description, dialogShow }) => {
  return (
    <div
      className={classes.item}
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
     

      {first && <PresentationLabel
        time={data.presentation_time}
        venue={data.presentation_venue}
      />}

      <div className={description ? classes.horizontal : classes.vertical}>
      <div className={classes.presentation}>
      {first && (
        <Presentation
          title={data.presentation_title}
          description={description ? data.presentation_description : null}
          hideDescriptionOnMobile={true}
        />
      )}
      </div>
      <div className={classes.presenter}>
      <ScheduleItemPresenter
        title={getFullName(data)}
        text={getFullJobInfo(data)}
        imageSrc={getParticipantCdn(data.avatar)}
      />
      </div>
      </div>

    </div>
  );
};

ScheduleItem.defaultProps = {
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

export default enhance(ScheduleItem);
