import React from 'react'
import {useDatasource} from '../../helpers'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useSettings } from '../../helpers'
import Translatable from '../Translatable';
import { isEmpty } from 'lodash';
import DateAgo from '../DateAgo';

const useStyles = makeStyles(theme => ({
    root : {
      display: 'flex',
      maxWidth : 1000,
      margin: '10px auto 10px auto',
      alignItems : 'center',
      justifyContent : 'center'
    },
    booth: {
        color: "red",
        fontWeight: 900
    }
}));


const Booths = ({data}) => {
    
    const classes = useStyles()

    if(isEmpty(data) || !Array.isArray(data)){
        return null
    }

    return data.map(booth => <span key={booth.id} className={classes.booth}>{booth.ti}</span>)
}

const Purchase = ({id, domain, slug, created_at, booths}) => {

    return (<span><strong>{domain}</strong> <Booths data={booths} />{`, `}</span>)
}

const RecentPurchases = ({setting, ...props}) => {

    const purchases = useDatasource({resource: "purchases", filters: {
        limit: 50
    }})
    const classes = useStyles()
    const {use_old_ecommerce_module, show_recent_purchases} = useSettings(setting)
    
    if(use_old_ecommerce_module || isEmpty(purchases) || !show_recent_purchases){
        return null
    }

    return <div className={classes.root}><div><Translatable variant="h5">exhibitors.recent</Translatable><Box>{purchases.map(p => <Purchase key={p.id} {...p} />)}</Box></div></div>
}



export default RecentPurchases