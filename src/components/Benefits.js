import React from 'react';
import compose from 'recompose/compose';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import DefaultIcon from '@material-ui/icons/Done';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import { translate } from '../i18n';

const styles = theme => ({
  container: {
    maxWidth: '100%'
    //  marginTop: 30
  },

  flexList: {
    display: 'flex',
    
    alignItems: 'flex-start', //w pionie
    flexWrap : 'wrap',
   
    [theme.breakpoints.down('sm')]: {
      
    }
  },

  v : {
      flexDirection: 'column',
  },

  h : {
      flexDirection: 'row',
      [theme.breakpoints.down('xs')]: {

        flexDirection: 'column',
        justifyContent: 'center' /*space-around space-between*/,

      }
  },

  item: {
     maxWidth: 300,
  },

  icon: {
    color: 'rgba(0,0,0,0.6)',
    width: 30,
    height: 30
  }
});

const Benefits = ({ classes, labels, baseLabel, translate, orientation }) => (

  <div className={classes.container}>
    <List component="ul" className={ classNames(classes.flexList, classes[orientation]) }>
      {labels.map( (item) => {

        let primary, Icon;

        if(typeof item === 'string' || item instanceof String){
          primary = item;
          Icon = DefaultIcon;
        }else{
          primary = "primary" in item ? item.primary : "";
          Icon  = "icon" in item ? item.icon : DefaultIcon;
        }
        
        return (
          <ListItem className={classes.item} key={primary}>
            <ListItemIcon>  
               <Icon className={classNames(classes.icon)} />
            </ListItemIcon>
            <ListItemText primary={translate(baseLabel ? `${baseLabel}.${primary}` : primary)} />
          </ListItem>
        )
      })}
    </List>
  </div>

);

Benefits.defaultProps = {
  labels: [],
  baseLabel : "",
  orientation : "v"
};

const enhance = compose(
  translate,
  withStyles(styles)
);

export default enhance(Benefits);
