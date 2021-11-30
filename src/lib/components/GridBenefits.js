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

  return (<Grid  container spacing={8}>{items && items.map( ({label, icon, buttons}) => {
    const IconComponent = icon in icons ?  icons[icon]: Event;
    const key = `${baseLabel}.${label}`
    return ( 
      <Grid key={key} item xs={12} sm={6} md={6} lg={4} xl={4}>
        <GridBenefitsItem setting={setting} label={key} buttons={buttons} icon={
          <IconComponent key={label} style={{color: iconColor, fontSize: iconSize}} /> 
        }  />
      </Grid>
    )
  })  }

</Grid>)

}



export default (GridBenefits)
