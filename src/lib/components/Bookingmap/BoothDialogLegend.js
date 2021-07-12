import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import _get from 'lodash/get';
import {getTicketGroups} from '../../redux/selectors'
import Booth from './Booth'
import { useSettings } from '../../helpers'
import { useTranslate } from '../../i18n'

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


const defaultProps = {
    allowedGroupIds: [],
    boothStyleMapping: {}
}

const BoothDialogLegend = ({setting, ...props}) =>  {

    const classes = useStyles()
    const [translate] = useTranslate()
    const settings = useSettings(setting)
    const {allowedGroupIds} = Object.assign({}, defaultProps, settings, props)
    const ticketgroups = useSelector(getTicketGroups)
    const filtered = (ticketgroups || []).filter(tg => allowedGroupIds.includes(tg.id))

   return (
        <div className={classes.root}>
        <div className={classes.description}>
        <Typography variant="subtitle1">{ translate("event.sales.pool.legend")}</Typography>
        </div>
        <div className={classes.groups}>
        {filtered.map(tg => <Booth key={tg.name} setting={setting} legend={true}  dh={30} dw={60} g={tg.id} ti={tg.name} />)}
        </div>
        </div>)

}
  
export default BoothDialogLegend
  