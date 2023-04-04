import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import isFunction from 'lodash/isFunction'
import {useRouter} from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '600ch',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  }
}));

function AlignItemsList({data, avatar, primary="", secondary="", link, renderListItemAsButton=true, linkButtonIcon=null, linkButtonText=""}) {

  const classes = useStyles()
  const {push} = useRouter()

  return (
    <List className={classes.root}>{data.map(item => (
             <React.Fragment key={item.id}><ListItem alignItems="flex-start" button={renderListItemAsButton}  onClick={renderListItemAsButton && isFunction(link)? ()=>push(link(item)): undefined}>
             {avatar && isFunction(avatar)&& <ListItemAvatar>
               <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
             </ListItemAvatar>}
             <ListItemText
               primary={isFunction(primary) && primary(item)}
               secondary={isFunction(secondary) && secondary(item)}
             />
            {!renderListItemAsButton &&  isFunction(link)?  <Button
            onClick={ ()=>push(link(item)) }
            variant="outlined"
            color="secondary"
            className={classes.button}
            endIcon={React.isValidElement(linkButtonIcon)? React.cloneElement(linkButtonIcon): null}
            >{linkButtonText}</Button> :null }
           </ListItem>
           <Divider variant="inset" component="li" />
           </React.Fragment>
    ))}</List>
    );
}


export default AlignItemsList