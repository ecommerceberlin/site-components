import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Presentation from './Presentation';
import Presenter from './Presenter';
import PresentationLabel from './PresentationLabel';

import { dialogShow } from './redux/actions';
import { getParticipantCdn } from '../helpers';

import ScheduleItemPresenter from './ScheduleItemPresenter';

const styles = theme => ({
  item: {
    cursor: 'pointer'
  }
});

const getFullName = data => `${data.fname} ${data.lname}`;
const getFullJobInfo = data => `${data.position} @ ${data.cname2}`;

const ScheduleItem = ({ data, selected, classes, first, dialogShow }) => {
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
      <PresentationLabel
        time={data.presentation_time}
        venue={data.presentation_venue}
      />

      {first && (
        <Presentation
          title={data.presentation_title}
          description={data.presentation_description}
          hideDescriptionOnMobile={true}
        />
      )}

      <ScheduleItemPresenter
        title={getFullName(data)}
        text={getFullJobInfo(data)}
        imageSrc={getParticipantCdn(data.avatar)}
      />
    </div>
  );
};

ScheduleItem.defaultProps = {
  selected: false,
  first: true
};

const enhance = compose(
  withStyles(styles),
  connect(
    null,
    { dialogShow }
  )
);

export default enhance(ScheduleItem);
