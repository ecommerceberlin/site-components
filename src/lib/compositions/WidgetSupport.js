import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import RawTranslatedText from '../components/RawTranslatedText'
//import classNames from 'classnames'
//import PlayArrowIcon from 'material-ui/icons/PlayArrow';
import Chatlio from '../services/Chatlio';
import { useSettings } from '../helpers';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from '../i18n';


const useStyles = makeStyles( theme => ({
  root: {
   
  },
  
  container : {
    display : 'flex',
    flexDirection : 'row',
    marginBottom : 10
  },
 
  people : {
    marginTop: 10,
    marginBottom : 10,
  },
  left : {
    paddingLeft: 16,
    paddingRight: 16,
  },
  right : {
    paddingLeft: 16,
    paddingRight: 16,
  },
  icon: {
    height: 38,
    width: 38
  },
  personTeaser : {

  },
  contactInfo : {
    fontWeight : 600
  },
  avatar : {
    width : 120,
    height : 120
  },
  avatarMultiple : {
    width : 100,
    height : 100
  }
}) );


const WidgetSupport = ({setting="footer"}) => {

  const {title, description, people} = useSettings(setting)
  const classes = useStyles();
  const [translate] = useTranslate()

  return (
  <div className={classes.root}>
    
  {title? 
  <Typography variant="h4">{ 
  translate(title) 
  }</Typography>:
  null}
  {description? 
  <Typography variant="subtitle1" color="textSecondary">{ 
  translate(description) 
  }</Typography>: 
  null }

  <div className={classes.people}>
     
      {(people || []).map(({name, position, langs, avatar, phone, email, chatlio}, i) => (
        
        <div key={name} className={classes.container}>
          <div className={classes.left}>
            <Avatar
              //alt={opinion.person}
              src={avatar}
              className={people.length > 1 ? classes.avatarMultiple : classes.avatar}
            />
          </div>
          <div className={classes.right}>
          
          <Typography variant="h6" color="textSecondary">
            {`${name} ${position}`}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
          {email}<br/>{phone}  
          </Typography>
    
          {chatlio ? <Chatlio /> : null }
    
          </div>
        </div>
        
        )
      )}
       </div>
       
      </div>
  )
}

export default WidgetSupport
