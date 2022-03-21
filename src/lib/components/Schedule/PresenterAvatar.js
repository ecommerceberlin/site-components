

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { usePresentation } from './context';



const useStyles = makeStyles(theme => ({
  
    avatar: {
  
      height: 50,
      width: 50,
  
      [theme.breakpoints.down("md")]: {
        height: 50,
        width: 50,
      }
    }
  }));
  
  


const PresenterAvatar = () => {

    const {avatar, presenter, position, company} = usePresentation()
    const classes = useStyles()
  
  
    return (<Grid container spacing={1} alignItems="center" wrap="nowrap">
    <Grid item>
      <Avatar
        aria-label="Presenter"
        className={classes.avatar}
        src={avatar}
      />
    </Grid>
    <Grid item><span>{presenter}</span> <span>{position}{` `}@{` `}{company}</span></Grid>
  </Grid>)
  }


export default PresenterAvatar