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
  getSpeakerLogotype,
  getSpeakerName,
  useSettings
 } from '../../helpers';

import ScheduleItemPresenter from './ScheduleItemPresenter';

const useStyles = makeStyles(theme => ({

  item: {
    
    borderWidth : 1,
    borderStyle : 'solid',
    borderColor : '#eaeaea',
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    
    [theme.breakpoints.down('sm')]: {
      // borderWidth : 1,
      // borderStyle : 'solid',
      // borderColor : '#eaeaea',
      // padding: 10
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



const defaultProps = {
  selected: false,
  description : true,
  showPresentationDetails: true,
  showPlaceDetails: false,
  buttons: [],
  data: {},
  index: 0
};

const ScheduleItem = ({setting, ...props}) => {

  const classes = useStyles()
  const dispatch = useDispatch();
  const settings = useSettings(setting);
  const {index, data, selected, description, showPlaceDetails, showPresentationDetails, buttons} = Object.assign({}, defaultProps, settings, props)
 
 
  const dialogData = {
    title: (
      <PresentationLabel
       setting={setting}
        time={data.presentation_time}
        venue={data.presentation_venue}
      />
    ),
    content: (
      <div>

        <Presentation
          setting={setting}
          title={data.presentation_title}
          description={data.presentation_description}
        />
        <Presenter setting={setting} data={data} />
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
     
      {(index === 0) && <PresentationLabel
        setting={setting}
        time={data.presentation_time}
        venue={data.presentation_venue}
        category={data.presentation_category}
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
      {(index === 0) && (
        <div >
          <Presentation
          setting={setting}
          title={data.presentation_title}
          description={description ? data.presentation_description : null}
          hideDescriptionOnMobile={true}
        />
        </div>
      )}
      </div>
      <div className={classes.presenter}>
      <ScheduleItemPresenter
        setting={setting}
        title={getSpeakerName(data)}
        text={getFullJobInfo(data)}
        logotype={ getSpeakerLogotype(data, [], 200) }
        imageSrc={ getSpeakerAvatar(data, [], 100) }
      />
      </div>
      </div>

    </div>
  );
};




export default ScheduleItem
