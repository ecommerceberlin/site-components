import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import translate from '../i18n/translate'
import FsVideo from '../components/FsVideo'
import MyTypography from '../components/MyTypography'
import Settings from '../datasources/Settings';
import WidgetEventInfo from './WidgetEventInfo'
import {useTranslate} from '../i18n'
import {useSettings} from '../helpers'


const useStyles = makeStyles(theme => ({
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
}))


const WidgetVideoWithEventInfo = ({setting = "hero", ...props}) => {

  const classes = useStyles();
  const [translate] = useTranslate();
  const settings = useSettings(setting)
  const {background, videoSrc, overlay, template, heading, subheading} = Object.assign({}, props, settings)

  return (<FsVideo
        setting={setting}
        background={background}
        videoSrc={videoSrc}
        overlay={overlay}
      >
      <div className={classes.container}>
        <MyTypography template={template} label={ heading } />
        <MyTypography template="subhero" label={ subheading } />
        <div className={classes.eventinfo}>
          <WidgetEventInfo setting={setting} />
        </div>
      </div>
      </FsVideo>)
}

WidgetVideoWithEventInfo.defaultProps = {
  heading : "event.claim",
  subheading : "event.description",
}

export default WidgetVideoWithEventInfo
