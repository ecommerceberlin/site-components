import React from 'react';
import get from 'lodash/get';
// import Highlight from './Highlight'
import { 
  Grid,
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import DetailsIcon from '@material-ui/icons/Details'
import {useRouter} from 'next/router'

const useStyles = makeStyles({
  listItem: {
    "&:hover $listItemSecondaryAction": {
      visibility: "inherit"
    }
  },
  listItemSecondaryAction: {
    visibility: "hidden"
  },
})



const ColumnListItem = ({slug="", title="", selected=false, path=""}) => {

  const classes = useStyles()
  const {push} = useRouter()

  if(!slug || !title){
    return null;
  }

  return ( <ListItem 
    button 
    component="a"
    selected={ selected }
    dense
    classes={{
      container: classes.listItem
    }}
    href={ `${path}/${slug}` }
    onClick={ () => push(`${path}/${slug}`) }
    >
  <ListItemText primary={ title } secondary={null}  />
  <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
    {/* <IconButton>
    <DetailsIcon />
    </IconButton> */}
  </ListItemSecondaryAction>
  </ListItem>)

}

const ColumnList = ({data=[], marked=[], path="/exhibitors"}) => {

  return (<Grid container spacing={7}>{data.map((chunk, i) => {

  if(!Array.isArray(chunk)){
    return null;
  }

  return (<Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={3}>
      <List component="div">{chunk.map((company) => <ColumnListItem 
          key={company.id} 
          selected={ Array.isArray(marked) && marked.includes(company.id) }
          slug={company.slug} 
          title={get(company, 'profile.name', "")} 
          path={path} 
          />)}
      </List>
    </Grid>
  )

})}</Grid>)

}

export default ColumnList