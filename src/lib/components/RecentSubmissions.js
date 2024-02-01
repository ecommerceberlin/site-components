import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useSettings, useDatasource } from '../helpers'
import Translatable from './Translatable';
import { isEmpty } from 'lodash';

const useStyles = makeStyles(theme => ({
    root : {
    
      maxWidth: "95%",

      margin: '10px auto 10px auto',
    
    },
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignContent: 'flex-start'
    },
    item: {
       marginRight: 10
    }
}));


 

const Submission = ({domain=""}) => {

    const classes = useStyles()

    return (<span className={classes.item}><strong>{domain}</strong></span>)
}

const RecentSubmissions = ({setting, ...props}) => {

    const purchases = useDatasource({resource: "callforpapers2"})
    const classes = useStyles()

    if(isEmpty(purchases)){
        return null
    }

    return <div className={classes.root}><div><Translatable variant="h5">submissions.recent</Translatable><Box className={classes.container}>{purchases.map(p => <Submission key={p.id} {...p} />)}</Box></div></div>
}



export default RecentSubmissions