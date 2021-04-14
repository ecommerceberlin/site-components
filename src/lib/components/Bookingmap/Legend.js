import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import _get from 'lodash/get';
import MyTypography from '../MyTypography'
import {getTicketGroups} from '../../redux/selectors'
import Booth from './Booth'
import { getStylingName } from "./boothStyles";
import { useSettings } from '../../helpers'


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

const data = {
    dh : 40,
    dw : 60,
}


const defaultProps = {
    allowedGroupIds: [],
    boothStyleMapping: {}
}

const Legend = ({setting, ...props}) =>  {

    const classes = useStyles()
    const settings = useSettings(setting)
    const {allowedGroupIds} = Object.assign({}, defaultProps, settings, props)
    const ticketgroups = useSelector(getTicketGroups)
    const filtered = (ticketgroups || []).filter(tg => allowedGroupIds.includes(tg.id))

   return (
        <div className={classes.root}>
        <div className={classes.description}>
        <MyTypography label="event.sales.pool.legend" />
        </div>
        <div className={classes.groups}>
        {filtered.map(tg => <Booth key={tg.name} setting={setting} legend={true} {...data} g={tg.id} ti={tg.name} />)}
        </div>
        </div>)

}
  
export default Legend
  