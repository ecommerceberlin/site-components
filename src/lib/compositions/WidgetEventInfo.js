import React from 'react';
import EventInfo from '../components/EventInfo';
import {useSettings} from '../helpers'

const defaultProps = {
    orientation : "v",
    showable : ["location", "date"],
    primaryStyle: "heroPrimary",
    secondaryStyle: "heroSecondary",
    iconStyle: "heroIcon"
}

const WidgetEventInfo = ({setting, ...props}) => {

  const settings = useSettings(setting);
  const event = useSettings("common", {})

  const {showable = ["date"], orientation, primaryStyle, secondaryStyle, iconStyle, ...other} = Object.assign({}, defaultProps, event, settings, props)

  const data = showable.map(item => ({
      name : item,
      icon: item,
      secondary: `event.${item}`,
      primary: `event_${item}` in other? other[`event_${item}`]: "undefined"
  }))

  return (<EventInfo setting={setting} items={ data } {...{orientation, primaryStyle, secondaryStyle, iconStyle}}/>)

}

export default WidgetEventInfo;
