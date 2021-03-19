import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux'
import Chip from '@material-ui/core/Chip';
import HelpIcon from '@material-ui/icons/Help';
import classNames from 'classnames'
import Presentation from './Presentation';
import Presenter from './Presenter';
import PresentationLabel from './PresentationLabel';

import { dialogShow } from '../redux/actions';
import { 
  getParticipantCdn,
  getSpeakerAvatar,
  getSpeakerName
 } from '../../helpers';

import ScheduleItemPresenter from './ScheduleItemPresenter';

const useStyles = makeStyles(theme => ({

  item: {
    
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
  }
}));

const getFullJobInfo = data => `${data.position} @ ${data.cname2}`;



const ScheduleItem = ({ data, selected, first, description, showPlaceDetails, showPresentationDetails, buttons }) => {

  const classes = useStyles()
  const dispatch = useDispatch();

  const dialogData = {
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
  } 

  if(!data || !("presentation_time" in data) ){
    return null
  }

  return (
    <div
      className={classNames(classes.item,
        {
          [classes.itemSelected] : selected
        }
      )}
    >
     
      {(first || showPlaceDetails) && <PresentationLabel
        time={data.presentation_time}
        venue={data.presentation_venue}
        buttons={[
          <Chip 
            key="details" 
            label="Info"
            icon={<HelpIcon />} onClick={() => dispatch(dialogShow(dialogData))}
          />,
          ...buttons
        ]}
      />}

      <div className={description ? classes.horizontal : classes.vertical}>
      <div className={classes.presentation}>
      {(first || showPresentationDetails) && (
        <div >
          <Presentation
          title={data.presentation_title}
          description={description ? data.presentation_description : null}
          hideDescriptionOnMobile={true}
        />
        </div>
      )}
      </div>
      <div className={classes.presenter}>
      <ScheduleItemPresenter
        title={getSpeakerName(data)}
        text={getFullJobInfo(data)}
        imageSrc={ getSpeakerAvatar(data, [], 100) }
      />
      </div>
      </div>

    </div>
  );
};

ScheduleItem.defaultProps = {
  selected: false,
  first: true,
  description : true,
  showPresentationDetails: true,
  showPlaceDetails: true,
  buttons: []
};


export default ScheduleItem
