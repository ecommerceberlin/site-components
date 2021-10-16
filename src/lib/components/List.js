import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import isFunction from 'lodash/isFunction'
import {useRouter} from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '600ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

function AlignItemsList({data, avatar, primary, secondary, link}) {

  const classes = useStyles()
  const {push} = useRouter()

  return (
    <List className={classes.root}>{data.map(item => (
             <React.Fragment key={item.id}><ListItem alignItems="flex-start" button onClick={isFunction(link)? ()=>push(link(item)): undefined}>
             {avatar && isFunction(avatar)&& <ListItemAvatar>
               <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
             </ListItemAvatar>}
             <ListItemText
               primary={isFunction(primary) && primary(item)}
               secondary={isFunction(secondary) && secondary(item)}
             />
           </ListItem>
           <Divider variant="inset" component="li" />
           </React.Fragment>
    ))}</List>
    );
}


export default AlignItemsList