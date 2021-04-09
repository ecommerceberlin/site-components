import React from 'react';
import Grid from '@material-ui/core/Grid';
// import { withStyles } from '@material-ui/core/styles';
import GridBenefitsItem from './GridBenefitsItem'
import Event from '@material-ui/icons/Event'
import {useSettings} from '../helpers'

const defaultProps = {
  items : [],
  baseLabel : "",
  icons: {},
  iconColor: "red",
  iconSize: "50"
}

const GridBenefits = ({setting, ...props}) => {

  const settings = useSettings(setting)
  const {items, baseLabel, icons, iconColor, iconSize} = Object.assign({}, defaultProps, settings, props)

  return (<Grid  container spacing={8}>{items && items.map( ({label, icon}) => {
    const IconComponent = icon in icons ?  icons[icon]: Event;
    return ( <GridBenefitsItem setting={setting} key={label} icon={<IconComponent key={label} style={{color: iconColor, fontSize: iconSize}} /> } label={`${baseLabel}.${label}`} /> )
  })  }

</Grid>)

}



export default (GridBenefits)
