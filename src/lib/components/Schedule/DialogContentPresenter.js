

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar';
import Markdown from '../Markdown';
import PresenterLogotype from './PresenterLogotype';
import { usePresentation } from './context';


const useStyles = makeStyles(theme => ({

  avatar: {
    height: 100,
    width: 100,

    [theme.breakpoints.down("md")]: {
      height: 75,
      width: 75,
    }
  }
}))



const AvatarAndLogotype = () => {

  const {avatar} = usePresentation()
  const classes = useStyles()
  return ( <Grid container direction='column' alignItems='center'>
    <Grid item>
    <Avatar src={avatar} className={classes.avatar} />
    </Grid>
    <Grid item>
    <Box mt={2}>
    <PresenterLogotype />
    </Box>
    </Grid>
    </Grid>)

}
const DialogContentPresenter = () => {


  const {presenter, avatar, company, position, bio} = usePresentation()
 

  return (
    <Box mt={5}>

      <Grid container spacing={1} direction="row" >
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>

       
        <AvatarAndLogotype />
     
        </Grid>

        <Grid item xs={12} sm={6} md={9} lg={9} xl={9}>


          <Typography variant="h5">{presenter}</Typography>

          <Typography variant="subtitle1">{`${position} ${company}`}</Typography>

          <Box mt={2}>
          {/* <Typography variant="body2">{bio}</Typography> */}
          <Markdown label={bio} />
          </Box>


        </Grid>

      </Grid>
     

    </Box>
  );
};



export default DialogContentPresenter