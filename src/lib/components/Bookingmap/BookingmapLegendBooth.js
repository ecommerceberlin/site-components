import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import boothStyles, {getStylingName} from './boothStyles'
import { useBookingmapSettings } from './Context';
// import { useSettings } from '../../helpers'
// import { useTranslate } from '../../i18n'

const useStyles = makeStyles(boothStyles)

const BookingmapLegendBooth = ({setting="bookingmap", label="", height=30, width=60, g=0, ...props}) => {

  const {boothStyleMapping} = useBookingmapSettings(setting, props)
  const classes = useStyles()  

  const styleName= getStylingName(boothStyleMapping, g)
 
  return (
    <li
      className={classNames(
        classes.booth,
        classes[styleName],
        classes.boothOnLegend
     )}
      style={{ height: parseInt(height), width: parseInt(width) }}
    >
    <span className={classes.boothText}>{label}</span>
    </li>
  );

}


export default BookingmapLegendBooth