import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import translate from '../i18n/translate'
import FsVideo from '../components/FsVideo'
import MyTypography from '../components/MyTypography'
import EventInfo from '../components/EventInfo'
import Settings from '../datasources/Settings';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft : '5%',
    marginRight : '5%',
    marginTop : 20
  },

  eventinfo : {
    marginTop : '5vh',
  }
});


const WidgetVideoWithEventInfo = ({ classes, locale, template, event_name, event_date, background, videoSrc, overlay }) => (

  <Settings name="hero">{

    ({videoSrc, background, overlay, template}) => (
  
    <FsVideo
    background={background}
    videoSrc={videoSrc}
    overlay={overlay}
    >

    <div className={classes.container}>

      <MyTypography template={template} label="event.claim" />

      <MyTypography template="subhero" label="event.description" />

      <div className={classes.eventinfo}>
      
      <Settings name="common">{
        ({event_location, event_date}) => (
        <EventInfo
            items={[
            {
              icon: 'location',
              secondary: 'event.location',
              primary: event_location
            },{
              icon: 'date',
              secondary: 'event.date',
              primary: event_date
            }
            ]}
            primaryStyle="heroPrimary"
            secondaryStyle="heroSecondary"
            iconStyle="heroIcon"
            orientation="v"
        />
        )
      }</Settings>
      

      </div>
    </div>

  </FsVideo>
    )
  }
  
  </Settings>
);


WidgetVideoWithEventInfo.defaultProps = {
  // background : 'https://res.cloudinary.com/eventjuicer/image/upload/v1534542530/poster_presenter_blak.jpg',
  // videoSrc : 'https://res.cloudinary.com/eventjuicer/video/upload/v1534454501/video_presenter_blak.mp4',
  // overlay : "red",
  // template : "hero"
}

const enhance = compose(
  withStyles(styles),
  translate
)

export default enhance(WidgetVideoWithEventInfo);
