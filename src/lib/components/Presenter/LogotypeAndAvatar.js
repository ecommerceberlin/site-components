import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { usePresentation } from '../Schedule/context';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles(theme => ({

  root: {
    marginTop: 30
  },

  image: {
    maxWidth: 300,
    maxHeight: 200,
    marginRight: 30
  },


  avatarRoot: {
    width: 200,
    height: 200,
    marginRight: 10,


    [theme.breakpoints.down('md')]: {
      width: 100,
      height: 100,
      marginRight: 5,
    },

  },


  avatarImg: {
    filter: 'grayscale(100%) contrast(115%)'
  }


}))

const LogotypeAndAvatar = () => {

  const classes = useStyles()
  const {logotype, avatar_big} = usePresentation()

  return (<Grid container direction="row" className={classes.root} spacing={2} alignItems="center">
        
        <Grid item>
        <Avatar src={avatar_big} alt=""  classes={{
            root: classes.avatarRoot,
            img: classes.avatarImg
        }}/>
        </Grid>
        
        <Grid item >
            <img className={classes.image} src={ logotype } alt="" />
        </Grid>
      
    </Grid>)

}


export default LogotypeAndAvatar