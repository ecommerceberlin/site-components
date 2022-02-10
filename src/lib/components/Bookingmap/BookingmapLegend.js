import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import _get from 'lodash/get';
import {getTicketGroups} from '../../redux/selectors'
import BookingmapLegendBooth from './BookingmapLegendBooth'
import { useTranslate } from '../../i18n'
import { useBookingmapSettings } from './Context';

const useStyles = makeStyles(theme => ({
    root : {
      display: 'flex',
      maxWidth : 1000,
      margin: '10px auto 10px auto',
      alignItems : 'center',
      justifyContent : 'center'
    },

    description : {
        marginRight : 10,
        maxWidth : 600,
    },
    
    groups : {
        flexGrow : 8,
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap'
    }
}));

const BookingmapLegend = ({setting, ...props}) =>  {

    const {allowedGroupIds} = useBookingmapSettings(setting, props)
    const classes = useStyles()
    const [translate] = useTranslate()
    const ticketgroups = useSelector(getTicketGroups)
    const filtered = (ticketgroups || []).filter(tg => allowedGroupIds.includes(tg.id))

   return (
        <div className={classes.root}>
        <div className={classes.description}>
        <Typography variant="subtitle1">{ translate("event.sales.pool.legend")}</Typography>
        </div>
        <div className={classes.groups}>
        {filtered.map(tg => <BookingmapLegendBooth key={tg.name} setting={setting} g={tg.id} label={tg.name} />)}
        </div>
        </div>)

}
  
export default BookingmapLegend
  